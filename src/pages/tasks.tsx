import Head from "next/head";
import { ReactNode } from "react";
import { AppLayout } from "src/layouts/AppLayout";

export default function TasksPage() {
  return (
    <>
      <Head>
        <title>Tasks | Quice</title>
      </Head>
      <div className="flex items-center justify-center w-full">
        Coming Soon!
      </div>
    </>
  );
}

TasksPage.getLayout = (page: ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};
