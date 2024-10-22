"use client";

import Footer from "@/app/@components/Footer";
import Header from "@/app/@components/Header";
import Schemes from "@/app/@components/scheme/Schemes";
import Heading from "@/app/@utils/Heading";
import { useState } from "react";

const Page = () => {
  return (
    <div>
      <Heading
        title="Ministries"
        description="Platform for learning new technologies and programming."
        keywords="Programming,mern,dmbs,machine,learning"
      />
      <Header />
      <Schemes type="Central Ministries" count={47} />
      <Footer />
    </div>
  );
};

export default Page;
