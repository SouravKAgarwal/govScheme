"use client";

import Heading from "../@utils/Heading";
import Header from "../@components/Header";
import Footer from "../@components/Footer";
import FAQ from "../@components/FAQ";

const Page = () => {
  return (
    <div>
      <Heading
        title="FAQ"
        description="Platform for learning new technologies and programming."
        keywords="Programming,mern,dmbs,machine,learning"
      />
      <Header />
      <div className="min-h-screen mt-20">
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
