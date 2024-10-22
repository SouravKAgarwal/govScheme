"use client";

import { useEffect, useState } from "react";
import SchemeInfo from "./SchemeInfo";
import SchemeOptions from "./SchemeOptions";
import SchemeDetails from "./SchemeDetails";
import SchemeProcess from "./SchemeProcess";
import SchemePreview from "./SchemePreview";
import {
  useUpdateSchemeMutation,
  useGetSchemesQuery,
} from "../../../../redux/features/schemes/schemeApi";
import { toast } from "sonner";
import { redirect, useParams } from "next/navigation";

const EditCourse = () => {
  const { id } = useParams();
  const { data } = useGetSchemesQuery();

  const [updateScheme, { isLoading, isSuccess, error }] =
    useUpdateSchemeMutation();

  const editSchemeData = data && data.schemes.find((i) => i._id === id);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Scheme updated successfully!");
      redirect("/admin/schemes");
    }
    if (error) {
      const errorMessage = error.data.message;
      toast.error(errorMessage);
    }
  }, [isSuccess, error]);

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
    faqs: [
      {
        question: "",
        answer: "",
      },
    ],
  });

  const [schemeData, setSchemeData] = useState({});

  useEffect(() => {
    if (editSchemeData) {
      setSchemeInfo({
        title: editSchemeData.basicDetails.schemeName,
        shortTitle: editSchemeData.basicDetails.schemeShortTitle,
        briefDesc: editSchemeData.basicDetails.briefDescription,
        description: editSchemeData.schemeContent.detailedDescription,
        tags: editSchemeData.basicDetails.tags,
        type: editSchemeData.basicDetails.level,
        categories: editSchemeData.basicDetails.schemeCategory.map(
          (category) => category
        ),
        ministry: editSchemeData.basicDetails.ministryName,
        states: editSchemeData.basicDetails.state,
        image: editSchemeData.basicDetails.schemeImageUrl,
      });
      setSchemeEligibility({
        benefits: editSchemeData.schemeContent.benefits,
        eligibility: editSchemeData.eligibilityDescription,
        exclusions: editSchemeData.schemeContent.exclusions,
        references: editSchemeData.schemeContent.references.map((item) => ({
          title: item.title,
          url: item.url,
        })),
      });
      setSchemeProcess({
        processes: editSchemeData.applicationProcess.map((item) => ({
          type: item.type,
          instructions: item.instructions.map((item) => item.text),
        })),
        documents: editSchemeData.documents_required,
        faqs: editSchemeData.faqs.map((item) => ({
          question: item.question,
          answer: item.answer,
        })),
      });
    }
  }, [editSchemeData]);

  const handleSubmit = async () => {
    const data = {
      basicDetails: {
        schemeName: schemeInfo.title,
        schemeShortTitle: schemeInfo.shortTitle,
        briefDescription: schemeInfo.briefDesc,
        ministryName: schemeInfo.ministry,
        schemeCategory: schemeInfo.categories,
        level: schemeInfo.type,
        tags: schemeInfo.tags,
        schemeImageUrl: schemeInfo.image,
        state: schemeInfo.states,
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
      documents_required: schemeProcess.documents,
      faqs: schemeProcess.faqs.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
      slug: editSchemeData.slug || createSlug(schemeInfo.title),
    };
    setSchemeData(data);
  };

  const handleSchemeCreate = async () => {
    if (!isLoading) {
      await updateScheme({ id: id, data: schemeData });
    }
  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <SchemeInfo
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
          <SchemePreview
            schemeData={schemeData}
            handleSchemeCreate={handleSchemeCreate}
            isLoading={isLoading}
            active={active}
            setActive={setActive}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed -z-1 top-18 right-0">
        <SchemeOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
