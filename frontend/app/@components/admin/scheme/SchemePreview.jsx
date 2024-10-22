import { useState } from "react";
import Loading from "../../Loading";
import ApplicationProcess from "../../scheme/ApplicationProcess";
import { FaLink } from "react-icons/fa";

const headerData = [
  { title: "Scheme Details", link: "#scheme-details" },
  { title: "Benefits", link: "#benefits" },
  { title: "Eligibility", link: "#eligibility" },
  { title: "Exclusions", link: "#exclusions" },
  { title: "Required Documents", link: "#required-documents" },
  { title: "Application Process", link: "#application-process" },
  { title: "FAQ's", link: "#faqs" },
];

const Header = ({ title, link }) => (
  <a href={link} className="flex flex-row items-center gap-2 group">
    <h3 className="text-lg md:text-2xl sm:text-xl font-Poppins font-[600] hover:cursor-pointer">
      {title}
    </h3>
    <FaLink
      className="text-gray-600 dark:text-gray-300 hidden group-hover:block"
      height="1em"
      width="1em"
    />
  </a>
);

const SchemePreview = ({
  active,
  setActive,
  schemeData,
  handleSchemeCreate,
  isLoading,
  isEdit,
}) => {
  const {
    basicDetails,
    documents_required,
    eligibilityDescription,
    schemeContent,
    applicationProcess,
    faqs,
  } = schemeData;

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const createScheme = () => {
    handleSchemeCreate();
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="w-[80%] m-auto py-10 mb-5">
            <div className="w-full py-4">
              <img
                src={basicDetails.schemeImageUrl}
                alt={basicDetails.schemeName}
                className="w-full h-auto object-cover rounded-lg"
              />
              <div className="flex items-center mt-6 space-x-2">
                <h1 className="font-Poppins mt-2 font-[600] text-[25px]">
                  {basicDetails.schemeName}
                </h1>
              </div>

              <p className="font-Poppins mt-2 text-sm pb-2">
                <span className="text-gray-500">
                  {basicDetails.level === "Central"
                    ? basicDetails.ministryName
                    : basicDetails.state}
                </span>
              </p>

              <div className="grid grid-cols-1 md:flex flex-wrap gap-4 justify-start items-center mt-3 w-full">
                {basicDetails.tags.map((tag) => (
                  <div
                    key={tag}
                    title={tag}
                    className="bg-transparent border border-solid hover:border-transparent border-green-700 text-green-700 hover:bg-green-700 hover:text-white rounded-full py-1.5 px-2.5 text-xs inline-block font-medium leading-none text-left md:text-center cursor-pointer"
                  >
                    <span>{tag}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <button className="inline-flex items-center gap-2 px-3 py-2 bg-transparent dark:text-gray-200 dark:border-gray-200 text-blue-700 border text-[14px] border-blue-700 rounded-md outline-none">
                  Check Eligibility
                </button>
              </div>

              {headerData.map((header, index) => (
                <div
                  key={index}
                  className="py-4 pt-10"
                  id={header.title.toLowerCase().replace(" ", "-")}
                >
                  <Header title={header.title} link={header.link} />
                  {header.title === "Scheme Details" && (
                    <div className="w-full flex md:items-center py-2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: schemeContent.detailedDescription,
                        }}
                      />
                    </div>
                  )}

                  {header.title === "Benefits" && (
                    <div className="w-full flex md:items-center py-2">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: schemeContent.benefits,
                        }}
                      />
                    </div>
                  )}
                  {header.title === "Eligibility" && (
                    <div>
                      <ol className="list-decimal pl-6">
                        {eligibilityDescription.map((item, index) => (
                          <li key={index} className="pl-2 py-2">
                            {item}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {header.title === "Exclusions" && (
                    <div>
                      <ol className="list-decimal pl-6">
                        {schemeContent.exclusions.map((item, index) => (
                          <li key={index} className="pl-2 py-2">
                            {item}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {header.title === "Required Documents" && (
                    <div>
                      <ol className="list-decimal pl-6">
                        {documents_required.map((item, index) => (
                          <li key={index} className="pl-2 py-2">
                            {item}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}
                  {header.title === "Application Process" && (
                    <ApplicationProcess data={applicationProcess} />
                  )}

                  {header.title === "FAQ's" && (
                    <dl className="space-y-4 rounded-md shadow-sm">
                      {faqs.map((item, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-200 dark:border-gray-700"
                        >
                          <dt
                            onClick={() => toggleFAQ(index)}
                            className="cursor-pointer text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 p-3"
                          >
                            {item.question}
                          </dt>
                          {openIndex === index && (
                            <dd className="text-base text-gray-600 dark:text-gray-300 p-3">
                              {item.answer}
                            </dd>
                          )}
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              ))}
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
                onClick={createScheme}
              >
                {isEdit ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SchemePreview;
