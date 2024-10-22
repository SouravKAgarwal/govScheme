import Image from "next/image";

const About = () => {
  return (
    <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 pb-4">
            About Us
          </h1>
          <p className="font-normal text-base leading-6 text-gray-500">
            We are a group of dedicated students from RTU Kota, committed to
            leveraging technology to create impactful projects that serve our
            community. Our goal is to enhance accessibility and provide
            innovative solutions that address real-world problems, making a
            difference in the lives of individuals and society as a whole.
          </p>
        </div>
        <div className="w-full lg:w-8/12 ">
          <Image
            className="w-full h-full"
            src="https://i.ibb.co/FhgPJt8/Rectangle-116.png"
            alt="A group of Students"
            width={1000}
            height={1000}
          />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 pb-4">
            Our Team
          </h1>
          <p className="font-normal text-base leading-6 text-gray-500">
            Our journey began with a vision to empower our peers and the
            community through technology. As students of RTU Kota, we are
            passionate about utilizing our skills to develop projects that
            foster learning, collaboration, and growth. Each project reflects
            our dedication to innovation and our desire to contribute positively
            to society.
          </p>
        </div>
        <div className="w-full lg:w-8/12 lg:pt-8">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 shadow-lg rounded-md">
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                className="md:block hidden"
                src="https://firebasestorage.googleapis.com/v0/b/voter-9cb8a.appspot.com/o/IMG_20240409_124254_734.jpg?alt=media&token=7d112fb1-b9bc-403c-b6f6-8b13e4b056fe"
                alt="Project Image 1"
                width={1000}
                height={1000}
              />
              <Image
                className="md:hidden block"
                src="https://i.ibb.co/zHjXqg4/Rectangle-118.png"
                alt="Project Image 1"
                width={1000}
                height={1000}
              />
              <p className="font-medium text-sm mt-4">Sourav Kr Agarwal</p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                className="md:block hidden"
                src="https://i.ibb.co/fGmxhVy/Rectangle-119.png"
                alt="Project Image 2"
                width={1000}
                height={1000}
              />
              <Image
                className="md:hidden block"
                src="https://i.ibb.co/NrWKJ1M/Rectangle-119.png"
                alt="Project Image 2"
                width={1000}
                height={1000}
              />
              <p className="font-medium text-xl leading-5 mt-4">Project 2</p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                className="md:block hidden"
                src="https://i.ibb.co/Pc6XVVC/Rectangle-120.png"
                alt="Project Image 3"
                width={1000}
                height={1000}
              />
              <Image
                className="md:hidden block"
                src="https://i.ibb.co/C5MMBcs/Rectangle-120.png"
                alt="Project Image 3"
                width={1000}
                height={1000}
              />
              <p className="font-medium text-xl leading-5 mt-4">Project 3</p>
            </div>
            <div className="p-4 pb-6 flex justify-center flex-col items-center">
              <Image
                className="md:block hidden"
                src="https://i.ibb.co/7nSJPXQ/Rectangle-121.png"
                alt="Project Image 4"
                width={1000}
                height={1000}
              />
              <Image
                className="md:hidden block"
                src="https://i.ibb.co/ThZBWxH/Rectangle-121.png"
                alt="Project Image 4"
                width={1000}
                height={1000}
              />
              <p className="font-medium text-xl leading-5 mt-4">Project 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
