import { useGetTotalSchemesQuery } from "@/redux/features/analytics/analyticsApi";
import { useEffect, useState } from "react";

const Stats = () => {
  const { data } = useGetTotalSchemesQuery();
  const [totalSchemes, setTotalSchemes] = useState(0);
  const [centralSchemes, setCentralSchemes] = useState(0);
  const [stateSchemes, setStateSchemes] = useState(0);

  const statsData = [
    { title: "Total Schemes", value: totalSchemes },
    { title: "State Schemes", value: stateSchemes },
    { title: "Central Schemes", value: centralSchemes },
  ];

  useEffect(() => {
    if (data) {
      setTotalSchemes(data?.totalSchemes);
      setCentralSchemes(data.totalCentralSchemes);
      setStateSchemes(data.totalStateSchemes);
    }
  }, [data]);
  return (
    <div className="flex justify-center space-x-2 md:space-x-5 px-4 md:px-20 lg:px-40 mb-5">
      {statsData.map((item, index) => (
        <div
          key={index}
          className="w-[180px] flex flex-col items-center bg-white dark:bg-[#050D16] shadow-md rounded-lg p-4 text-center hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center font-bold text-green-500 dark:text-gray-400 mb-4">
            <p className="text-6xl">{item.value}</p>
            <span className="text-xl">+</span>
          </div>
          <h2 className="font-mono font-medium text-black dark:text-white">
            {item.title}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Stats;
