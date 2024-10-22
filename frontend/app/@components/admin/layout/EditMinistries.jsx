import { useEffect, useState } from "react";
import {
  useEditLayoutMutation,
  useGetLayoutQuery,
} from "../../../../redux/features/layout/layoutApi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "sonner";
import { Field, Input, Label } from "@headlessui/react";
import Loading from "../../Loading";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

const EditMinistries = () => {
  const { data, refetch } = useGetLayoutQuery("Ministries", {
    refetchOnMountOrArgChange: true,
  });

  const [ministries, setMinistries] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [collapsed, setCollapsed] = useState({});

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data && data.layout && data.layout.ministries) {
      setMinistries(data.layout.ministries);
      setCollapsed(
        data.layout.ministries.reduce((acc, ministry) => {
          acc[ministry._id] = true;
          return acc;
        }, {})
      );
    }
  }, [data]);

  const handleMinistryChange = (id, field, value) => {
    setMinistries((prevMinistries) =>
      prevMinistries.map((ministry) =>
        ministry._id === id ? { ...ministry, [field]: value } : ministry
      )
    );
  };

  const handleFileImage = (e, ministryId, imageType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMinistries((prevMinistries) =>
          prevMinistries.map((ministry) => {
            if (ministry._id === ministryId) {
              return {
                ...ministry,
                imageUrl: {
                  ...ministry.imageUrl,
                  [imageType]: reader.result,
                },
              };
            }
            return ministry;
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDropImage = (e, ministryId, imageType) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setMinistries((prevMinistries) =>
          prevMinistries.map((ministry) => {
            if (ministry._id === ministryId) {
              return {
                ...ministry,
                imageUrl: {
                  ...ministry.imageUrl,
                  [imageType]: reader.result,
                },
              };
            }
            return ministry;
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconFile = (e, ministryId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMinistries((prevMinistries) =>
          prevMinistries.map((ministry) => {
            if (ministry._id === ministryId) {
              return {
                ...ministry,
                icon: reader.result,
              };
            }
            return ministry;
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewMinistry = () => {
    if (
      ministries.length === 0 ||
      ministries[ministries.length - 1].title !== "" ||
      ministries[ministries.length - 1].name !== ""
    ) {
      setMinistries((prevMinistries) => [
        ...prevMinistries,
        {
          name: "",
          title: "",
          color: "",
          icon: "",
          imageUrl: {
            light: "",
            dark: "",
            mobileLight: "",
            mobileDark: "",
          },
        },
      ]);
    } else {
      toast.error("Ministries cannot be empty!");
    }
  };

  const handleSubmit = async () => {
    await editLayout({
      type: "Ministries",
      ministries: ministries.map((ministry) => ({
        name: ministry.name,
        title: ministry.title,
        color: ministry.color,
        imageUrl: {
          light: ministry.imageUrl.light.url
            ? ministry.imageUrl.light.url
            : ministry.imageUrl.light,
          dark: ministry.imageUrl.dark.url
            ? ministry.imageUrl.dark.url
            : ministry.imageUrl.dark,
          mobileLight: ministry.imageUrl.mobileLight.url
            ? ministry.imageUrl.mobileLight.url
            : ministry.imageUrl.mobileLight,
          mobileDark: ministry.imageUrl.mobileDark.url
            ? ministry.imageUrl.mobileDark.url
            : ministry.imageUrl.mobileDark,
        },
        icon: ministry.icon.url ? ministry.icon.url : ministry.icon,
      })),
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDropIcon = (e, ministryId) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setMinistries((prevMinistries) =>
          prevMinistries.map((ministry) =>
            ministry._id === ministryId
              ? { ...ministry, icon: reader.result }
              : ministry
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      toast.success("Ministries updated!");
      refetch();
    }
  }, [isSuccess, error]);

  const toggleCollapse = (ministryId) => {
    setCollapsed((prev) => ({
      ...prev,
      [ministryId]: !prev[ministryId],
    }));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[90%] md:w-[80%] m-auto mt-[80px]">
          <h1 className="block text-2xl md:text-3xl font-Poppins font-[600] pb-6 text-center">
            All Ministries
          </h1>
          <div className="space-y-8">
            {ministries?.map((ministry, index) => (
              <div
                key={ministry._id}
                className="p-5 border rounded-lg shadow-lg bg-white dark:bg-gray-800 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">
                    {index + 1}. {ministry.name || ""}
                  </h2>
                  <div className="flex space-x-4 justify-end">
                    <button
                      onClick={() =>
                        setMinistries((prevMinistries) =>
                          prevMinistries.filter(
                            (min) => min._id !== ministry._id
                          )
                        )
                      }
                      className="flex items-center space-x-2 font-medium text-red-600"
                    >
                      <AiOutlineDelete className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => toggleCollapse(ministry._id)}
                      className="text-gray-600 font-medium dark:text-gray-400 hover:text-gray-800"
                    >
                      {collapsed[ministry._id] ? (
                        <FaAngleDown />
                      ) : (
                        <FaAngleUp />
                      )}
                    </button>
                  </div>
                </div>

                {!collapsed[ministry._id] && (
                  <div className="flex flex-col space-y-4">
                    <div className="w-full flex justify-between items-center space-x-5">
                      <div className="flex flex-col items-start">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleIconFile(e, ministry._id)}
                          className="hidden"
                          id={`icon-upload-${ministry._id}`}
                        />
                        <label
                          htmlFor={`icon-upload-${ministry._id}`}
                          className={`min-h-40 min-w-40 rounded-lg border-2 border-dashed bg-white/5 dark:border-white/50 flex items-center justify-center ${
                            dragging
                              ? "border-indigo-600 bg-blue-300"
                              : "border-gray-300 bg-transparent"
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDropIcon(e, ministry._id)}
                        >
                          {ministry.icon.url ? (
                            <img
                              src={ministry.icon.url}
                              alt="Ministry"
                              className="object-cover h-20 w-auto rounded-lg"
                            />
                          ) : ministry.icon ? (
                            <img
                              src={ministry.icon}
                              alt="Ministry"
                              className="object-cover h-20 w-auto rounded-lg"
                            />
                          ) : (
                            <IoMdAddCircleOutline className="text-gray-400 text-3xl cursor-pointer" />
                          )}
                        </label>
                      </div>
                      <div className="w-full flex flex-col space-y-2">
                        <Field>
                          <Label className="text-sm font-medium text-black dark:text-white">
                            Ministry Name
                          </Label>
                          <Input
                            className="mt-2 w-full rounded-lg border dark:border-white/50 bg-gray-50 py-2 px-4 text-black dark:bg-gray-900 dark:text-white"
                            type="text"
                            id="name"
                            value={ministry.name || ""}
                            onChange={(e) =>
                              handleMinistryChange(
                                ministry._id,
                                "name",
                                e.target.value
                              )
                            }
                            placeholder="Ministry Name"
                            autoComplete="off"
                          />
                        </Field>

                        <Field>
                          <Label className="text-sm font-medium">
                            Ministry Title
                          </Label>
                          <Input
                            className="mt-2 w-full rounded-lg border dark:border-white/50 bg-gray-50 py-2 px-4 text-black dark:bg-gray-900 dark:text-white"
                            type="text"
                            id="title"
                            value={ministry.title || ""}
                            onChange={(e) =>
                              handleMinistryChange(
                                ministry._id,
                                "title",
                                e.target.value
                              )
                            }
                            placeholder="Ministry Title"
                            autoComplete="off"
                          />
                        </Field>
                        <Field>
                          <Label className="text-sm font-medium text-black dark:text-white">
                            Color
                          </Label>
                          <Input
                            className="mt-2 w-full rounded-lg border dark:border-white/50 bg-gray-50 py-2 px-4 text-black dark:bg-gray-900 dark:text-white"
                            type="text"
                            id="color"
                            value={ministry.color || ""}
                            onChange={(e) =>
                              handleMinistryChange(
                                ministry._id,
                                "color",
                                e.target.value
                              )
                            }
                            placeholder="Color"
                            autoComplete="off"
                          />
                        </Field>
                      </div>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                      {["light", "dark", "mobileLight", "mobileDark"].map(
                        (type) => (
                          <div key={type} className="w-full flex flex-col">
                            <h3 className="font-medium text-sm">
                              {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                              Image
                            </h3>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileImage(e, ministry._id, type)
                              }
                              className="hidden"
                              id={`image-upload-${ministry._id}-${type}`}
                            />
                            <label
                              htmlFor={`image-upload-${ministry._id}-${type}`}
                              className={`mt-2 w-full min-h-32 rounded-lg border-2 border-dashed bg-white/5 dark:border-white/50 flex items-center justify-center ${
                                dragging
                                  ? "border-indigo-600 bg-blue-300"
                                  : "border-gray-300 bg-transparent"
                              }`}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={(e) =>
                                handleDropImage(e, ministry._id, type)
                              }
                            >
                              {ministry.imageUrl[type].url ? (
                                <img
                                  src={ministry.imageUrl[type].url}
                                  alt={`${type} Image`}
                                  className="object-cover object-center h-auto w-full rounded-lg"
                                />
                              ) : ministry.imageUrl[type] ? (
                                <img
                                  src={ministry.imageUrl[type]}
                                  alt={`${type} Image`}
                                  className="object-cover object-center h-auto w-full rounded-lg"
                                />
                              ) : (
                                <IoMdAddCircleOutline className="text-gray-400 text-3xl cursor-pointer" />
                              )}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleNewMinistry}
            className="mt-8 flex items-center space-x-2 text-blue-600"
          >
            <IoMdAddCircleOutline />
            <span>Add New Ministry</span>
          </button>
          <div className="w-full flex items-center justify-end mb-10">
            <button
              type="submit"
              className="w-full md:w-[150px] mt-5 py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-[#37a39a] focus:outline-none"
              onClick={() => handleSubmit()}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditMinistries;
