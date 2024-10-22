import { FaClipboardList, FaSearch, FaHandPointer } from "react-icons/fa";

const Steps = () => {
  const steps = [
    {
      icon: <FaClipboardList />,
      title: "Enter Details",
      description: "Start by entering your basic details!",
    },
    {
      icon: <FaSearch />,
      title: "Search",
      description: "Our search engine will find the relevant schemes!",
    },
    {
      icon: <FaHandPointer />,
      title: "Select & Apply",
      description: "Select and apply for the best-suited scheme.",
    },
  ];

  return (
    <div className="relative py-20 md:py-28 bg-gradient-to-b from-white to-green-50 dark:from-gray-800 dark:to-gray-900">
      <div className="text-center mb-16">
        <h3 className="text-base font-medium text-gray-500 dark:text-gray-400 mb-2">
          How it works
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Easy Steps to <span className="text-gradient">Apply</span> for Schemes
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center px-4 gap-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center text-center w-full max-w-xs min-h-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="mb-6 text-4xl md:text-5xl text-[#4dff71]">
              {step.icon}
            </div>
            <h4 className="text-lg md:text-xl font-semibold text-[#0d9488] dark:text-[#36d7b7] mb-3">
              {step.title}
            </h4>
            <p className="font-mono text-gray-600 dark:text-gray-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
