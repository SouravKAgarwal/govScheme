import { BiBorderLeft } from "react-icons/bi";
import UserAnalytics from "../admin/analytics/UsersAnalytics";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";

const CircularProgressWithLabel = ({ value, open }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets = ({ open, value }) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery();

  const [userComparePercentage, setUserComparePercentage] = useState();

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      if (data) {
        const userLastTwoMonths = data.users.last12Month.slice(-2);

        if (userLastTwoMonths.length === 2) {
          const usersCurrentMonth = userLastTwoMonths[1].count;
          const usersPrevMonth = userLastTwoMonths[0].count;

          const usersPercentChange =
            usersPrevMonth === 0
              ? 100
              : ((usersCurrentMonth - usersPrevMonth) / usersPrevMonth) * 100;

          setUserComparePercentage({
            currentMonth: usersCurrentMonth,
            prevMonth: usersPrevMonth,
            percentChange: usersPercentChange,
          });
        }
      }
    }
  }, [isLoading, data]);

  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UserAnalytics isDashboard={true} />
        </div>
        <div className="mt-[40px] pr-8">
          <div className="w-full dark:bg-[#111c43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div>
                <PiUsersFourLight className="dark:text-[#45cba0] text-black text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-white text-black text-[20px]">
                  {userComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45cba0] text-black text-[12px] font-[400]">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={userComparePercentage?.percentChange > 0 ? 100 : 0}
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {userComparePercentage?.percentChange > 0
                    ? "+" + userComparePercentage?.percentChange.toFixed(2)
                    : "-" + userComparePercentage?.percentChange.toFixed(2)}
                  %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
