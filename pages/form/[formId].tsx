import {
	differenceInDays,
	differenceInHours,
	differenceInMinutes,
	differenceInSeconds,
	format,
} from "date-fns";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { GroupedVirtuoso } from "react-virtuoso";
import { DataList } from "../../components/form-data-list/DataList";
import { firestore } from "../../firebase/client";
import { useFirestoreQuery } from "../../firebase/query";
import { AppLayout } from "../../layouts/AppLayout";
import { FormSubmission } from "../../types/form";

export default function FormPage() {
	const router = useRouter();

	const { formId } = router.query;

	const submissions = useFirestoreQuery<FormSubmission>(
		formId
			? firestore
					.collection("submissions")
					.where("formId", "==", formId)
					.orderBy("createdAt", "desc")
					.limit(25)
			: null
	);

	const selectedSubmission =
		submissions.data && router.query.submission_id
			? submissions.data.find(
					(submission) => submission.id === router.query.submission_id
			  )
			: null;

	const { groupCounts, groups } = useMemo(() => {
		if (!submissions.data) return {};

		const buckets: Array<{
			type: "last-hour" | "day";
			day?: string;
			submissions: FormSubmission[];
		}> = [];

		submissions.data?.forEach((submission) => {
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
				const dayKey = `${submissionDate.getUTCDate()}-${submissionDate.getUTCMonth()}-${submissionDate.getUTCFullYear()}`;

				const dayBucket = buckets.find((bucket) => bucket.day === dayKey);

				if (dayBucket) {
					dayBucket.submissions.push(submission);
				} else {
					buckets.push({ type: "day", day: dayKey, submissions: [submission] });
				}
			}
		});

		return {
			groupCounts: buckets.map((bucket) => bucket.submissions.length),
			groups: buckets.map((bucket) => {
				if (bucket.type === "last-hour") {
					return "This hour";
				} else {
					return bucket.day;
				}
			}),
		};
	}, [submissions.data]);

	return (
		<>
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
						{/* Heroicon name: chevron-left */}
						<svg
							className="-ml-2 h-5 w-5 text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
						<span>Directory</span>
					</a>
				</nav>
				<article>
					{/* Profile header */}
					<div>
						<div>
							<img
								className="h-32 w-full object-cover lg:h-48"
								src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
								alt=""
							/>
						</div>
						<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
							<div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
								<div className="flex">
									<img
										className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
										src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
										alt=""
									/>
								</div>
								<div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
									<div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
										<h1 className="text-2xl font-bold text-gray-900 truncate">
											Ricardo Cooper
										</h1>
									</div>
									<div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
										<button
											type="button"
											className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
										>
											{/* Heroicon name: mail */}
											<svg
												className="-ml-1 mr-2 h-5 w-5 text-gray-400"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
												<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
											</svg>
											<span>Message</span>
										</button>
										<button
											type="button"
											className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
										>
											{/* Heroicon name: phone */}
											<svg
												className="-ml-1 mr-2 h-5 w-5 text-gray-400"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
											</svg>
											<span>Call</span>
										</button>
									</div>
								</div>
							</div>
							<div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
								<h1 className="text-2xl font-bold text-gray-900 truncate">
									Ricardo Cooper
								</h1>
							</div>
						</div>
					</div>
					{/* Tabs */}
					<div className="mt-6 sm:mt-2 2xl:mt-5">
						<div className="border-b border-gray-200">
							<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
								<nav className="-mb-px flex space-x-8" aria-label="Tabs">
									{/* Current: "border-pink-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
									<a
										href="#"
										className="border-pink-500 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
										aria-current="page"
									>
										Profile
									</a>
									<a
										href="#"
										className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
									>
										Calendar
									</a>
									<a
										href="#"
										className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
									>
										Recognition
									</a>
								</nav>
							</div>
						</div>
					</div>
					{/* Description list */}
					<div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
						<dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
							{selectedSubmission?.data && (
								<DataList data={selectedSubmission.data} />
							)}
						</dl>
					</div>
				</article>
			</main>
			<aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
				<div className="px-6 pt-6 pb-4">
					<h2 className="text-lg font-medium text-gray-900">Submissions</h2>
					<p className="mt-1 text-sm text-gray-600">
						Search directory of 3,018 employees
					</p>
					<form className="mt-6 flex space-x-4" action="#">
						<div className="flex-1 min-w-0">
							<label htmlFor="search" className="sr-only">
								Search
							</label>
							<div className="relative rounded-md shadow-sm">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									{/* Heroicon name: mail */}
									{/* Heroicon name: search */}
									<svg
										className="h-5 w-5 text-gray-400"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
								<input
									type="search"
									name="search"
									id="search"
									className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
									placeholder="Search"
								/>
							</div>
						</div>
						<button
							type="submit"
							className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
						>
							{/* Heroicon name: filter */}
							<svg
								className="h-5 w-5 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								aria-hidden="true"
							>
								<path
									fillRule="evenodd"
									d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
									clipRule="evenodd"
								/>
							</svg>
							<span className="sr-only">Search</span>
						</button>
					</form>
				</div>
				{/* Directory list */}
				<nav
					className="flex-1 min-h-0 relative overflow-y-auto"
					aria-label="Directory"
				>
					{submissions.data && groups && groupCounts && (
						<GroupedVirtuoso
							groupCounts={groupCounts}
							groupContent={(index) => {
								return (
									<div className="border-t border-b border-gray-200 bg-gray-50 px-6 py-1 text-sm font-medium text-gray-500">
										{groups[index]}
									</div>
								);
							}}
							className="overflow-x-hidden"
							overscan={300}
							itemContent={(index) => {
								const submission = submissions.data[index];

								const submissionDate = submission.createdAt.toDate();
								const now = Date.now();

								let dateString;

								if (differenceInSeconds(now, submissionDate) < 60) {
									dateString = "less than a minute ago";
								} else {
									const diffInMinutes = differenceInMinutes(
										now,
										submissionDate
									);

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
													dayDiff < 2
														? `${dayDiff} day ago`
														: `${dayDiff} days ago`;
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
												onClick={() =>
													router.push(
														{
															query: {
																...router.query,
																submission_id: submission.id,
															},
														},
														undefined,
														{ shallow: true }
													)
												}
												className="focus:outline-none text-left w-full"
											>
												<span className="absolute inset-0" aria-hidden="true" />
												<p className="text-sm font-medium text-gray-900 truncate">
													{getSubmissionTitle(submission).trim()}
												</p>
												<p className="text-sm text-gray-500 truncate">
													{dateString}
												</p>
											</button>
										</div>
									</div>
								);
							}}
						/>
					)}
				</nav>
			</aside>
		</>
	);
}

FormPage.getLayout = (page) => {
	return <AppLayout>{page}</AppLayout>;
};

function getSubmissionTitle({ data, id }: FormSubmission) {
	if (typeof data.title === "string") return data.title;

	if (typeof data.company === "string") return data.company;
	if (typeof data.companyName === "string") return data.companyName;

	if (typeof data.name === "string") return data.name;

	if (typeof data.firstName === "string") {
		if (typeof data.lastName === "string") {
			return `${data.firstName} ${data.lastName}`;
		}

		return data.firstName;
	}

	const stringProp = Object.values(data).find(
		(value) => typeof value === "string"
	) as string;

	if (stringProp) return stringProp;

	return id;
}
