import { useGetSchemesQuery } from "@/redux/features/schemes/schemeApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Filters from "./Filters";
import { BiLeftArrowAlt } from "react-icons/bi";
import { GoInfo } from "react-icons/go";
import { useTheme } from "next-themes";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutApi";
import { filteredData } from "@/app/@utils";
import { IoSearchSharp } from "react-icons/io5";
import Pagination from "./Pagination";
import Link from "next/link";

const SearchBar = ({ search, setSearch }) => {
  return (
    <form className="w-full flex h-10 items-center relative">
      <input
        type="text"
        name="query"
        className="w-full h-full pl-4 pr-12 border border-solid border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-[#050D16] focus:outline-none"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className="absolute right-0 h-10 outline-none rounded-tr-md rounded-br-md rounded-bl-3xl bg-red-700/50 dark:!bg-indigo-100 px-4 py-2 cursor-pointer"
        type="submit"
      >
        <IoSearchSharp className="w-5 h-5 text-white dark:text-black" />
      </button>
    </form>
  );
};

const SortOptions = ({ setSortOption }) => {
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="flex-row items-center hidden sm:flex">
      <h5 className="hidden md:block text-gray-500 dark:text-gray-300 tracking-wide text-sm font-semibold whitespace-nowrap">
        Sort:
      </h5>
      <select
        className="border-0 py-0 bg-transparent outline-none text-base w-32 dark:text-white"
        aria-label="Sort by"
        onChange={handleSortChange}
      >
        <option
          className="bg-transparent dark:bg-[#050D16] px-4"
          value="relevance"
        >
          Relevance
        </option>
        <option
          className="bg-transparent dark:bg-[#050D16]"
          value="schemename-asc"
        >
          Scheme Name (A-Z)
        </option>
        <option
          className="bg-transparent dark:bg-[#050D16]"
          value="schemename-desc"
        >
          Scheme Name (Z-A)
        </option>
      </select>
    </div>
  );
};

