import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

const FilterSection = ({ title, children, isOpen, onToggle }) => (
  <div className="my-3">
    <div
      className="flex justify-between items-center cursor-pointer"
      onClick={onToggle}
    >
      <span className="text-base font-semibold text-dark dark:text-white">
        {title}
      </span>
      <span className="text-base font-bold text-green-700 dark:text-green-500 transition-transform">
        <PlusIcon height="1em" width="1em" />
      </span>
    </div>
    {isOpen && <div className="overflow-hidden">{children}</div>}
  </div>
);

const CheckboxItem = ({ label, count, checked, onChange }) => (
  <div className="flex flex-row justify-between items-center cursor-pointer my-2">
    <div className="w-[85%] flex flex-row items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mr-3 rounded border border-solid border-gray-300 text-green-700 cursor-pointer dark:bg-dark dark:border-gray-600"
        aria-labelledby={label}
      />
      <span className="text-sm text-dark hover:underline truncate dark:text-white">
        {label}
      </span>
    </div>
    <span className="text-semibold text-xs text-dark dark:text-white">
      {count}
    </span>
  </div>
);

const Filters = ({
  schemes,
  onFilter,
  categoriesData,
  statesData,
  ministriesData,
  setSelectedLevel,
  selectedLevel,
}) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedMinistry, setSelectedMinistry] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleResetFilters = () => {
    setSelectedState("");
    setSelectedLevel("");
    setSelectedMinistry("");
    setSelectedCategories([]);
    onFilter(schemes);
  };

  const filterSchemes = (schemes, filters) => {
    return schemes.filter((scheme) => {
      const matchesState =
        !filters.selectedState ||
        scheme.basicDetails.state.includes(filters.selectedState);

      const matchesMinistry =
        !filters.selectedMinistry ||
        scheme.basicDetails.ministryName.toLowerCase() ===
          filters.selectedMinistry.toLowerCase();

      const matchesLevel =
        !filters.selectedLevel ||
        scheme.basicDetails.level.toLowerCase() ===
          filters.selectedLevel.toLowerCase();

      const matchesCategories =
        !filters.selectedCategories ||
        scheme.basicDetails.schemeCategory.some((category) =>
          filters.selectedCategories.includes(category)
        );

      return (
        matchesState && matchesMinistry && matchesLevel && matchesCategories
      );
    });
  };

  const handleFilter = () => {
    const filters = {
      selectedState,
      selectedMinistry,
      selectedLevel,
      selectedCategories,
    };

    const filteredSchemes = filterSchemes(schemes, filters);

    onFilter(filteredSchemes);
  };

  useEffect(() => {
    handleFilter();
  }, [selectedState, selectedLevel, selectedMinistry, selectedCategories]);

  return (
    <div className="py-4 top-24">
      <div className="px-2 md:px-4">
        <div className="flex-row justify-between items-center border-0 border-solid border-b-2 border-gray-300 pb-2 hidden sm:flex">
          <h2 className="text-base text-blue-900 dark:text-white font-semibold">
            Filter By
          </h2>
          <button
            onClick={handleResetFilters}
            className="outline-none text-green-700 dark:text-green-500 text-base font-semibold"
          >
            Reset Filters
          </button>
        </div>

        <div className="my-3">
          <span className="text-base font-semibold text-dark dark:text-white">
            State
          </span>
          <div className="mt-1 dark:bg-dark dark:border-gray-600">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full border dark:bg-dark dark:border-gray-600 rounded-md px-2 py-1 focus:outline-none"
            >
              <option value="">Select State</option>
              {statesData.map((state) => (
                <option key={state._id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <FilterSection
          title="Categories"
          isOpen={isCategoryOpen}
          onToggle={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          {categoriesData.map((category) => (
            <CheckboxItem
              key={category._id}
              label={category.name}
              count={category.totalSchemes || 0}
              checked={selectedCategories.includes(category.name)}
              onChange={() => handleCategoryChange(category.name)}
            />
          ))}
        </FilterSection>

        <div className="my-3">
          <span className="text-base font-semibold text-dark dark:text-white">
            Ministry
          </span>
          <div className="mt-1 dark:bg-dark dark:border-gray-600">
            <select
              value={selectedMinistry}
              onChange={(e) => setSelectedMinistry(e.target.value)}
              className="w-full border dark:bg-dark dark:border-gray-600 rounded-md px-2 py-1 focus:outline-none"
            >
              <option value="">Select Ministry</option>
              {ministriesData.map((ministry) => (
                <option key={ministry._id} value={ministry.name}>
                  {ministry.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
