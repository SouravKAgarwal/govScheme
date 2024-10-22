"use client";

import Footer from "@/app/@components/Footer";
import Header from "@/app/@components/Header";
import SchemePage from "@/app/@components/scheme/SchemePage";
import Heading from "@/app/@utils/Heading";

const Page = ({ params }) => {
  const categoryName = params.categoryName;

  return (
    <div>
      <Heading
        title={decodeURIComponent(categoryName)}
        description="Platform for learning new technologies and programming."
        keywords="Programming,mern,dmbs,machine,learning"
      />
      <Header />
      <div className="min-h-screen mt-[72px]">
        <SchemePage categoryName={categoryName} />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
