"use client";

import Heading from "../@utils/Heading";
import Header from "../@components/Header";
import Footer from "../@components/Footer";
import Contact from "../@components/Contact";

const Page = () => {
  return (
    <div>
      <Heading
        title="Contact Us | govScheme"
        description="Platform for learning new technologies and programming."
        keywords="Programming,mern,dmbs,machine,learning"
      />
      <Header />
      <div className="min-h-screen mt-24">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
