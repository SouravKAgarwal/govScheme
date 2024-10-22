"use client";

import Heading from "../@utils/Heading";
import Header from "../@components/Header";
import Footer from "../@components/Footer";
import Privacy from "../@components/Privacy.jsx";

const Page = () => {
  return (
    <div>
      <Heading
        title="Privacy Policy | E-Learning"
        description="Platform for learning new technologies and programming."
        keywords="Programming,mern,dmbs,machine,learning"
      />
      <Header />
      <div className="min-h-screen mt-24">
        <Privacy />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
