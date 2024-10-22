import { useGetLayoutQuery } from "../../redux/features/layout/layoutApi";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import { Input } from "@headlessui/react";

const Hero = () => {
  const { data, isLoading } = useGetLayoutQuery("Banner");
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/search`);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="mx-auto max-w-4xl py-16 md:py-24 px-4 mt-16">
          <div className="w-full flex flex-col md:flex-row items-center gap-5">
            <div className="w-full md:w-2/5 flex items-center justify-center px-4 md:justify-end relative">
              {/* <div className="absolute hero-animation rounded-full w-72 h-72 inset-0 -top-5 left-16 md:left-auto md:-top-7 md:right-0 lg:-top-7 lg:left-2 z-0" /> */}
              <Image
                width={1000}
                height={1000}
                src={data?.layout.banner.image.url}
                alt="scheme-banner"
                className="w-full h-full object-cover object-center z-10"
                priority
              />
            </div>
            <div className="w-full md:w-3/5 sm:w-2/3 p-4 mt-10 md:mt-0">
              <h1 className="text-4xl font-bold tracking-tight capitalize">
                {data?.layout.banner.title || "Government Schemes"}
              </h1>
              <p className="mt-6 text-base leading-8 text-gray-400 dark:text-gray-500">
                {data?.layout.banner.subTitle ||
                  "Explore a variety of schemes designed to support your needs. Find the right scheme that matches your eligibility and apply today."}
              </p>
              <div className="w-full relative mt-10 flex gap-x-6">
                <Input
                  placeholder="Search Schemes..."
                  className="bg-transparent border dark:border-none font-Poppins dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-3 w-full h-full outline-none"
                  onClick={() => handleSearch()}
                />
                <div
                  className="absolute flex items-center justify-center w-[50px] h-full cursor-pointer right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
                  onClick={handleSearch}
                >
                  <BiSearch className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
