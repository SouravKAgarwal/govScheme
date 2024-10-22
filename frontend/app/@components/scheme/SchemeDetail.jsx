"use client";

import { useRouter } from "next/navigation";
import { BiLeftArrowAlt } from "react-icons/bi";
import {
  FaLink,
  FaFacebookF,
  FaLinkedinIn,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import ApplicationProcess from "./ApplicationProcess";
import { FiMail } from "react-icons/fi";
import { TbBrandTelegram, TbBrandWhatsapp, TbBrandX } from "react-icons/tb";
import { Link } from "react-scroll";
import { toast } from "sonner";
import { useGetPopularSchemesQuery } from "@/redux/features/schemes/schemeApi";
import Image from "next/image";
import { checkEligibility, extractEligibilityCriteria } from "@/app/@utils";
import { FiLink } from "react-icons/fi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlices";

const headerData = [
  { title: "Details", link: "#details" },
  { title: "Benefits", link: "#benefits" },
  { title: "Eligibility", link: "#eligibility" },
  { title: "Exclusions", link: "#exclusions" },
  { title: "Required Documents", link: "#required-documents" },
  { title: "Application Process", link: "#application-process" },
  { title: "FAQ's", link: "#faqs" },
  { title: "References", link: "#references" },
];

const Header = ({ title, link }) => (
  <Link
    to={link.substring(1)}
    smooth={true}
    duration={500}
    className="flex flex-row items-center gap-2 group"
  >
    <h3 className="text-lg md:text-2xl sm:text-xl font-Poppins font-[600] hover:cursor-pointer">
      {title}
    </h3>
    <FaLink
      className="text-gray-600 dark:text-gray-300 hidden group-hover:block"
      height="1em"
      width="1em"
    />
  </Link>
);

const Navigation = () => (
  <div className="md:sticky hidden md:block left-0 top-32 h-full w-56 rounded-lg space-y-6">
    <ul className="flex flex-col space-y-5">
      {headerData.map((item, index) => (
        <li
          key={index}
          className="cursor-pointer font-semibold hover:text-blue-500"
        >
          <Link
            to={item.link.substring(1)}
            smooth={true}
            duration={500}
            className="block py-2"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SchemeSidebar = ({ url, title, isEligible, popular, router }) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };
  return (
    <div className="md:sticky right-0 top-28 h-full w-full md:w-72 p-4 space-y-4">
      {isEligible !== null && (
        <div
          className={`w-full hidden lg:block p-4 text-sm text-white rounded-md ${
            isEligible ? "bg-green-500" : "bg-red-600"
          }`}
        >
          {isEligible
            ? "You may be eligible for this scheme."
            : "You are not eligible for this scheme."}
        </div>
      )}
      <div className="bg-white dark:bg-[#050D16] p-3 rounded-lg shadow-md transition-shadow">
        <h2 className="font-semibold text-lg mb-2">Share</h2>
        <hr className="border-gray-200 mb-3" />
        <div className="flex flex-wrap gap-3">
          <a
            href=""
            className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700"
          >
            <FiMail className="text-lg" />
          </a>
          <a
            href={`https://www.facebook.com/dialog/share?app_id=729886652298272&display=popup&href=${url}`}
            target="__blank"
            className="bg-blue-600 p-2 text-white rounded-full hover:bg-blue-800"
          >
            <FaFacebookF className="text-lg" />
          </a>
          <a
            href={`https://t.me/share/url?url=${url}&text=${title}`}
            className="bg-cyan-500 p-2 rounded-full text-white hover:bg-cyan-800"
          >
            <TbBrandTelegram className="text-lg" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${title}&url=${url}`}
            className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-700"
          >
            <TbBrandX className="text-lg" />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${url}`}
            target="__blank"
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-700"
          >
            <TbBrandWhatsapp className="text-lg" />
          </a>
          <a
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`}
            className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-900"
          >
            <FaLinkedinIn className="text-lg" />
          </a>
          <button
            onClick={handleCopyToClipboard}
            className="text-yellow-500 border-yellow-500 border p-2 rounded-full hover:text-yellow-600"
          >
            <FiLink className="text-lg" />
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-[#050D16] p-4 rounded-lg shadow-md transition-shadow">
        <h2 className="font-semibold text-lg mb-2">Popular Schemes</h2>
        <hr className="border-gray-200 mb-2" />
        {popular && popular.schemes.length > 0 ? (
          popular.schemes.map((item, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center gap-2 mb-2"
              onClick={() => router.push(`/scheme/${item.slug}`)}
            >
              <Image
                src={item.basicDetails.schemeImageUrl}
                width={1000}
                height={1000}
                alt={item.basicDetails.schemeName}
                className="w-16 h-10 object-cover rounded"
              />
              <h3 className="font-medium text-xs">
                {item.basicDetails.schemeName}
              </h3>
            </div>
          ))
        ) : (
          <p>No popular schemes available.</p>
        )}
      </div>
    </div>
  );
};

const SchemeDetail = ({ data }) => {
  const {
    basicDetails,
    documents_required,
    eligibilityDescription,
    schemeContent,
    applicationProcess,
    faqs,
    slug,
  } = data.scheme;

  const { data: popular } = useGetPopularSchemesQuery();

  const router = useRouter();
  const { data: userData } = useLoadUserQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [openIndex, setOpenIndex] = useState(null);
  const [isEligible, setIsEligible] = useState(null);
  const [user, setUser] = useState();

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleEligibility = () => {
    const eligibilityCriteria = extractEligibilityCriteria(
      eligibilityDescription
    );

    const isEligible = checkEligibility(user.criteria, eligibilityCriteria);
    setIsEligible(isEligible);
  };

  useEffect(() => {
    if (userData && userData.user) {
      setUser(userData.user);
    }
  }, [userData]);

  return (
    <>
      <button
        className="flex items-center gap-1 px-5 py-2.5 rounded-md border-0 bg-transparent !p-0 transition ease-in-out font-medium leading-none text-indigo-600 dark:text-gray-400 opacity-80 mt-3 mb-3 sm:mb-1"
        onClick={() => router.back()}
      >
        <BiLeftArrowAlt />
        Back
      </button>
      <div className="flex relative flex-col md:flex-row pb-32 px-4">
        <Navigation />

        <div className="w-full md:w-[63%] md:px-8 px-4 mx-auto">
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
            <div className="flex flex-wrap gap-4 justify-start mt-4 w-full">
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
          </div>

          {user ? (
            <div className="mt-6">
              <button
                className="inline-flex items-center gap-2 px-3 py-2 bg-transparent dark:text-gray-200 dark:border-gray-200 text-blue-700 border text-[14px] border-blue-700 rounded-md outline-none"
                onClick={handleEligibility}
              >
                Check Eligibility
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <button
                className="inline-flex items-center gap-2 px-3 py-2 bg-transparent dark:text-gray-200 dark:border-gray-200 text-blue-700 border text-[14px] border-blue-700 rounded-md outline-none"
                onClick={() => toast.error("Login to access")}
              >
                Login to Check Eligibility
              </button>
            </div>
          )}

          {headerData.map((header, index) => (
            <div
              key={index}
              className="py-4 pt-10"
              id={header.title.toLowerCase().replace(" ", "-").replace("'", "")}
            >
              <Header title={header.title} link={header.link.substring(1)} />
              {header.title === "Details" && (
                <div className="w-full flex md:items-center py-2">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: schemeContent.detailedDescription,
                    }}
                  ></div>
                </div>
              )}
              {header.title === "Benefits" && (
                <div className="w-full flex md:items-center py-2">
                  <div
                    dangerouslySetInnerHTML={{ __html: schemeContent.benefits }}
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
                <div>
                  <ApplicationProcess data={applicationProcess} />
                </div>
              )}
              {header.title === "FAQ's" && (
                <div className="space-y-4">
                  {faqs.map((item, index) => (
                    <div key={index} className="py-2">
                      <button
                        className="font-semibold text-left"
                        onClick={() => toggleFAQ(index)}
                      >
                        {item.question}
                      </button>
                      {openIndex === index && (
                        <p className="pt-2 text-gray-500">{item.answer}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {header.title === "References" && (
                <div>
                  <ol className="list-decimal pl-6">
                    {schemeContent.references.map((item, index) => (
                      <li key={index} className="pl-2 py-2">
                        <div className="flex items-center gap-2">
                          {item.title}
                          <FaExternalLinkAlt
                            className="text-blue-500"
                            onClick={() => router.push(item.url)}
                          />
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}
          <div className="w-full block md:hidden mt-6">
            <SchemeSidebar
              url={process.env.NEXT_PUBLIC_URI + `/scheme/${slug}`}
              title={basicDetails.schemeName}
              isEligible={isEligible}
              popular={popular}
              router={router}
            />
          </div>
        </div>

        <div className="hidden md:block">
          <SchemeSidebar
            url={process.env.NEXT_PUBLIC_URI + `/scheme/${slug}`}
            title={basicDetails.schemeName}
            isEligible={isEligible}
            popular={popular}
            router={router}
          />
        </div>
      </div>
    </>
  );
};

export default SchemeDetail;
