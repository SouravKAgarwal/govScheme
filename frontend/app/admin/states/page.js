"use client";

import Heading from "../../@utils/Heading";
import AdminSidebar from "../../@components/admin/AdminSidebar";
import DashboardHero from "../../@components/admin/DashboardHero";
import AdminProtected from "../../@hooks/useAdminProtected";
import EditStates from "@/app/@components/admin/layout/EditStates";

const Admin = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="States"
          description="Platform for learning new technologies and programming."
          keywords="Programming,mern,dmbs,machine,learning"
        />
        <div className="flex min-h-screen">
          <div className="2xl:w-[15%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="2xl:w-[85%] w-4/5">
            <DashboardHero />
            <EditStates />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Admin;
