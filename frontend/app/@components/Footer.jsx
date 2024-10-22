import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#2f2b45] dark:bg-[#050D16] relative z-0 after:absolute after:-top-3 lg:after:-top-6 after:-left-1 after:w-full after:h-0 after:border-[#2f2b45] dark:after:border-[#050D16] after:border-[50px] after:border-solid after:-z-10 after:rotate-[3deg] lg:after:rotate-[2deg] after:transform -mt-16">
      <footer className="relative px-3 pt-6 mt-16 lg:px-9">
        <div className="gap-8 grid grid-cols-1 py-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                width={50}
                height={50}
                className="h-10 w-auto"
                src={`https://cdn.myscheme.in/images/logos/emblem-white.svg`}
                alt="logo"
              />
              <div className="flex font-extrabold flex-col">
                <div className="text-2xl text-white">
                  gov
                  <span className="text-3xl text-green-500">Scheme</span>
                </div>
              </div>
            </Link>
            <div className="mt-6">
              <p className="text-sm text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                felis mi, faucibus dignissim lorem id, imperdiet interdum
                mauris. Vestibulum ultrices sed libero non porta. Vivamus
                malesuada urna eu nibh malesuada, non finibus massa laoreet.
                Nunc nisi velit, feugiat a semper quis, pulvinar id libero.
                Vivamus mi diam, consectetur non orci ut, tincidunt pretium
                justo. In vehicula porta molestie. Suspendisse potenti.
              </p>
              <div className="flex items-center flex-row mt-4 gap-3 sm:gap-2">
                <div className="cursor-pointer h-8 w-8 rounded-full border border-gray-400 flex items-center justify-center text-white">
                  <FaLinkedin size={15} />
                </div>
                <div className="cursor-pointer h-8 w-8 rounded-full border border-gray-400 flex items-center justify-center text-white">
                  <FaFacebookF size={15} />
                </div>
                <div className="cursor-pointer h-8 w-8 rounded-full border border-gray-400 flex items-center justify-center text-white">
                  <FaGithub size={15} />
                </div>
                <div className="cursor-pointer h-8 w-8 rounded-full border border-gray-400 flex items-center justify-center text-white">
                  <FaInstagram size={15} />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <h2 className="text-white text-2xl font-heading font-semibold mb-6">
              Useful Links
            </h2>
            <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 gap-2 text-white items-center">
              <li
                title="digitalIndia"
                className="bg-white dark:bg-[#24262b] p-2 rounded-md duration-500 border-3 border-solid border-darkIndigo-900 dark:border-dark hover:border-gray-500 transition-all ease-in-out text-sm cursor-pointer"
              >
                <div className="relative w-full h-10">
                  <img
                    alt="digitalIndia"
                    title="digitalIndia"
                    src="https://cdn.myscheme.in/images/usefulLinks/di.png"
                    className="w-full h-full object-contain"
                  />
                </div>
              </li>
              <li
                title="digilocker"
                className="bg-white dark:bg-[#24262b] p-2 rounded-md duration-500 border-3 border-solid border-darkIndigo-900 dark:border-dark hover:border-gray-500 transition-all ease-in-out text-sm cursor-pointer"
              >
                <div className="relative w-full h-10">
                  <img
                    alt="digilocker"
                    title="digilocker"
                    src="https://cdn.myscheme.in/images/usefulLinks/digilocker.png"
                    className="w-full h-full object-contain"
                  />
                </div>
              </li>
              <li
                title="umang"
                className="bg-white dark:bg-[#24262b] p-2 rounded-md duration-500 border-3 border-solid border-darkIndigo-900 dark:border-dark hover:border-gray-500 transition-all ease-in-out text-sm cursor-pointer"
              >
                <div className="relative w-full h-10">
                  <img
                    alt="umang"
                    title="umang"
                    src="https://cdn.myscheme.in/images/usefulLinks/umang.png"
                    className="w-full h-full object-contain"
                  />
                </div>
              </li>
              <li
                title="indiaGov"
                className="bg-white dark:bg-[#24262b] p-2 rounded-md duration-500 border-3 border-solid border-darkIndigo-900 dark:border-dark hover:border-gray-500 transition-all ease-in-out text-sm cursor-pointer"
              >
                <div className="relative w-full h-10">
                  <img
                    alt="indiaGov"
                    title="indiaGov"
                    src="https://cdn.myscheme.in/images/usefulLinks/indiaGov.png"
                    className="w-full h-full object-contain"
                  />
                </div>
              </li>
              <li
                title="myGov"
                className="bg-white dark:bg-[#24262b] p-2 rounded-md duration-500 border-3 border-solid border-darkIndigo-900 dark:border-dark hover:border-gray-500 transition-all ease-in-out text-sm cursor-pointer"
              >
                <div className="relative w-full h-10">
                  <img
                    alt="myGov"
                    title="myGov"
                    src="https://cdn.myscheme.in/images/usefulLinks/myGov.png"
                    className="w-full h-full object-contain"
                  />
                </div>
              </li>
              <li
                title="dataGov"
                className="bg-white dark:bg-[#24262b] p-2 rounded-md duration-500 border-3 border-solid border-darkIndigo-900 dark:border-dark hover:border-gray-500 transition-all ease-in-out text-sm cursor-pointer"
              >
                <div className="relative w-full h-10">
                  <img
                    alt="dataGov"
                    title="dataGov"
                    src="https://cdn.myscheme.in/images/usefulLinks/dataGov.png"
                    className="w-full h-full object-contain"
                  />
                </div>
              </li>
              <li
                title="igod"
                className="bg-white dark:bg-[#24262b] p-2 rounded-md duration-500 border-3 border-solid border-darkIndigo-900 dark:border-dark hover:border-gray-500 transition-all ease-in-out text-sm cursor-pointer"
              >
                <div className="relative w-full h-10">
                  <img
                    alt="igod"
                    title="igod"
                    src="https://cdn.myscheme.in/images/usefulLinks/igod.png"
                    className="w-full h-full object-contain"
                  />
                </div>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <p className="text-2xl text-white font-bold tracking-wide">
              Get In Touch
            </p>
            <div className="mt-6">
              {/* <p className="text-white/80 text-sm leading-relaxed">
                4th Floor, NeGD, Electronics Niketan, 6 CGO Complex, Lodhi Road,
                New Delhi - 110003, India
              </p> */}
              <div className="mb-4">
                <p className="text-white/80 hover:text-white underline text-sm font-normal">
                  support-[at]govscheme[dot]gov[dot]in
                </p>
                {/* <p className="text-white/80 text-sm font-normal my-4">
                  (011) 24303714
                </p> */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse justify-between py-5 border-t lg:flex-row text-white">
          <p className="text-sm">
            © Copyright 2023 Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
