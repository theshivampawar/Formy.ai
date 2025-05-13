import React from "react";
import { fetchAllResponseByFormId } from "@/actions/form.action";
import { FormBlockInstance } from "@/@types/form-block.type";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AllReponds from "../_components/AllReponds";

const Responds = async ({ params }: { params: { formId: string } }) => {
  const { formId } = params;
  const { form } = await fetchAllResponseByFormId(formId);

  if (!form) {
    return (
      <div className="w-full h-[50vh] flex items-center">
        Error Occured, Refresh
      </div>
    );
  }
  const blocks = JSON.parse(form?.jsonBlocks) as FormBlockInstance[];
  const responses = form?.formResponses || [];

  return (
    <main>
      <div className="w-full pt-8">
        <div
          className="w-full 
      max-w-6xl mx-auto pt-1 px-4 md:px-0"
        >
          <div
            className="w-full flex 
          items-center
          justify-between
          py-5"
          >
            <h1
              className="text-3xl font-semibold
               tracking-tight
              "
            >
              ({responses?.length}) Responses
            </h1>
            <a
              href={`${process.env.NEXT_PUBLIC_APP_URL}/public/submit-form/${formId}`}
              target="_blank"
            >
              <Button
                className="
              w-full max-w-44
               !bg-primary"
              >
                <Link />
                Visit Link
              </Button>
            </a>
          </div>

          <div className="mt-10">
            <Separator
              className="!border-[#eee]
             !bg-[#eee]"
            />
            <AllReponds blocks={blocks} responses={responses} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Responds;
