import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { ListHeader } from "src/components/ListHeader";
import { SubmissionDetails } from "src/components/SubmissionDetails";
import SubmissionList from "src/components/SubmissionList";
import { firestore } from "src/firebase/client";
import { useSubmissionQuery } from "src/firebase/infiniteQuery";
import { useFirestoreQuery } from "src/firebase/query";
import { AppLayout } from "src/layouts/AppLayout";
import { Form } from "src/types/form";

export default function FormPage() {
	const router = useRouter();

	const { formSlug, submissionId } = router.query;

	const formState = useFirestoreQuery<Form>(
		formSlug
			? firestore.collection("forms").where("slug", "==", formSlug)
			: null
	);

	const form = formState.data?.[0];

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
				<SubmissionDetails submission={selectedSubmission || null} />
			</main>
			<aside className="hidden xl:order-first xl:flex xl:flex-col flex-shrink-0 w-96 border-r border-gray-200">
				<ListHeader headline={form?.name ?? ""}>
					{form?.description ?? ""}
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

FormPage.getLayout = (page: ReactNode) => {
	return <AppLayout>{page}</AppLayout>;
};
