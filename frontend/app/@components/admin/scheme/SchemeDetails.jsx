import { Field, Input, Label } from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const SchemeDescriptionEditor = ({ handleEditorChange, description }) => {
  const editorRef = useRef(null);

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <Field>
        <Label className="text-sm/6 font-medium text-black dark:text-white">
          What are the benefits in this scheme?
        </Label>
        <Editor
          apiKey="o74ug35awn7u6lz7bgp93v5ax0ivxpk9rm5zljrgfh3p4v5g"
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue={description}
          init={{
            height: 500,
            menubar: false,
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "preview",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | importword | aidialog aishortcuts | blocks fontsizeinput | bold italic | align numlist bullist | table media pageembed | lineheight outdent indent | strikethrough forecolor backcolor formatpainter removeformat | charmap emoticons checklist | code fullscreen preview | save print export | pagebreak anchor codesample footnotes mergetags | addtemplate inserttemplate | addcomment showcomments | ltr rtl casechange | spellcheckdialog a11ycheck",
            statusbar: false,
          }}
          onEditorChange={handleEditorChange}
        />
      </Field>
    </div>
  );
};

const SchemeDetails = ({
  active,
  setActive,
  schemeEligibility,
  setSchemeEligibility,
}) => {
  const { benefits, eligibility, exclusions, references } = schemeEligibility;

  const handleEditorChange = (content) => {
    setSchemeEligibility({ ...schemeEligibility, benefits: content });
  };

  const handleEligibilityChange = (value, index) => {
    const updatedEligibility = [...eligibility];
    updatedEligibility[index] = value;
    setSchemeEligibility((prev) => ({
      ...prev,
      eligibility: updatedEligibility,
    }));
  };

  const handleExclusionChange = (value, index) => {
    const updatedExclusions = [...exclusions];
    updatedExclusions[index] = value;
    setSchemeEligibility((prev) => ({
      ...prev,
      exclusions: updatedExclusions,
    }));
  };

  const handleReferenceChange = (title, url, index) => {
    const updatedReferences = [...references];
    updatedReferences[index] = { title, url };
    setSchemeEligibility((prev) => ({
      ...prev,
      references: updatedReferences,
    }));
  };

  const handleAddEligibility = () => {
    setSchemeEligibility((prev) => ({
      ...prev,
      eligibility: [...eligibility, ""],
    }));
  };

  const handleDeleteEligibility = (index) => {
    const updatedEligibility = eligibility.filter((_, i) => i !== index);
    setSchemeEligibility((prev) => ({
      ...prev,
      eligibility: updatedEligibility,
    }));
  };

  const handleAddExclusions = () => {
    setSchemeEligibility((prev) => ({
      ...prev,
      exclusions: [...exclusions, ""],
    }));
  };

  const handleDeleteExclusions = (index) => {
    const updatedExclusions = exclusions.filter((_, i) => i !== index);
    setSchemeEligibility((prev) => ({
      ...prev,
      exclusions: updatedExclusions,
    }));
  };

  const handleAddReference = () => {
    setSchemeEligibility((prev) => ({
      ...prev,
      references: [...references, { title: "", url: "" }],
    }));
  };

  const handleDeleteReference = (index) => {
    const updatedReferences = references.filter((_, i) => i !== index);
    setSchemeEligibility((prev) => ({
      ...prev,
      references: updatedReferences,
    }));
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    setActive(active + 1);
  };

  return (
    <div className="w-[80%] m-auto block mt-24">
      <div>
        <div>
          <SchemeDescriptionEditor
            handleEditorChange={handleEditorChange}
            description={benefits}
          />
        </div>

        <Field className="mt-4">
          <Label className="text-sm/6 font-medium text-black dark:text-white">
            What are the eligibility criteria for this scheme?
          </Label>
          {eligibility.map((prerequisit, index) => (
            <div className="w-full flex items-center gap-2" key={index}>
              <Input
                className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
                type="text"
                id={`eligibility-${index}`}
                name={`eligibility-${index}`}
                placeholder="Eligibility criteria for this scheme..."
                value={prerequisit}
                onChange={(e) => handleEligibilityChange(e.target.value, index)}
                autoComplete="off"
                required
              />
              <AiOutlineDelete
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleDeleteEligibility(index)}
              />
            </div>
          ))}
          <PlusCircleIcon
            className="my-[10px] text-black/80 dark:text-white/50 cursor-pointer w-8 h-8"
            onClick={handleAddEligibility}
          />
        </Field>

        <Field>
          <Label className="text-sm/6 font-medium text-black dark:text-white">
            What are the exclusions in this scheme?
          </Label>
          {exclusions.map((item, index) => (
            <div className="w-full flex items-center gap-2" key={index}>
              <Input
                className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
                type="text"
                id={`exclusion-${index}`}
                name={`exclusion-${index}`}
                placeholder="Exclusion criteria...."
                value={item}
                onChange={(e) => handleExclusionChange(e.target.value, index)}
                autoComplete="off"
                required
              />
              <AiOutlineDelete
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleDeleteExclusions(index)}
              />
            </div>
          ))}
          <PlusCircleIcon
            className="my-[10px] text-black/80 dark:text-white/50 cursor-pointer w-8 h-8"
            onClick={handleAddExclusions}
          />
        </Field>

        <Field>
          <Label className="text-sm/6 font-medium text-black dark:text-white">
            Add References
          </Label>
          {references.map((reference, index) => (
            <div className="flex items-center w-full gap-2" key={index}>
              <Input
                className="mt-2 block w-[47%] rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
                type="text"
                id={`reference-title-${index}`}
                name={`reference-title-${index}`}
                placeholder="Reference title..."
                value={reference.title}
                onChange={(e) =>
                  handleReferenceChange(e.target.value, reference.url, index)
                }
                autoComplete="off"
              />
              <Input
                className="mt-2 block w-[47%] rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
                type="url"
                id={`reference-url-${index}`}
                name={`reference-url-${index}`}
                placeholder="Reference URL..."
                value={reference.url}
                onChange={(e) =>
                  handleReferenceChange(reference.title, e.target.value, index)
                }
                autoComplete="off"
              />
              <AiOutlineDelete
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleDeleteReference(index)}
              />
            </div>
          ))}
          <PlusCircleIcon
            className="my-[10px] text-black/80 dark:text-white/50 cursor-pointer w-8 h-8"
            onClick={handleAddReference}
          />
        </Field>

        <div className="w-full flex items-center justify-between">
          <button
            type="button"
            className="w-full md:w-[150px] mt-5 py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-[#37a39a] focus:outline-none"
            onClick={prevButton}
          >
            Prev
          </button>
          <button
            type="button"
            className="w-full md:w-[150px] mt-5 py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-[#37a39a] focus:outline-none"
            onClick={handleOptions}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;
