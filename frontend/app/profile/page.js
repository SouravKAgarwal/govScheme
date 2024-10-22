"use client";

import Protected from "../@hooks/useProtected";
import Heading from "../@utils/Heading";
import Profile from "../@components/profile/Profile";
import { useSelector } from "react-redux";
import Header from "../@components/Header";
import Footer from "../@components/Footer";

const Page = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Protected>
        <Heading
          title={`${user.name}- Profile`}
          description="Platform for learning new technologies and programming."
          keywords="Programming,mern,dmbs,machine,learning"
        />
        <Header />
        <Profile user={user} />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
