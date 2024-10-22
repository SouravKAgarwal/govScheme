import { HiMinus, HiPlus } from "react-icons/hi";
import { useGetLayoutQuery } from "../../redux/features/layout/layoutApi";
import { useEffect, useState } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { useRouter } from "next/navigation";

const FAQ = () => {
  const { data } = useGetLayoutQuery("FAQ");
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    data && setQuestions(data.layout.faq);
  }, [data]);

  const toggleQuestion = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return (
    <div className="relative min-h-[600px] py-14 bg-gradient-to-b from-white to-green-50 dark:from-gray-800 dark:to-gray-900">
      <h1 className="block text-xl text-center md:text-3xl font-Poppins font-bold pb-4">
        Frequently Asked Questions
      </h1>
      <div className="flex items-start px-4 md:px-10 lg:px-20 gap-4">
        <div className="hidden lg:block relative w-1/3 h-[400px] min-h-[400px]">
          <img
            src="https://cdn.myscheme.in/images/questions.svg"
            alt="Questions Illustration"
            className="absolute bottom-0 object-contain h-full"
          />
        </div>
        <div className="mb-10 px-20 p-6 w-full lg:w-2/3">
          <dl className="space-y-6">
            {questions.map((q) => (
              <div
                key={q._id}
                className={`${
                  q._id !== questions[0]._id && ""
                } border-gray-200`}
              >
                <dt className="text-lg">
                  <button
                    className="flex items-start w-full justify-between text-left focus:outline-none text-gray-800 hover:text-green-500 dark:text-white dark:hover:text-green-400 transition duration-300 ease-in-out"
                    onClick={() => toggleQuestion(q._id)}
                  >
                    <span className="font-Poppins font-medium">
                      {q.question}
                    </span>
                    <span className="ml-6 flex">
                      {activeQuestion === q._id ? (
                        <HiMinus className="h-6 w-6" />
                      ) : (
                        <HiPlus className="w-6 h-6" />
                      )}
                    </span>
                  </button>
                </dt>
                {activeQuestion === q._id && (
                  <dd className="mt-2">
                    <p className="font-mono font-medium text-gray-600 dark:text-gray-300">
                      {q.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <button
              onClick={() => router.push("/faq")}
              className="inline-flex items-center gap-2 px-3 py-2 bg-transparent dark:text-gray-200 dark:border-gray-200 text-green-700 border border-green-700 rounded-md outline-none"
            >
              View All
              <span>
                <BiRightArrowAlt className="w-6 h-6" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
