import { ChevronLeftIcon, CogIcon } from "@heroicons/react/solid";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Linkify from "src/components/Linkify";
import ListHeader from "src/components/ListHeader";
import SubmissionDetails from "src/components/SubmissionDetails";
import SubmissionList from "src/components/SubmissionList";
import { firestore } from "src/firebase";
import { useSubmissionQuery } from "src/hooks/useSubmissionQuery";
import { AppLayout } from "src/layouts/AppLayout";
import { Form } from "src/types/form";

export default function FormPage() {
  const router = useRouter();

  const { formSlug, submissionId } = router.query;

  const [forms, loading, error] = useCollectionData<Form>(
    formSlug
      ? firestore.collection("forms").where("slug", "==", formSlug)
      : null,
    { idField: "id" }
  );

  const form = forms?.[0];

  const { canLoadMore, loadMore, submissions } = useSubmissionQuery(
    form
      ? firestore
          .collection("submissions")
          .where("formId", "==", form.id)
          .orderBy("createdAt", "desc")
      : null
  );

  const selectedSubmission =
    submissions && submissionId
      ? submissions.find((submission) => submission.id === submissionId)
      : null;

  return (
    <>
      <Head>
        <title>Submissions | Quice</title>
      </Head>
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
        {/* Breadcrumb */}
        <nav
          className="flex items-start px-4 py-3 sm:px-6 lg:px-8 xl:hidden"
          aria-label="Breadcrumb"
        >
          <a
            href="#"
            className="inline-flex items-center space-x-3 text-sm font-medium text-gray-900"
          >
            <ChevronLeftIcon
              className="-ml-2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>Directory</span>
          </a>
        </nav>
        <SubmissionDetails submission={selectedSubmission || null} />
      </main>
      <aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
        <ListHeader
          headline={form?.name ?? ""}
          action={
            <Link href={`/${formSlug}/settings`}>
              <a className="inline-flex items-center px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400">
                <span className="sr-only">Form settings</span>
                <CogIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
              </a>
            </Link>
          }
        >
          <Linkify>{form?.description ?? ""}</Linkify>
        </ListHeader>
        {submissions && (
          <SubmissionList
            submissions={submissions}
            canLoadMore={canLoadMore}
            loadMore={loadMore}
            onSelect={(submissionId) =>
              router.push(`/${form?.slug}/${submissionId}`, undefined, {
                shallow: true,
              })
            }
          />
        )}
      </aside>
    </>
  );
}

FormPage.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout>{page}</AppLayout>;
};
