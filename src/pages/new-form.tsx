import { Listbox } from "@headlessui/react";
import kebabCase from "lodash.kebabcase";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import ColorSelect from "src/components/ColorSelect";
import { firestore } from "src/firebase";
import { useHost } from "src/hooks/useHost";
import { AppLayout } from "src/layouts/AppLayout";
import { FormColor } from "src/types/form";
import { validateFormName } from "src/utils/validateFormName";

interface CreateFormForm {
  name: string;
  description: string;
  color: FormColor;
}

export default function NewFormPage() {
  const { register, formState, handleSubmit, watch, control } =
    useForm<CreateFormForm>();
  const { errors } = formState;

  const router = useRouter();

  const host = useHost();

  const name = watch("name");

  const slug = kebabCase(name);

  async function onSubmit(data: CreateFormForm) {
    const { color, description, name } = data;

    const slug = kebabCase(name);

    await firestore.collection("forms").add({ color, name, description, slug });

    router.push(`/${slug}`);
  }

  return (
    <main className="flex-1 overflow-y-auto focus:outline-none">
      <Head>
        <title>Create new form | Quice</title>
      </Head>
      <div className="relative max-w-3xl mx-auto md:px-8 xl:px-0">
        <div className="pt-10 pb-16">
          <div className="px-4 sm:px-6 md:px-0">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Create new form
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              This information is only used for this interface and is not
              exposed to the public.
            </p>
          </div>
          <div className="px-4 sm:px-6 md:px-0">
            <div className="py-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 divide-y divide-gray-200"
              >
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                  <div>
                    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Name
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <div className="max-w-lg flex flex-col rounded-md shadow-sm">
                            <input
                              type="text"
                              id="name"
                              className="relative flex-1 block w-full focus:ring-rose-400 focus:border-rose-400 min-w-0 rounded-none rounded-t-md sm:text-sm border-gray-300"
                              {...register("name", {
                                validate: validateFormName,
                              })}
                            />
                            <span className="inline-flex items-center px-3 py-1 rounded-b-md border border-t-0 border-gray-300 bg-gray-50 text-gray-500 text-sm sm:text-xs">
                              {`${host}/${slug}`}
                            </span>
                          </div>
                          {errors.name && (
                            <p className="text-red-500 text-sm sm:text-xs mt-1">
                              {errors.name.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Description
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <textarea
                            id="description"
                            rows={3}
                            className="max-w-lg shadow-sm block w-full focus:ring-rose-400 focus:border-rose-400 sm:text-sm border-gray-300 rounded-md"
                            {...register("description")}
                          />
                          <p className="mt-2 text-sm text-gray-500">
                            It is helpful to state where the form is found.
                          </p>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                        <Controller
                          name="color"
                          control={control}
                          defaultValue="green"
                          render={({ field: { value, onChange } }) => (
                            <Listbox value={value} onChange={onChange}>
                              {({ open }) => (
                                <>
                                  <Listbox.Label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Color
                                  </Listbox.Label>
                                  <div className="relative mt-1 sm:mt-0 sm:col-span-2 max-w-lg">
                                    <ColorSelect open={open} color={value} />
                                  </div>
                                </>
                              )}
                            </Listbox>
                          )}
                        ></Controller>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-5">
                  <div className="flex justify-end">
                    <Link href="/inbox">
                      <a
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
                      >
                        Cancel
                      </a>
                    </Link>
                    <button
                      type="submit"
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
                    >
                      Create form
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

NewFormPage.getLayout = function getLayout(page: ReactNode) {
  return <AppLayout>{page}</AppLayout>;
};
