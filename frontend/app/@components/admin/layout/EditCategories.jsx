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
import Image from "next/image";

const EditCategories = () => {
  const { data, refetch } = useGetLayoutQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [categories, setCategories] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [collapsed, setCollapsed] = useState({});

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data && data.layout && data.layout.categories) {
      setCategories(data.layout.categories);
      setCollapsed(
        data.layout.categories.reduce((acc, category) => {
          acc[category._id] = true;
          return acc;
        }, {})
      );
    }
  }, [data]);

  const handleCategoryChange = (id, field, value) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === id ? { ...category, [field]: value } : category
      )
    );
  };

  const handleFileImage = (e, categoryId, imageType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategories((prevCategories) =>
          prevCategories.map((cat) => {
            if (cat._id === categoryId) {
              return {
                ...cat,
                imageUrl: {
                  ...cat.imageUrl,
                  [imageType]: reader.result,
                },
              };
            }
            return cat;
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconFile = (e, categoryId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategories((prevCategories) =>
          prevCategories.map((cat) => {
            if (cat._id === categoryId) {
              return {
                ...cat,
                icon: reader.result,
              };
            }
            return cat;
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDropImage = (e, categoryId, imageType) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategories((prevCategories) =>
          prevCategories.map((cat) => {
            if (cat._id === categoryId) {
              return {
                ...cat,
                imageUrl: {
                  ...cat.imageUrl,
                  [imageType]: reader.result,
                },
              };
            }
            return cat;
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDropIcon = (e, categoryId) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === categoryId
              ? { ...category, icon: reader.result }
              : category
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewCategory = () => {
    if (
      categories.length === 0 ||
      categories[categories.length - 1].title !== "" ||
      categories[categories.length - 1].name !== ""
    ) {
      setCategories((prevCategories) => [
        ...prevCategories,
        {
          name: "",
          title: "",
          icon: "",
          totalSchemes: 0,
          imageUrl: {
            light: "",
            dark: "",
            mobileLight: "",
            mobileDark: "",
          },
        },
      ]);
    } else {
      toast.error("Categories cannot be empty!");
    }
  };

  const handleSubmit = async () => {
    await editLayout({
      type: "Categories",
      categories: categories.map((cat) => ({
        name: cat.name,
        title: cat.title,
        color: cat.color,
        imageUrl: {
          light: cat.imageUrl.light.url
            ? cat.imageUrl.light.url
            : cat.imageUrl.light,
          dark: cat.imageUrl.dark.url
            ? cat.imageUrl.dark.url
            : cat.imageUrl.dark,
          mobileLight: cat.imageUrl.mobileLight.url
            ? cat.imageUrl.mobileLight.url
            : cat.imageUrl.mobileLight,
          mobileDark: cat.imageUrl.mobileDark.url
            ? cat.imageUrl.mobileDark.url
            : cat.imageUrl.mobileDark,
        },
        icon: cat.icon.url ? cat.icon.url : cat.icon,
        totalSchemes: cat.totalSchemes,
      })),
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      toast.success("Categories updated!");
      refetch();
    }
  }, [isSuccess, error]);

  const toggleCollapse = (categoryId) => {
    setCollapsed((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[90%] md:w-[80%] m-auto mt-[80px] p-5">
          <h1 className="block text-2xl md:text-3xl font-Poppins font-[600] pb-6 text-center">
            All Categories
          </h1>
          <div className="space-y-8">
            {[...categories]
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((category, index) => (
                <div
                  key={index}
                  className="p-5 border rounded-lg shadow-lg bg-white dark:bg-gray-800 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium">
                      {index + 1}. {category.name || ""}
                    </h2>
                    <div className="flex space-x-4 justify-end">
                      <button
                        onClick={() =>
                          setCategories((prevCategories) =>
                            prevCategories.filter(
                              (cat) => cat._id !== category._id
                            )
                          )
                        }
                        className="flex items-center space-x-2 font-medium text-red-600"
                      >
                        <AiOutlineDelete className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => toggleCollapse(category._id)}
                        className="text-gray-600 font-medium dark:text-gray-400 hover:text-gray-800"
                      >
                        {collapsed[category._id] ? (
                          <FaAngleDown />
                        ) : (
                          <FaAngleUp />
                        )}
                      </button>
                    </div>
                  </div>

                  {!collapsed[category._id] && (
                    <div className="flex flex-col space-y-4">
                      <div className="w-full flex justify-between items-center space-x-5">
                        <div className="flex flex-col items-start">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleIconFile(e, category._id)}
                            className="hidden"
                            id={`icon-upload-${category._id}`}
                          />
                          <label
                            htmlFor={`icon-upload-${category._id}`}
                            className={`min-h-40 min-w-40 rounded-lg border-2 border-dashed bg-white/5 dark:border-white/50 flex items-center justify-center ${
                              dragging
                                ? "border-indigo-600 bg-blue-300"
                                : "border-gray-300 bg-transparent"
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDropIcon(e, category._id)}
                          >
                            {category.icon.url ? (
                              <Image
                                width={1000}
                                height={1000}
                                src={category.icon.url}
                                alt="Icon"
                                className="object-cover object-center h-20 w-auto rounded-lg"
                              />
                            ) : category.icon ? (
                              <img
                                src={category.icon}
                                alt="Category"
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
                              Category Name
                            </Label>
                            <Input
                              className="mt-2 w-full rounded-lg border dark:border-white/50 bg-gray-50 py-2 px-4 text-black dark:bg-gray-900 dark:text-white"
                              type="text"
                              id="name"
                              value={category.name || ""}
                              onChange={(e) =>
                                handleCategoryChange(
                                  category._id,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="Category Name"
                              autoComplete="off"
                            />
                          </Field>

                          <Field>
                            <Label className="text-sm font-medium">
                              Category Title
                            </Label>
                            <Input
                              className="mt-2 w-full rounded-lg border dark:border-white/50 bg-gray-50 py-2 px-4 text-black dark:bg-gray-900 dark:text-white"
                              type="text"
                              id="title"
                              value={category.title || ""}
                              onChange={(e) =>
                                handleCategoryChange(
                                  category._id,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Category Title"
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
                              value={category.color || ""}
                              onChange={(e) =>
                                handleCategoryChange(
                                  category._id,
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
                                  handleFileImage(e, category._id, type)
                                }
                                className="hidden"
                                id={`image-upload-${category._id}-${type}`}
                              />
                              <label
                                htmlFor={`image-upload-${category._id}-${type}`}
                                className={`mt-2 w-full min-h-32 rounded-lg border-2 border-dashed bg-white/5 dark:border-white/50 flex items-center justify-center ${
                                  dragging
                                    ? "border-indigo-600 bg-blue-300"
                                    : "border-gray-300 bg-transparent"
                                }`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) =>
                                  handleDropImage(e, category._id, type)
                                }
                              >
                                {category.imageUrl[type].url ? (
                                  <img
                                    src={category.imageUrl[type].url}
                                    alt={`${type} Image`}
                                    className="object-cover object-center h-auto w-full rounded-lg"
                                  />
                                ) : category.imageUrl[type] ? (
                                  <img
                                    src={category.imageUrl[type]}
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
            onClick={handleNewCategory}
            className="mt-8 flex items-center space-x-2 text-blue-600"
          >
            <IoMdAddCircleOutline />
            <span>Add New Category</span>
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

export default EditCategories;
