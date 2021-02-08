import { ReactNode } from "react";
import { AppLayout } from "src/layouts/AppLayout";

export default function TasksPage() {
  return (
    <>
      <div className="flex items-center justify-center w-full">
        Coming Soon!
      </div>
    </>
  );
}

TasksPage.getLayout = (page: ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};
