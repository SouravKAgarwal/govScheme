import ThemesSwitcher from "../ThemesSwitcher";

const DashboardHeader = () => {
  return (
    <div className="w-full flex items-center justify-end fixed p-6 top-0 z-50 right-0 bg-white dark:bg-[#0D131F]">
      <ThemesSwitcher />
    </div>
  );
};

export default DashboardHeader;
