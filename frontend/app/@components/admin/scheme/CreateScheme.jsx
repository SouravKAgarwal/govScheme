"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CourseInfo from "./SchemeInfo";
import SchemeOptions from "./SchemeOptions";
import SchemeDetails from "./SchemeDetails";
import SchemeProcess from "./SchemeProcess";
import SchemePreview from "./SchemePreview";
import { toast } from "sonner";
import { useCreateSchemeMutation } from "@/redux/features/schemes/schemeApi";
import { createSlug } from "@/app/@utils";
import SchemeFaq from "./SchemeFaq";

const CreateScheme = () => {
  const router = useRouter();
  const [createScheme, { isLoading, isSuccess, error }] =
    useCreateSchemeMutation();

  const [active, setActive] = useState(0);
  const [schemeInfo, setSchemeInfo] = useState({
    title: "",
    shortTitle: "",
    briefDesc: "",
    description: "",
    tags: [],
    type: "",
    categories: [],
    ministry: "",
    states: [],
    image: "",
  });

  const [schemeEligibility, setSchemeEligibility] = useState({
    eligibility: [""],
    benefits: [""],
    exclusions: [""],
    references: [
      {
        title: "",
        url: "",
      },
    ],
  });

  const [schemeProcess, setSchemeProcess] = useState({
    processes: [
      {
        type: "",
        instructions: [{ text: "" }],
      },
    ],
    documents: [""],
  });

  const [schemeFaq, setSchemeFaq] = useState({
    faqs: [
      {
        question: "",
        answer: "",
      },
    ],
  });

  const [schemeData, setSchemeData] = useState({});

  useEffect(() => {
    if (isSuccess) {
      toast.success("Scheme created successfully!");
      router.push("/admin/schemes");
    }
    if (error) {
      const errorMessage = error?.data?.message || "An error occurred.";
      toast.error(errorMessage);
    }
  }, [isSuccess, error, router]);

  const handleSubmit = () => {
    const data = {
      basicDetails: {
        schemeName: schemeInfo.title,
        schemeShortTitle: schemeInfo.shortTitle,
        briefDescription: schemeInfo.briefDesc,
        ministryName: schemeInfo.ministry,
        schemeCategory: schemeInfo.categories.map((category) => category),
        level: schemeInfo.type,
        tags: schemeInfo.tags,
        schemeImageUrl: schemeInfo.image,
        state: schemeInfo.states.map((state) => state),
      },
      schemeContent: {
        detailedDescription: schemeInfo.description,
        benefits: schemeEligibility.benefits,
        exclusions: schemeEligibility.exclusions,
        references: schemeEligibility.references.map((item) => ({
          title: item.title,
          url: item.url,
        })),
      },
      applicationProcess: schemeProcess.processes.map((item) => ({
        type: item.type,
        instructions: item.instructions.map((instruction) => ({
          text: instruction,
        })),
      })),
      eligibilityDescription: schemeEligibility.eligibility,
      faqs: schemeFaq.faqs,
      documents_required: schemeProcess.documents,
      slug: createSlug(schemeInfo.title),
    };
    setSchemeData(data);
  };

  const handleSchemeCreate = async () => {
    if (!isLoading) {
      await createScheme(schemeData);
    }
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInfo
            schemeInfo={schemeInfo}
            setSchemeInfo={setSchemeInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <SchemeDetails
            schemeEligibility={schemeEligibility}
            setSchemeEligibility={setSchemeEligibility}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <SchemeProcess
            schemeProcess={schemeProcess}
            setSchemeProcess={setSchemeProcess}
            handleSchemeSubmit={handleSubmit}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 3 && (
          <SchemeFaq
            schemeFaq={schemeFaq}
            setSchemeFaq={setSchemeFaq}
            handleSchemeSubmit={handleSubmit}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 4 && (
          <SchemePreview
            schemeData={schemeData}
            handleSchemeCreate={handleSchemeCreate}
            isLoading={isLoading}
            active={active}
            setActive={setActive}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed -z-1 top-18 right-0">
        <SchemeOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateScheme;
