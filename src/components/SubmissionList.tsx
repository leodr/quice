import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  format,
  isSameDay,
  isThisYear,
  isToday,
  isYesterday,
} from "date-fns";
import { ReactElement, useMemo } from "react";
import { GroupedVirtuoso } from "react-virtuoso";
import { FormSubmission } from "src/types/form";
import { getSubmissionTitle } from "src/utils/getSubmissionTitle";
import Spinner from "./Spinner";

interface Props {
  submissions?: FormSubmission[];
  canLoadMore: boolean;
  loadMore: () => void;
  onSelect: (submissionId: string) => void;
}

export default function SubmissionList({
  canLoadMore,
  loadMore,
  submissions,
  onSelect,
}: Props): ReactElement {
  const { groupCounts, groups } = useMemo(() => {
    if (!submissions) {
      return {
        groupCounts: undefined,
        groups: undefined,
      };
    }

    const buckets: Array<{
      type: "last-hour" | "day";
      day?: Date;
      submissions: FormSubmission[];
    }> = [];

    submissions.forEach((submission) => {
      const submissionDate = submission.createdAt.toDate();
      const now = Date.now();

      if (differenceInHours(now, submissionDate) < 1) {
        const lastHourBucket = buckets.find(
          (bucket) => bucket.type === "last-hour"
        );

        if (lastHourBucket) {
          lastHourBucket.submissions.push(submission);
        } else {
          buckets.unshift({ type: "last-hour", submissions: [submission] });
        }
      } else {
        const dateCopy = new Date(submissionDate);
        dateCopy.setUTCHours(0);
        dateCopy.setUTCMinutes(0);
        dateCopy.setUTCSeconds(0);
        dateCopy.setUTCMilliseconds(0);

        const dayBucket = buckets.find(
          (bucket) => bucket.day && isSameDay(bucket.day, dateCopy)
        );

        if (dayBucket) {
          dayBucket.submissions.push(submission);
        } else {
          buckets.push({
            type: "day",
            day: dateCopy,
            submissions: [submission],
          });
        }
      }
    });

    return {
      groupCounts: buckets.map((bucket) => bucket.submissions.length),
      groups: buckets.map((bucket) => {
        if (bucket.type === "last-hour") {
          return "Last hour";
        }

        if (!bucket.day) throw Error("Invalid bucket.");

        if (isToday(bucket.day)) return "Today";
        if (isYesterday(bucket.day)) return "Yesterday";
        if (isThisYear(bucket.day)) return format(bucket.day, "MMMM d");

        return format(bucket.day, "MMMM d, yyy");
      }),
    };
  }, [submissions]);

  if (!submissions || !groups)
    return (
      <div className="flex-1 flex items-center justify-center">
        <Spinner className="text-rose-500 h-8 w-8" />
      </div>
    );

  return (
    <nav
      className="flex-1 min-h-0 relative overflow-y-auto"
      aria-label="Submissions"
    >
      <GroupedVirtuoso
        groupCounts={groupCounts}
        groupContent={(index) => {
          return (
            <div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
              {groups[index]}
            </div>
          );
        }}
        components={{
          Footer: () => {
            if (!canLoadMore) return null;

            return (
              <div className="flex justify-center pt-2 pb-4">
                <Spinner className="text-rose-500 h-6 w-6" />
              </div>
            );
          },
        }}
        className="overflow-x-hidden"
        overscan={300}
        endReached={loadMore}
        itemContent={(index) => {
          const submission = submissions[index];

          const submissionDate = submission.createdAt.toDate();
          const now = Date.now();

          let dateString;

          if (differenceInSeconds(now, submissionDate) < 60) {
            dateString = "less than a minute ago";
          } else {
            const diffInMinutes = differenceInMinutes(now, submissionDate);

            if (diffInMinutes < 45) {
              dateString = `${diffInMinutes} minutes ago`;
            } else {
              const diffInHours = differenceInHours(now, submissionDate);

              if (diffInHours < 23) {
                const hourDiff = Math.max(1, diffInHours);

                dateString =
                  hourDiff < 2
                    ? `${hourDiff} hour ago`
                    : `${hourDiff} hours ago`;
              } else {
                const diffInDays = differenceInDays(now, submissionDate);

                if (diffInDays < 13) {
                  const dayDiff = Math.max(1, diffInDays);

                  dateString =
                    dayDiff < 2 ? `${dayDiff} day ago` : `${dayDiff} days ago`;
                } else {
                  dateString = format(submissionDate, "MMMM d, yyyy");
                }
              }
            }
          }

          return (
            <div className="relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-500">
              <div className="flex-1 min-w-0">
                <button
                  type="button"
                  onClick={() => onSelect(submission.id)}
                  className="focus:outline-none text-left w-full"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {getSubmissionTitle(submission).trim()}
                  </p>
                  <p className="text-sm text-gray-500 truncate">{dateString}</p>
                </button>
              </div>
            </div>
          );
        }}
      />
    </nav>
  );
}
