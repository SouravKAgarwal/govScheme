import { useState } from "react";

const ApplicationProcess = ({ data }) => {
  const [selectedMode, setSelectedMode] = useState(
    data.length > 0 && data[0].type
  );
  return (
    <div id="application-process">
      <div className="grid grid-cols-1 md:flex flex-wrap justify-between lg:items-center items-start w-full mt-6 rounded-2xl">
        <div className="flex-1">
          <ApplicationSteps
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            process={data}
          />
        </div>
      </div>
    </div>
  );
};

const ApplicationSteps = ({ selectedMode, setSelectedMode, process }) => {
  return (
    <div>
      <ApplicationMode
        modes={process}
        selectedMode={selectedMode}
        setSelectedMode={setSelectedMode}
      />
      {process.map((i, index) => (
        <div key={index}>
          {selectedMode === i.type && (
            <ApplicationInstructions instructions={i.instructions} />
          )}
        </div>
      ))}
    </div>
  );
};

const ApplicationMode = ({ selectedMode, setSelectedMode, modes }) => {
  return (
    <div className="rounded">
      <div className="overflow-x-auto overflow-y-hidden flex flex-row items-center mb-2 border-0 border-b border-solid border-gray-200 pr-2 md:pr-4 hide-scrollbar">
        {modes.map(({ type }, index) => (
          <ButtonMode
            key={index}
            label={type}
            isActive={selectedMode === type}
            onClick={() => setSelectedMode(type)}
          />
        ))}
      </div>
    </div>
  );
};

const ButtonMode = ({ label, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`px-4 py-2 flex items-start justify-center capitalize hover:cursor-pointer ${
      isActive ? "border-b-2 border-green-600 rounded-t-md shadow-sm" : ""
    }`}
  >
    <span
      className={`text-md leading-8 text-gray-700 capitalize font-heading whitespace-nowrap ${
        isActive
          ? "font-semibold dark:text-white"
          : "font-medium dark:text-gray-400"
      }`}
    >
      {label}
    </span>
  </div>
);

const ApplicationInstructions = ({ instructions }) => {
  return (
    <div className="rounded py-4 px-4">
      <ul className="markdown-options list-disc pl-6">
        {instructions.map((instruction, index) => (
          <li key={index} className="pl-1 mt-2 text-black dark:text-gray-400">
            {instruction.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationProcess;
