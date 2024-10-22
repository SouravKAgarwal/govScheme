"use client";

import Footer from "@/app/@components/Footer";
import Header from "@/app/@components/Header";
import SchemePage from "@/app/@components/scheme/SchemePage";
import Heading from "@/app/@utils/Heading";

const Page = ({ params }) => {
  const ministryName = params.ministry;

  return (
    <div>
      <Heading
        title={decodeURIComponent(ministryName)}
        description="Platform for learning new technologies and programming."
        keywords="Programming,mern,dmbs,machine,learning"
      />
      <Header />
      <div className="min-h-screen mt-[72px]">
        <SchemePage ministryName={ministryName} />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
