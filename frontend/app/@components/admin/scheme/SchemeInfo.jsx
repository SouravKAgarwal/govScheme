import { Field, Input, Label, Textarea } from "@headlessui/react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutApi";

const types = [
  { title: "Central", index: 1 },
  { title: "State", index: 2 },
];

const SchemeDescriptionEditor = ({ handleEditorChange, description }) => {
  const editorRef = useRef(null);

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <Field className="mt-4">
        <Label className="text-sm/6 font-medium text-black dark:text-white">
          Scheme Description
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

const SchemeInfo = ({ schemeInfo, setSchemeInfo, active, setActive }) => {
  const [dragging, setDragging] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [states, setStates] = useState([]);
  const [ministries, setMinistries] = useState([]);

  const { data: categoriesData } = useGetLayoutQuery("Categories");
  const { data: statesData } = useGetLayoutQuery("States");
  const { data: ministriesData } = useGetLayoutQuery("Ministries");

  useEffect(() => {
    if (categoriesData && categoriesData.layout.categories) {
      setCategories(categoriesData.layout.categories);
    }
    if (statesData && statesData.layout.states) {
      setStates(statesData.layout.states);
    }
    if (ministriesData && ministriesData.layout.ministries) {
      setMinistries(ministriesData.layout.ministries);
    }
  }, [categoriesData, statesData, ministriesData]);

  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(schemeInfo && schemeInfo.description);
  }, [schemeInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setSchemeInfo({ ...schemeInfo, image: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setSchemeInfo({ ...schemeInfo, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditorChange = (content) => {
    setDescription(content);
    setSchemeInfo({ ...schemeInfo, description: content });
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      setSchemeInfo({
        ...schemeInfo,
        tags: [...schemeInfo.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...schemeInfo.tags];
    newTags.splice(index, 1);
    setSchemeInfo({ ...schemeInfo, tags: newTags });
  };

  const handleToggleState = (state) => {
    if (schemeInfo.states.includes(state)) {
      setSchemeInfo({
        ...schemeInfo,
        states: schemeInfo.states.filter((s) => s !== state),
      });
    } else {
      setSchemeInfo({
        ...schemeInfo,
        states: [...schemeInfo.states, state],
      });
    }
  };

  const handleToggleCategory = (category) => {
    if (schemeInfo.categories.includes(category)) {
      setSchemeInfo({
        ...schemeInfo,
        categories: schemeInfo.categories.filter((c) => c !== category),
      });
    } else {
      setSchemeInfo({
        ...schemeInfo,
        categories: [...schemeInfo.categories, category],
      });
    }
  };

  return (
    <div className="w-[90%] md:w-[80%] m-auto mt-24 py-10">
      <form onSubmit={handleSubmit}>
        <Field>
          <Label className="text-sm/6 font-medium text-black dark:text-white">
            Scheme Name
          </Label>
          <Input
            className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
            type="text"
            id="name"
            value={schemeInfo.title || ""}
            onChange={(e) =>
              setSchemeInfo({ ...schemeInfo, title: e.target.value })
            }
            placeholder="Scheme Name"
            autoComplete="off"
          />
        </Field>
        <Field className="mt-4">
          <Label className="text-sm/6 font-medium text-black dark:text-white">
            Short Name
          </Label>
          <Input
            className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 dark:data-[focus]:outline-white/25 data-[focus]:outline-black/25"
            type="text"
            id="title"
            value={schemeInfo.shortTitle || ""}
            onChange={(e) =>
              setSchemeInfo({ ...schemeInfo, shortTitle: e.target.value })
            }
            placeholder="Short Name"
            autoComplete="off"
          />
        </Field>
        <Field className="mt-4">
          <Label className="text-sm/6 font-medium text-black dark:text-white">
            Brief Description
          </Label>
          <Textarea
            className="mt-2 block w-full resize-none rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            rows={3}
            id="briefDescription"
            value={schemeInfo.briefDesc || ""}
            onChange={(e) =>
              setSchemeInfo({ ...schemeInfo, briefDesc: e.target.value })
            }
            placeholder="Brief Description"
            autoComplete="off"
          />
        </Field>
        <div>
          <SchemeDescriptionEditor
            handleEditorChange={handleEditorChange}
            description={description}
          />
        </div>
        <div className="flex justify-between mt-4">
          <Field className="w-[45%]">
            <Label className="text-sm/6 font-medium text-black dark:text-white">
              Categories
            </Label>
            <Listbox as="div" value={schemeInfo.categories} multiple>
              <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-lg border dark:border-white/50 bg-white/5 px-1 py-1.5 text-left dark:text-white text-gray-900 shadow-sm sm:text-sm sm:leading-6">
                  <div className="flex flex-wrap gap-1">
                    {schemeInfo.categories.length > 0 ? (
                      schemeInfo.categories.map((cat, index) => (
                        <span
                          key={index}
                          className="bg-indigo-100 text-indigo-600 font-medium rounded-md px-2"
                        >
                          {cat}
                        </span>
                      ))
                    ) : (
                      <span className="px-3">Select categories</span>
                    )}
                  </div>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-400"
                    />
                  </span>
                </ListboxButton>

                <ListboxOptions className="absolute z-10 mt-10 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {[...categories]
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    .map((category, index) => (
                      <ListboxOption
                        key={index}
                        value={category.name}
                        className={({ active, selected }) =>
                          `group relative cursor-default select-none py-2 text-gray-900 hover:bg-indigo-600 hover:text-white ${
                            selected ? "bg-indigo-600 text-white" : ""
                          }`
                        }
                        onClick={() => handleToggleCategory(category.name)}
                      >
                        <div className="flex items-center">
                          <span className="ml-3 block truncate font-normal">
                            {category.name}
                          </span>
                        </div>
                        {schemeInfo.categories.includes(category.name) && (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                            <CheckIcon aria-hidden="true" className="h-5 w-5" />
                          </span>
                        )}
                      </ListboxOption>
                    ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </Field>

          <Field className="w-[45%]">
            <Label className="text-sm/6 font-medium text-black dark:text-white">
              Beneficiary State
            </Label>
            <Listbox as="div" value={schemeInfo.states} multiple>
              <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-lg border dark:border-white/50 bg-white/5 px-1 py-1.5 text-left dark:text-white text-gray-900 shadow-sm sm:text-sm sm:leading-6">
                  <div className="flex flex-wrap gap-1">
                    {schemeInfo.states.length > 0 ? (
                      schemeInfo.states.map((state, index) => (
                        <span
                          key={index}
                          className="text-indigo-600 bg-indigo-100 font-medium rounded-md px-2"
                        >
                          {state}
                        </span>
                      ))
                    ) : (
                      <span className="px-3">Select states</span>
                    )}
                  </div>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-400"
                    />
                  </span>
                </ListboxButton>

                <ListboxOptions className="absolute z-10 mt-10 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {[...states]
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    .map((state, index) => (
                      <ListboxOption
                        key={index}
                        value={state.name}
                        className={({ active, selected }) =>
                          `group relative cursor-default select-none py-2 text-gray-900 hover:bg-indigo-600 hover:text-white ${
                            selected ? "bg-indigo-600 text-white" : ""
                          }`
                        }
                        onClick={() => handleToggleState(state.name)}
                      >
                        <div className="flex items-center">
                          <span className="ml-3 block truncate font-normal">
                            {state.name}
                          </span>
                        </div>
                        {schemeInfo.states.includes(state.name) && (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                            <CheckIcon aria-hidden="true" className="h-5 w-5" />
                          </span>
                        )}
                      </ListboxOption>
                    ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </Field>
        </div>
        <div className="w-full flex justify-between mt-4">
          <Field className="w-[45%]">
            <Label className="text-sm/6 font-medium text-black dark:text-white">
              Ministry
            </Label>
            <Listbox
              value={schemeInfo.ministry || ""}
              onChange={(value) =>
                setSchemeInfo({
                  ...schemeInfo,
                  ministry: value,
                })
              }
            >
              <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-lg border dark:border-white/50 bg-white/5 py-1.5 text-left dark:text-white text-gray-900 shadow-sm sm:text-sm sm:leading-6">
                  <span className="flex items-center ml-3 truncate">
                    {schemeInfo.ministry || "Select a ministry"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-400"
                    />
                  </span>
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                  {[...ministries]
                    ?.sort((a, b) => a.name.localeCompare(b.name))
                    .map((c) => (
                      <ListboxOption
                        key={c.title}
                        value={c.name}
                        className="group relative cursor-default select-none py-2 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                      >
                        <div className="flex items-center">
                          <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                            {c.name}
                          </span>
                        </div>

                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                          <CheckIcon aria-hidden="true" className="h-5 w-5" />
                        </span>
                      </ListboxOption>
                    ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </Field>
          <Field className="w-[45%]">
            <Label className="text-sm/6 font-medium text-black dark:text-white">
              Type
            </Label>
            <Listbox
              value={schemeInfo.type || ""}
              onChange={(value) =>
                setSchemeInfo({
                  ...schemeInfo,
                  type: value,
                })
              }
            >
              <div className="relative mt-2">
                <ListboxButton className="relative w-full cursor-default rounded-lg border dark:border-white/50 bg-white/5 py-1.5 text-left dark:text-white text-gray-900 shadow-sm sm:text-sm sm:leading-6">
                  <span className="flex items-center ml-3 truncate">
                    {schemeInfo.type || "Select a type"}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-400"
                    />
                  </span>
                </ListboxButton>

                <ListboxOptions
                  transition
                  className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                >
                  {types?.map((c) => (
                    <ListboxOption
                      key={c._id}
                      value={c.title}
                      className="group relative cursor-default select-none py-2 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                    >
                      <div className="flex items-center">
                        <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                          {c.title}
                        </span>
                      </div>

                      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                        <CheckIcon aria-hidden="true" className="h-5 w-5" />
                      </span>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </Field>
        </div>

        <Field className="mt-4">
          <Label className="text-sm/6 font-medium text-black dark:text-white">
            Tags
          </Label>
          <Input
            className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            type="text"
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Enter tags and press 'Enter'"
            autoComplete="off"
          />

          {schemeInfo.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {schemeInfo.tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-1 text-indigo-400 hover:text-indigo-600 focus:outline-none"
                    onClick={() => handleRemoveTag(index)}
                  >
                    <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Field>

        <div className="w-full mt-8">
          <Field>
            <input
              className="hidden"
              type="file"
              id="file"
              onChange={handleFileImage}
              accept="image/*"
            />
            <label
              htmlFor="file"
              className={`w-full min-h-32 rounded-lg border-2 border-dashed bg-white/5 dark:border-white/50 p-3 flex items-center justify-center ${
                dragging
                  ? "border-indigo-600 bg-blue-300"
                  : "border-gray-300 bg-transparent"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {schemeInfo.image ? (
                <img
                  src={schemeInfo.image}
                  className="max-h-full w-full object-cover"
                  alt={schemeInfo.title}
                />
              ) : (
                <span className="text-black/50 cursor-pointer dark:text-white/50">
                  Drag and drop your thumbnail here or click to upload
                </span>
              )}
            </label>
          </Field>
        </div>

        <div className="w-full flex items-center justify-end mb-10">
          <button
            type="submit"
            className="w-full md:w-[150px] mt-5 py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-[#37a39a] focus:outline-none"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default SchemeInfo;
