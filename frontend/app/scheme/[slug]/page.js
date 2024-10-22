"use client";

import Footer from "@/app/@components/Footer";
import Header from "@/app/@components/Header";
import Loading from "@/app/@components/Loading";
import SchemeDetail from "@/app/@components/scheme/SchemeDetail";
import Heading from "@/app/@utils/Heading";
import { useGetSchemeDetailsQuery } from "@/redux/features/schemes/schemeApi";

const Page = ({ params }) => {
  const { data, isLoading } = useGetSchemeDetailsQuery(params.slug);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Heading
            title={`${data.scheme.basicDetails.schemeName}`}
            description={data.scheme.basicDetails.briefDescription}
            keywords={data.scheme.basicDetails.tags}
          />
          <Header />
          <div className="pt-20">
            <SchemeDetail data={data} />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Page;
