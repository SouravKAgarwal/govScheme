"use client";

import Heading from "./@utils/Heading";
import Header from "./@components/Header";
import Hero from "./@components/Hero";
import Schemes from "./@components/scheme/Schemes";
import Footer from "./@components/Footer";
import Steps from "./@components/Steps";
import FAQ from "./@components/FAQ";
import Stats from "./@components/Stats";

const Page = () => {
  return (
    <div>
      <Heading
        title="govScheme"
        description="Platform for learning new technologies and programming."
        keywords="Programming,mern,dmbs,machine,learning"
      />
      <Header />
      <Hero />
      <Stats />
      <Schemes />
      <Steps />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
