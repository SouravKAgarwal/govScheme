import { Field, Input, Label, Textarea } from "@headlessui/react";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { AiOutlineDelete } from "react-icons/ai";
import { TiDocumentAdd } from "react-icons/ti";

const SchemeProcess = ({
  schemeProcess,
  setSchemeProcess,
  active,
  setActive,
  handleSchemeSubmit,
}) => {
  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    setActive(active + 1);
    handleSchemeSubmit();
  };

  const handleProcessChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProcesses = [...schemeProcess.processes];
    updatedProcesses[index][name] = value;
    setSchemeProcess((prev) => ({ ...prev, processes: updatedProcesses }));
  };

  const handleInstructionsChange = (index, instructionIndex, value) => {
    const updatedProcesses = [...schemeProcess.processes];
    updatedProcesses[index].instructions[instructionIndex] = value;
    setSchemeProcess((prev) => ({ ...prev, processes: updatedProcesses }));
  };

  const addInstruction = (index) => {
    const updatedProcesses = [...schemeProcess.processes];
    updatedProcesses[index].instructions.push("");
    setSchemeProcess((prev) => ({ ...prev, processes: updatedProcesses }));
  };

  const removeInstruction = (index, instructionIndex) => {
    const updatedProcesses = [...schemeProcess.processes];
    updatedProcesses[index].instructions.splice(instructionIndex, 1);
    setSchemeProcess((prev) => ({ ...prev, processes: updatedProcesses }));
  };

  const addProcess = () => {
    setSchemeProcess((prev) => ({
      ...prev,
      processes: [
        ...prev.processes,
        { type: "", instructions: [{ text: "" }] },
      ],
    }));
  };

  const removeProcess = (index) => {
    const updatedProcesses = schemeProcess.processes.filter(
      (_, i) => i !== index
    );
    setSchemeProcess((prev) => ({ ...prev, processes: updatedProcesses }));
  };

  const handleDocumentChange = (index, value) => {
    const updatedDocuments = [...schemeProcess.documents];
    updatedDocuments[index] = value;
    setSchemeProcess((prev) => ({ ...prev, documents: updatedDocuments }));
  };

  const addDocument = () => {
    setSchemeProcess((prev) => ({
      ...prev,
      documents: [...prev.documents, ""],
    }));
  };

  const removeDocument = (index) => {
    const updatedDocuments = schemeProcess.documents.filter(
      (_, docIndex) => docIndex !== index
    );
    setSchemeProcess((prev) => ({ ...prev, documents: updatedDocuments }));
  };

  return (
    <div className="w-[80%] m-auto mt-24 p-3">
      <form>
        <div className="w-full bg-[#cdc8c817] p-4 rounded">
          <Field className="my-3">
            <Label className="text-sm/6 font-medium text-black dark:text-white">
              Application Processes
            </Label>
            {schemeProcess.processes.map((process, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Input
                  className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none"
                  type="text"
                  name="type"
                  placeholder="Process Type (e.g., Online, Offline)"
                  value={process.type}
                  onChange={(e) => handleProcessChange(index, e)}
                />
                <div className="flex flex-col gap-2">
                  {process.instructions.map((instruction, instructionIndex) => (
                    <div
                      key={instructionIndex}
                      className="flex items-center gap-2 relative group"
                    >
                      <Textarea
                        className="mt-2 block w-full resize-none rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none"
                        placeholder="Instruction"
                        rows={2}
                        value={instruction}
                        onChange={(e) =>
                          handleInstructionsChange(
                            index,
                            instructionIndex,
                            e.target.value
                          )
                        }
                      />
                      <XCircleIcon
                        className="w-6 h-6 cursor-pointer opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 transform -translate-y-1/2 hover:text-red-500 mx-2"
                        onClick={() =>
                          removeInstruction(index, instructionIndex)
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <button type="button">
                    <PlusCircleIcon
                      className="text-black/80 dark:text-white/50 cursor-pointer w-8 h-8"
                      onClick={() => addInstruction(index)}
                    />
                  </button>
                  <AiOutlineDelete
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => removeProcess(index)}
                  />
                </div>
                <hr className="my-4 border-t border-gray-300" />
              </div>
            ))}
            <button
              type="button"
              className="w-full md:w-[100px] mt-5 px-2 py-1 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-[#37a39a] focus:outline-none"
              onClick={addProcess}
            >
              Add Process
            </button>
          </Field>
          <Field className="mt-6">
            <Label className="text-sm/6 font-medium text-black dark:text-white">
              Required Documents
            </Label>
            {schemeProcess.documents.map((doc, index) => (
              <div className="w-full flex items-center gap-2" key={index}>
                <Input
                  className="mt-2 block w-full rounded-lg border dark:border-white/50 bg-white/5 py-1.5 px-3 text-sm/6 text-black dark:text-white focus:outline-none"
                  type="text"
                  placeholder={`Document ${index + 1}`}
                  value={doc}
                  onChange={(e) => handleDocumentChange(index, e.target.value)}
                />
                <AiOutlineDelete
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => removeDocument(index)}
                />
              </div>
            ))}
            <TiDocumentAdd
              className="my-[10px] text-black dark:text-white cursor-pointer w-6 h-6"
              onClick={addDocument}
            />
          </Field>
        </div>

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
      </form>
    </div>
  );
};

export default SchemeProcess;