const SchemeCard = ({ scheme, router }) => {
  const { basicDetails, slug } = scheme;
  return (
    <div className="mx-auto rounded-xl overflow-hidden w-full group hover:shadow-lg bg-white dark:bg-[#050D16] shadow-md transition-shadow">
      <div className="p-4 lg:p-8 w-full">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <h2>
              <Link
                className="block text-xl leading-tight font-medium text-[#24262B] dark:text-white"
                href={`/scheme/${slug}`}
              >
                <span>{basicDetails.schemeName}</span>
              </Link>
            </h2>
            <h2
              className="mt-3 font-normal cursor-pointer hover:underline dark:text-indigo-100"
              onClick={() =>
                router.push(
                  `/search/${
                    basicDetails.level === "Central" ? "ministries" : "states"
                  }/${
                    basicDetails.level === "Central"
                      ? basicDetails.ministryName
                      : basicDetails.state
                  }`
                )
              }
            >
              {basicDetails.level === "Central"
                ? basicDetails.ministryName
                : basicDetails.state}
            </h2>
            <span className="mt-3 text-[#24262B] line-clamp-2 dark:text-indigo-100 text-sm">
              {basicDetails.briefDescription}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-start mt-4 w-full">
          {scheme.basicDetails.tags.map((tag) => (
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
    </div>
  );
};

const Banner = ({ name, image, color }) => {
  const { theme } = useTheme();

  const desktopImage = theme === "dark" ? image?.dark.url : image?.light.url;

  const mobileImage =
    theme === "dark" ? image?.mobileDark.url : image?.mobileLight.url;

  return (
    <div className="relative">
      {name && image ? (
        <>
          <div className="relative w-full h-[200px] lg:h-[232px] mb-0 px-8 md:px-0 hidden sm:block">
            <span className="block absolute inset-0">
              <img
                alt={decodeURIComponent(name)}
                src={desktopImage}
                className="border-0 right-0 absolute inset-0 border-none block object-cover w-full h-full"
              />
            </span>
          </div>

          <div className="relative w-full h-[184px] mb-0 px-8 md:px-0 overflow-hidden block sm:hidden">
            <span className="block overflow-hidden border-0 absolute inset-0">
              <img
                alt={decodeURIComponent(name)}
                src={mobileImage}
                className="border-0 right-0 absolute inset-0 border-none block object-cover object-center h-full w-full"
              />
            </span>
          </div>
          <h2
            className={`absolute top-[50%] left-0 w-[60%] md:w-1/2 -translate-y-1/2 px-4 lg:px-28 text-left font-bold text-xl md:text-3xl lg:text-4xl z-10`}
            style={{ color: theme === "dark" ? "white" : `#${color}` }}
          >
            {decodeURIComponent(name)}
          </h2>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const SchemeList = ({ filteredSchemes, router }) => {
  return (
    <div className="gap-4 grid !grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {filteredSchemes.map((scheme) => (
        <SchemeCard router={router} key={scheme._id} scheme={scheme} />
      ))}
    </div>
  );
};

const SchemePage = ({ categoryName, stateName, ministryName }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: schemesData } = useGetSchemesQuery();
  const { data: categoriesData } = useGetLayoutQuery("Categories");
  const { data: ministriesData } = useGetLayoutQuery("Ministries");
  const { data: statesData } = useGetLayoutQuery("States");

  const [schemes, setSchemes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ministries, setMinistries] = useState([]);
  const [states, setStates] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [filteredSchemeList, setFilteredSchemeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [sortOption, setSortOption] = useState("relevance");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(filteredSchemeList.length / itemsPerPage);

  const state = stateName && filteredData(states, stateName);
  const category = categoryName && filteredData(categories, categoryName);
  const ministry = ministryName && filteredData(ministries, ministryName);

  useEffect(() => {
    if (schemesData && schemesData.schemes) {
      setSchemes(schemesData.schemes);
    }
    if (categoriesData && categoriesData.layout.categories) {
      setCategories(categoriesData.layout.categories);
    }
    if (ministriesData && ministriesData.layout.ministries) {
      setMinistries(ministriesData.layout.ministries);
    }
    if (statesData && statesData.layout.states) {
      setStates(statesData.layout.states);
    }
  }, [schemesData, categoriesData, ministriesData, statesData]);

  useEffect(() => {
    if (schemes.length > 0) {
      let filtered = [...schemes];

      if (searchTerm) {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        filtered = filtered.filter((scheme) => {
          const { schemeName, briefDescription, tags } =
            scheme?.basicDetails || {};

          const matchesSchemeName = schemeName
            ?.toLowerCase()
            .includes(lowercasedSearchTerm);
          const matchesDescription = briefDescription
            ?.toLowerCase()
            .includes(lowercasedSearchTerm);
          const matchesTags = tags?.some((tag) =>
            tag.toLowerCase().includes(lowercasedSearchTerm)
          );

          return matchesSchemeName || matchesDescription || matchesTags;
        });
      }

      if (selectedLevel !== "All") {
        filtered = filtered.filter(
          (scheme) => scheme.basicDetails.level === selectedLevel
        );
      }

      filtered = sortSchemes(filtered, sortOption);
      setFilteredSchemes(filtered);
    }
  }, [searchTerm, selectedLevel, schemes, sortOption]);

  useEffect(() => {
    let filteredList = filteredSchemes;

    if (stateName) {
      filteredList = filteredList.filter((scheme) =>
        scheme.basicDetails.state.some(
          (item) => item === decodeURIComponent(stateName)
        )
      );
    }

    if (categoryName) {
      filteredList = filteredList.filter((scheme) =>
        scheme.basicDetails.schemeCategory.some(
          (item) => item === decodeURIComponent(categoryName)
        )
      );
    }

    if (ministryName) {
      filteredList = filteredList.filter(
        (scheme) =>
          scheme.basicDetails.ministryName === decodeURIComponent(ministryName)
      );
    }

    setFilteredSchemeList(filteredList);
  }, [filteredSchemes, stateName, categoryName, ministryName, selectedLevel]);

  const paginatedSchemes = filteredSchemeList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const sortSchemes = (schemes, option) => {
    switch (option) {
      case "schemename-asc":
        return schemes.sort((a, b) =>
          a.basicDetails.schemeName.localeCompare(b.basicDetails.schemeName)
        );
      case "schemename-desc":
        return schemes.sort((a, b) =>
          b.basicDetails.schemeName.localeCompare(a.basicDetails.schemeName)
        );
      default:
        return schemes;
    }
  };

  const handleFilter = (filteredData) => {
    setFilteredSchemeList(filteredData);
  };

  const handleLevel = (level) => {
    sessionStorage.setItem("level", level);
    setSelectedLevel(level);
  };

  return (
    <div className="w-full">
      {categoryName && category && (
        <Banner
          name={categoryName}
          image={category.image}
          color={category.color}
        />
      )}
      {ministryName && ministry && (
        <Banner
          name={ministryName}
          image={ministry.image}
          color={ministry.color}
        />
      )}
      {stateName && state && (
        <Banner name={stateName} image={state.image} color={state.color} />
      )}

      <div className="w-full mx-auto px-4 lg:px-0">
        <button
          className="flex items-center gap-1 px-5 py-2.5 text-base rounded-md border-0 bg-transparent !p-0 transition ease-in-out font-medium leading-none text-indigo-600 dark:text-gray-400 opacity-80 mt-3 mb-3 sm:mb-1"
          onClick={() => router.back()}
        >
          <BiLeftArrowAlt className="w-4 h-4" />
          Back
        </button>

        <div className="w-full grid grid-cols-4 gap-4 p-4 min-h-screen relative">
          <div className="sm:col-span-1 sm:block hidden">
            <Filters
              schemes={schemes}
              onFilter={handleFilter}
              categoriesData={categories}
              ministriesData={ministries}
              statesData={states}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
            />
          </div>
          <div className="sm:col-span-3 col-span-4 items-center justify-center">
            <SearchBar search={searchTerm} setSearch={setSearchTerm} />
            <div className="flex items-start sm:items-center justify-start gap-1 pl-1 mt-1">
              <GoInfo className="w-4 h-4" />
              <label className="text-gray-500 dark:text-indigo-100 font-normal text-sm">
                For an exact match, put the words in quotes. For example:
                "Scheme Name".
              </label>
            </div>

            <div className="mt-4">
              <div className="overflow-x-auto flex flex-row items-center mb-2 border-b border-gray-200 pr-2 md:pr-4 hide-scrollbar">
                {["All", "State", "Central"].map((level) => (
                  <div
                    key={level}
                    className={`px-4 py-2 flex items-start justify-center capitalize hover:cursor-pointer ${
                      selectedLevel === level
                        ? "border-b-2 border-solid border-b-green-600 dark:text-white shadow-md rounded-t-md"
                        : ""
                    }`}
                    onClick={() => handleLevel(level)}
                  >
                    <span className="text-md leading-8 text-gray-700 capitalize font-heading whitespace-nowrap font-medium dark:text-gray-300">
                      {level} Schemes
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-row items-center justify-between my-4">
              <div className="flex flex-row items-center">
                <div className="flex flex-wrap items-center gap-2 ml-2">
                  <div className="text-base font-medium text-cyan-700 mb-0">
                    {searchTerm || location.pathname === "/search" ? (
                      <>
                        Total{" "}
                        <span className="text-lg font-bold text-blue-900 dark:text-white font-heading">
                          {filteredSchemeList.length}
                        </span>{" "}
                        schemes available
                      </>
                    ) : (
                      <>
                        We found{" "}
                        <span className="text-lg font-bold text-blue-900 dark:text-white font-heading">
                          {filteredSchemeList.length}
                        </span>{" "}
                        scheme{filteredSchemeList.length !== 1 ? "s" : ""} based
                        on your preferences.
                      </>
                    )}
                  </div>
                </div>
              </div>
              <SortOptions setSortOption={setSortOption} />
            </div>

            <div className="mt-2 mb-16">
              <SchemeList router={router} filteredSchemes={paginatedSchemes} />
              {totalPages > 0 && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemePage;
