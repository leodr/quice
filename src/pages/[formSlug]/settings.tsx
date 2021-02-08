import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import SolidArrowLeftIcon from "heroicons/solid/arrow-left.svg";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Controller, useForm } from "react-hook-form";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
import codeTheme from "react-syntax-highlighter/dist/cjs/styles/hljs/github-gist";
import ColorSelect from "src/components/ColorSelect";
import { useModal } from "src/components/ModalProvider";
import { useSnack } from "src/components/SnackbarProvider";
import Switch from "src/components/Switch";
import { firestore } from "src/firebase";
import { useHost } from "src/hooks/useHost";
import { AppLayout } from "src/layouts/AppLayout";
import { Form, FormColor } from "src/types/form";

SyntaxHighlighter.registerLanguage("javascript", js);

interface CreateFormForm {
  name: string;
  description: string;
  color: FormColor;
}

export default function FormSettingsPage() {
  const router = useRouter();

  const host = useHost();

  const {
    register,
    formState,
    handleSubmit,
    watch,
    control,
    setValue,
  } = useForm<CreateFormForm>();
  const { errors } = formState;

  const showModal = useModal();

  const { tab, formSlug } = router.query;

  const [forms, loading, error] = useCollectionData<Form>(
    formSlug
      ? firestore.collection("forms").where("slug", "==", formSlug)
      : null
  );

  const showSnackbar = useSnack();

  useEffect(() => {
    if (forms) {
      setValue("name", forms[0].name);
      setValue("description", forms[0].description);
      setValue("color", forms[0].color);
    }
  }, [forms, setValue]);

  async function onSubmit(data: CreateFormForm) {
    const { color, description, name } = data;

    const {
      docs: [formToChange],
    } = await firestore.collection("forms").where("slug", "==", formSlug).get();

    await formToChange.ref.update({
      color,
      name,
      description,
    });

    showSnackbar("Form information updated!");
  }

  const [switchValue, setSwitchValue] = useState(false);

  async function changeSubmissionStatus(newValue: boolean) {
    setSwitchValue(newValue);

    const {
      docs: [formToChange],
    } = await firestore.collection("forms").where("slug", "==", formSlug).get();

    await formToChange.ref.update({
      allowSubmissions: newValue,
    });
  }

  let tabView: ReactNode;

  switch (tab) {
    case "submit":
      tabView = (
        <div className="pb-6 pt-10">
          <div className="flex items-center justify-between">
            <span className="flex-grow flex flex-col" id="availability-label">
              <span className="text-sm font-medium text-gray-900">
                Enable submissions
              </span>
              <span className="text-sm leading-normal text-gray-500">
                When disabled, any submissions will be denied.
              </span>
            </span>
            <Switch
              value={switchValue}
              onChange={changeSubmissionStatus}
              label="Enable submissions"
            />
          </div>
          <div className="mt-10 prose max-w-none">
            <hr />
            <h3>How submission works</h3>
            <p>
              Submitting form data is as easy as sending an HTTP request to the
              submission api, which is deployed right along this dashboard.
            </p>

            <p>
              You send a <code>POST</code>-request to{" "}
              <code>https://{host}/api/submit</code> with the ID of this form as
              the `formId` URL parameter. Send any data as JSON in the request
              body. Do not forget to specify the <code>Content-Type</code>{" "}
              header as <code>application/json</code>.
            </p>
            <p>
              Here is a reference implementation of how to submit an entry for
              this form in JavaScript, where the <code>data</code> argument is
              an arbitrary JSON object:
            </p>
            <SyntaxHighlighter
              language="javascript"
              style={codeTheme}
              customStyle={{
                borderRadius: null,
                padding: null,
                background: null,
              }}
            >{`async function handleFormSubmission(data) {
    const response = await fetch("https://${host}/api/forms/${forms?.[0]?.id}/submissions", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
    });

    if(response.ok) {
        return true;
    } else {
        throw Error(\`Submission failed with status code \${response.status}\`)
    }
}`}</SyntaxHighlighter>
          </div>
        </div>
      );
      break;
    case "danger":
      tabView = (
        <div className="pb-6 pt-10">
          <div className="flex items-center justify-between">
            <span className="flex-grow flex flex-col" id="availability-label">
              <span className="text-sm font-medium text-gray-900">
                Delete this form
              </span>
              <span className="text-sm leading-normal text-gray-500">
                Once a form is deleted, itself and all its submissions will be
                deleted. Please be certain.
              </span>
            </span>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
              onClick={async () => {
                const result = await showModal({
                  type: "destructive",
                  title: "Are you absolutely sure?",
                  text: `This action cannot be undone. The form will be permanently deleted along with all of its submissions.`,
                  confirmText: "Confirm deletion",
                });

                if (result) {
                  const response = await fetch(`/api/forms/${forms?.[0].id}`, {
                    method: "DELETE",
                  });

                  if (response.ok) showSnackbar("Form was deleted.");

                  router.push("/inbox");
                }
              }}
            >
              Delete this form
            </button>
          </div>
        </div>
      );
      break;
    default:
      tabView = (
        <div className="px-0 md:px-0">
          <div className="pb-6 pt-10">
            <div className="space-y-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                General Information
              </h3>
              <p className="max-w-2xl text-sm text-gray-500">
                This information is only used for this interface and is not
                exposed to the public.
              </p>
            </div>
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
                            name="name"
                            id="name"
                            className="relative flex-1 block w-full focus:ring-rose-400 focus:border-rose-400 min-w-0 rounded-none rounded-t-md sm:text-sm border-gray-300"
                            ref={register({ minLength: 1 })}
                          />
                          <span className="inline-flex items-center px-3 py-1 rounded-b-md border border-t-0 border-gray-300 bg-gray-50 text-gray-500 text-sm sm:text-xs">
                            {`${host}/${formSlug}`}
                          </span>
                        </div>
                        {errors.name && (
                          <p className="text-red-500 text-sm sm:text-xs mt-1">
                            {errors.name.message}
                          </p>
                        )}
                        <p className="mt-2 text-sm text-gray-500">
                          The slug (used in URLs) cannot be changed.
                        </p>
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
                          name="description"
                          rows={3}
                          className="max-w-lg shadow-sm block w-full focus:ring-rose-400 focus:border-rose-400 sm:text-sm border-gray-300 rounded-md"
                          ref={register}
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
                        render={({ value, onChange }) => (
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
                  <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
  }

  return (
    <main className="flex-1 overflow-y-auto focus:outline-none">
      <Head>
        <title>Form settings | Quice</title>
      </Head>
      <div className="relative max-w-3xl mx-auto md:px-8 xl:px-0">
        <div className="pt-10 pb-16">
          <div className="px-4 sm:px-6 md:px-0 flex items-center space-x-4">
            <Link href={`/${formSlug}`}>
              <a>
                <SolidArrowLeftIcon className="h-6 w-6 text-gray-400" />
              </a>
            </Link>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Form Settings
            </h1>
          </div>
          <div className="px-4 sm:px-6 md:px-0">
            <div className="py-6">
              {/* Tabs */}
              <div className="lg:hidden">
                <label htmlFor="selected-tab" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="selected-tab"
                  name="selected-tab"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-rose-400 focus:border-rose-400 sm:text-sm rounded-md"
                  value={tab}
                  onChange={(e) => {
                    router.push(`/${formSlug}/settings?tab=${e.target.value}`);
                  }}
                >
                  <option value="general">General</option>
                  <option value="submit">Submit</option>
                  <option value="danger">Danger Zone</option>
                </select>
              </div>
              <div className="hidden lg:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex">
                    <Link href={`/${formSlug}/settings?tab=general`}>
                      <a
                        className={clsx(
                          "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",
                          !tab || tab === "general"
                            ? "border-rose-400 text-rose-500"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        )}
                      >
                        General
                      </a>
                    </Link>
                    <Link href={`/${formSlug}/settings?tab=submit`}>
                      <a
                        className={clsx(
                          "whitespace-nowrap ml-8 py-4 px-1 border-b-2 font-medium text-sm",
                          tab === "submit"
                            ? "border-rose-400 text-rose-500"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        )}
                      >
                        Submit
                      </a>
                    </Link>
                    <Link href={`/${formSlug}/settings?tab=danger`}>
                      <a
                        className={clsx(
                          "whitespace-nowrap ml-8 py-4 px-1 border-b-2 font-medium text-sm",
                          tab === "danger"
                            ? "border-rose-400 text-rose-500"
                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                        )}
                      >
                        Danger Zone
                      </a>
                    </Link>
                  </nav>
                </div>
              </div>
              {tabView}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

FormSettingsPage.getLayout = (page: ReactNode) => {
  return <AppLayout>{page}</AppLayout>;
};
