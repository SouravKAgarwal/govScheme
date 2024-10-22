"use client";

import Footer from "@/app/@components/Footer";
import Header from "@/app/@components/Header";
import Schemes from "@/app/@components/scheme/Schemes";
import Heading from "@/app/@utils/Heading";

const Page = () => {
  return (
    <div>
      <Heading
        title="States"
        description="Platform for learning new technologies and programming."
        keywords="Programming,mern,dmbs,machine,learning"
      />
      <Header />
      <Schemes type="States/UTs" count={36} />
      <Footer />
    </div>
  );
};

export default Page;
