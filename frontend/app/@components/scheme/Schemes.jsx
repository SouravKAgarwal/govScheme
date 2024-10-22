import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowBack } from "@mui/icons-material";
import { BiRightArrowAlt } from "react-icons/bi";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutApi";

const Schemes = ({ type, count }) => {
  const { data: categoriesData } = useGetLayoutQuery("Categories");
  const { data: ministriesData } = useGetLayoutQuery("Ministries");
  const { data: statesData } = useGetLayoutQuery("States");

  const [selectedTab, setSelectedTab] = useState(
    type ? type : sessionStorage.getItem("tab") ?? "Categories"
  );
  const [visibleCount, setVisibleCount] = useState(count || 15);
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [ministries, setMinistries] = useState([]);
  const [states, setStates] = useState([]);

  const router = useRouter();

  useEffect(() => {
    if (categoriesData && categoriesData.layout.categories) {
      setCategories(categoriesData.layout.categories);
    }
    if (ministriesData && ministriesData.layout.ministries) {
      setMinistries(ministriesData.layout.ministries);
    }
    if (statesData && statesData.layout.states) {
      setStates(statesData.layout.states);
    }
  }, [categoriesData, ministriesData, statesData]);

  const handleTabClick = (tab) => {
    sessionStorage.setItem("tab", tab);
    setSelectedTab(tab);
    setVisibleCount(15);
    setSearchInput("");
  };

  const handleViewMore = () => {
    if (selectedTab === "States/UTs") {
      router.push("/search/states/all-states");
    } else if (selectedTab === "Central Ministries") {
      router.push("/search/ministries/all-ministries");
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const filteredMinistries = ministries.filter((ministry) =>
    ministry.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50/40 relative px-4 md:px-10 lg:px-20 py-20 md:py-28 dark:from-gray-800 dark:to-gray-900">
      {type && (
        <div className="mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-blue-500 hover:text-blue-600 transition"
          >
            <ArrowBack className="text-blue-500 text-lg w-8 h-8" />
            <span className="font-semibold">Back</span>
          </button>
        </div>
      )}

      {!type && (
        <div
          className={`flex justify-center space-x-8 ${type ? "pb-0" : "pb-8"}`}
        >
          <button
            onClick={() => handleTabClick("Categories")}
            className={`font-medium ${
              selectedTab === "Categories"
                ? "bg-green-100 dark:bg-gray-400 dark:text-gray-900 text-green-700 py-1 px-3 rounded"
                : ""
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => handleTabClick("States/UTs")}
            className={`font-medium ${
              selectedTab === "States/UTs"
                ? "bg-green-100 dark:bg-gray-400 dark:text-gray-900 text-green-700 py-1 px-3 rounded"
                : ""
            }`}
          >
            States/UTs
          </button>
          <button
            onClick={() => handleTabClick("Central Ministries")}
            className={`font-medium ${
              selectedTab === "Central Ministries"
                ? "bg-green-100 dark:bg-gray-400 dark:text-gray-900 text-green-700 py-1 px-3 rounded"
                : ""
            }`}
          >
            Central Ministries
          </button>
        </div>
      )}

      <div className="text-center mb-6">
        <h1
          className={
            type
              ? "text-lg font-medium text-gray-500"
              : "text-3xl font-extrabold text-black dark:text-white"
          }
        >
          {selectedTab === "Categories"
            ? "Find schemes based"
            : "Explore schemes of"}
        </h1>
        <h2 className="text-3xl font-extrabold text-black dark:text-white">
          {selectedTab === "States/UTs"
            ? "States/UTs"
            : selectedTab === "Central Ministries"
            ? "Central Schemes"
            : "on categories"}
        </h2>
      </div>

      {type && (
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Please type in keyword to search"
            value={searchInput}
            onChange={handleSearchInputChange}
            className="w-full md:w-1/3 border rounded p-2 focus:outline-none"
          />
        </div>
      )}

      {selectedTab === "States/UTs" && (
        <>
          <div className="grid relative grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8 gap-6 px-4 md:px-10 py-10 mt-4">
            {filteredStates
              .sort((a, b) => a.name.localeCompare(b.name))
              .slice(0, visibleCount)
              .map((state, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center group min-h-[6rem] md:min-h-[6.5rem] py-3 px-3 text-left md:px-2 rounded-lg bg-white dark:bg-[#050D16] shadow hover:shadow-md relative overflow-hidden cursor-pointer group transition-shadow duration-300 w-full"
                  onClick={() =>
                    router.push(
                      `/search/states/${decodeURIComponent(state.name)}`
                    )
                  }
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={state.icon.url}
                      alt={`${state.name} logo`}
                      className="w-10 h-10 opacity-20 dark:opacity-80"
                    />
                  </div>

                  <div className="flex flex-col items-start justify-center w-[80%] pl-4">
                    <h2 className="group-hover:text-green-700 dark:group-hover:text-green-500 font-semibold text-sm line-clamp-1">
                      {state.name.length > 20
                        ? `${state.name.substring(0, 80)}...`
                        : state.name}
                    </h2>
                    <div className="flex flex-row items-center justify-between mt-2 gap-3">
                      <span className="text-green-700 dark:text-green-500 font-medium text-sm">
                        {state.stateSchemes}{" "}
                        <span className="inline-block text-gray-500 dark:text-gray-200 text-xs">
                          State
                        </span>
                      </span>
                      <span className="text-green-700 dark:text-green-500 text-sm font-medium ">
                        {state.centralSchemes}{" "}
                        <span className="inline-block text-gray-500 dark:text-gray-200 text-xs">
                          Central
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {visibleCount < states.length && (
            <div className="text-center mt-6">
              <button
                onClick={() => handleViewMore()}
                className="inline-flex items-center gap-2 px-3 py-2 bg-transparent dark:text-gray-200 dark:border-gray-200 text-green-700 border border-green-700 rounded-md outline-none"
              >
                View All
                <span>
                  <BiRightArrowAlt className="w-6 h-6" />
                </span>
              </button>
            </div>
          )}
        </>
      )}

      {selectedTab === "Categories" && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 md:gap-x-10 gap-y-10 px-4 md:px-10 py-10 mt-4">
            {filteredCategories
              .sort((a, b) => a.name.localeCompare(b.name))
              .slice(0, visibleCount)
              .map((category, index) => (
                <div
                  key={index}
                  className="group text-center cursor-pointer"
                  onClick={() =>
                    router.push(`/search/category/${category.name}`)
                  }
                >
                  <div className="transition ease-in-out group-hover:animate-bounce inline-block relative text-sky-500 text-2xl leading-none p-4 z-0 after:absolute after:content[] after:bottom-0 after:left-0 after:w-[110%] after:h-2/5 after:bg-sky-100/60 after:dark:bg-gray-800 after:rounded-[50%] after:-rotate-12 after:-z-1">
                    <span className="flex justify-center items-center">
                      <img
                        alt={category.name}
                        title={category.title}
                        src={category.icon.url}
                        className="block w-12 h-12 z-10 object-contain brightness-75 dark:brightness-100"
                      />
                    </span>
                  </div>
                  <p className="text-sm md:text-base text-green-800 dark:text-green-500 leading-none group-hover:text-green-600 pt-3 pb-1.5 m-0 transition-all ease-in-out font-mono">
                    {category.totalSchemes} Schemes
                  </p>
                  <p className="text-base leading-5 font-medium dark:text-white transition-all m-0 ease-in-out">
                    {category.name}
                  </p>
                </div>
              ))}
          </div>
          {visibleCount < categories.length && (
            <div className="text-center mt-6">
              <button
                onClick={() => handleViewMore()}
                className="inline-flex items-center gap-2 px-3 py-2 bg-transparent dark:text-gray-200 dark:border-gray-200 text-green-700 border border-green-700 rounded-md outline-none"
              >
                View All
                <span>
                  <BiRightArrowAlt className="w-6 h-6" />
                </span>
              </button>
            </div>
          )}
        </>
      )}

      {selectedTab === "Central Ministries" && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-5 md:gap-x-10 gap-y-6 px-4 md:px-10 py-10 mt-4">
            {filteredMinistries
              .sort((a, b) => a.name.localeCompare(b.name))
              .slice(0, visibleCount)
              .map((ministry, index) => (
                <div
                  key={index}
                  className="w-[175px] bg-white dark:bg-black/40 p-4 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/search/ministries/${decodeURIComponent(ministry.name)}`
                    )
                  }
                >
                  <div>
                    <h3
                      className="text-sm font-bold w-32 h-10"
                      title={ministry.name}
                    >
                      {ministry.name.length > 20
                        ? `${ministry.name.substring(0, 25)}...`
                        : ministry.name}
                    </h3>
                  </div>
                  <div className="flex flex-col mt-1">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        {ministry.totalSchemes} Schemes
                      </p>
                      <img
                        src={ministry.icon.url}
                        alt={`${ministry.name} logo`}
                        className="w-10 h-10 opacity-30 dark:opacity-80"
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {visibleCount < ministries.length && (
            <div className="text-center mt-6">
              <button
                onClick={() => handleViewMore()}
                className="inline-flex items-center gap-2 px-3 py-2 bg-transparent dark:text-gray-200 dark:border-gray-200 text-green-700 border border-green-700 rounded-md outline-none"
              >
                View All
                <span>
                  <BiRightArrowAlt className="w-6 h-6" />
                </span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Schemes;
