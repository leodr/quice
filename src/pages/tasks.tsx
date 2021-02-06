import { ReactNode } from "react";
import { AppLayout } from "src/layouts/AppLayout";

export default function TasksPage() {
  return <></>;
}

TasksPage.getLayout = (page: ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};
