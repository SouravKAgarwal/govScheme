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

const EditStates = () => {
  const { data, refetch } = useGetLayoutQuery("States", {
    refetchOnMountOrArgChange: true,
  });

  const [states, setStates] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [collapsed, setCollapsed] = useState({});

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data && data.layout && data.layout.states) {
      setStates(data.layout.states);
      setCollapsed(
        data.layout.states.reduce((acc, state) => {
          acc[state._id] = true;
          return acc;
        }, {})
      );
    }
  }, [data]);

  const handleStateChange = (id, field, value) => {
    setStates((prevStates) =>
      prevStates.map((state) =>
        state._id === id ? { ...state, [field]: value } : state
      )
    );
  };

  const handleFileImage = (e, stateId, imageType) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStates((prevStates) =>
          prevStates.map((state) => {
            if (state._id === stateId) {
              return {
                ...state,
                imageUrl: {
                  ...state.imageUrl,
                  [imageType]: reader.result,
                },
              };
            }
            return state;
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

  const handleDropImage = (e, stateId, imageType) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setStates((prevStates) =>
          prevStates.map((state) => {
            if (state._id === stateId) {
              return {
                ...state,
                imageUrl: {
                  ...state.imageUrl,
                  [imageType]: reader.result,
                },
              };
            }
            return state;
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIconFile = (e, stateId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStates((prevStates) =>
          prevStates.map((state) => {
            if (state._id === stateId) {
              return {
                ...state,
                icon: reader.result,
              };
            }
            return state;
          })
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDropIcon = (e, stateId) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setStates((prevStates) =>
          prevStates.map((state) =>
            state._id === stateId ? { ...state, icon: reader.result } : state
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewState = () => {
    if (
      states.length === 0 ||
      states[states.length - 1].title !== "" ||
      states[states.length - 1].name !== ""
    ) {
      const newState = {
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
      };
      setStates((prevStates) => [...prevStates, newState]);
      setCollapsed((prevCollapsed) => {
        const newCollapsedState = Object.keys(prevCollapsed).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        );
        newCollapsedState[newState._id] = false;
        return newCollapsedState;
      });
    } else {
      toast.error("States cannot be empty!");
    }
  };

  const handleSubmit = async () => {
    await editLayout({
      type: "States",
      states: states.map((state) => ({
        name: state.name,
        title: state.title,
        color: state.color,
        icon: state.icon.url ? state.icon.url : state.icon,
        imageUrl: {
          light: state.imageUrl.light.url
            ? state.imageUrl.light.url
            : state.imageUrl.light,
          dark: state.imageUrl.dark.url
            ? state.imageUrl.dark.url
            : state.imageUrl.dark,
          mobileLight: state.imageUrl.mobileLight.url
            ? state.imageUrl.mobileLight.url
            : state.imageUrl.mobileLight,
          mobileDark: state.imageUrl.mobileDark.url
            ? state.imageUrl.mobileDark.url
            : state.imageUrl.mobileDark,
        },
      })),
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error.data.message);
    }

    if (isSuccess) {
      toast.success("States updated!");
      refetch();
    }
  }, [isSuccess, error]);

  const toggleCollapse = (stateId) => {
    setCollapsed((prev) => ({
      ...prev,
      [stateId]: !prev[stateId],
    }));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-[100%] md:w-[80%] m-auto mt-[80px] p-5">
          <h1 className="block text-2xl md:text-3xl font-Poppins font-[600] pb-6 text-center">
            All States
          </h1>
          <div className="space-y-8">
            {states?.map((state, index) => (
              <div
                key={state._id}
                className="p-5 border rounded-lg shadow-lg bg-white dark:bg-gray-800 space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">
                    {index + 1}. {state.name || ""}
                  </h2>
                  <div className="flex space-x-4 justify-end">
                    <button
                      onClick={() =>
                        setStates((prevStates) =>
                          prevStates.filter((st) => st._id !== state._id)
                        )
                      }
                      className="flex items-center space-x-2 font-medium text-red-600"
                    >
                      <AiOutlineDelete className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => toggleCollapse(state._id)}
                      className="text-gray-600 font-medium dark:text-gray-400 hover:text-gray-800"
                    >
                      {collapsed[state._id] ? <FaAngleDown /> : <FaAngleUp />}
                    </button>
                  </div>
                </div>

                {!collapsed[state._id] && (
                  <div className="flex flex-col space-y-4">
                    <div className="w-full flex justify-between items-center space-x-5">
                      <div className="flex flex-col items-start">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleIconFile(e, state._id)}
                          className="hidden"
                          id={`icon-upload-${state._id}`}
                        />
                        <label
                          htmlFor={`icon-upload-${state._id}`}
                          className={`min-h-40 min-w-40 rounded-lg border-2 border-dashed bg-white/5 dark:border-white/50 flex items-center justify-center ${
                            dragging
                              ? "border-indigo-600 bg-blue-300"
                              : "border-gray-300 bg-transparent"
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDropIcon(e, state._id)}
                        >
                          {state.icon.url ? (
                            <img
                              src={state.icon.url}
                              alt="State Icon"
                              className="object-cover h-20 w-auto rounded-lg"
                            />
                          ) : state.icon ? (
                            <img
                              src={state.icon}
                              alt="State Icon"
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
                            State Name
                          </Label>
                          <Input
                            className="mt-2 w-full rounded-lg border dark:border-white/50 bg-gray-50 py-2 px-4 text-black dark:bg-gray-900 dark:text-white"
                            type="text"
                            id="name"
                            value={state.name || ""}
                            onChange={(e) =>
                              handleStateChange(
                                state._id,
                                "name",
                                e.target.value
                              )
                            }
                            placeholder="State Name"
                            autoComplete="off"
                          />
                        </Field>

                        <Field>
                          <Label className="text-sm font-medium">
                            State Title
                          </Label>
                          <Input
                            className="mt-2 w-full rounded-lg border dark:border-white/50 bg-gray-50 py-2 px-4 text-black dark:bg-gray-900 dark:text-white"
                            type="text"
                            id="title"
                            value={state.title || ""}
                            onChange={(e) =>
                              handleStateChange(
                                state._id,
                                "title",
                                e.target.value
                              )
                            }
                            placeholder="State Title"
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
                            value={state.color || ""}
                            onChange={(e) =>
                              handleStateChange(
                                state._id,
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
                                handleFileImage(e, state._id, type)
                              }
                              className="hidden"
                              id={`${type}-upload-${state._id}`}
                            />
                            <label
                              htmlFor={`${type}-upload-${state._id}`}
                              className={`mt-2 min-h-32 min-w-40 rounded-lg border-2 border-dashed bg-white/5 dark:border-white/50 flex items-center justify-center ${
                                dragging
                                  ? "border-indigo-600 bg-blue-300"
                                  : "border-gray-300 bg-transparent"
                              }`}
                              onDragOver={handleDragOver}
                              onDragLeave={handleDragLeave}
                              onDrop={(e) =>
                                handleDropImage(e, state._id, type)
                              }
                            >
                              {state.imageUrl[type].url ? (
                                <img
                                  src={state.imageUrl[type].url}
                                  alt="State Image"
                                  className="object-cover rounded-lg"
                                />
                              ) : state.imageUrl[type] ? (
                                <img
                                  src={state.imageUrl[type]}
                                  alt={`${type} Image`}
                                  className="object-cover rounded-lg"
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
            <button
              onClick={handleNewState}
              className="mt-8 flex items-center space-x-2 text-blue-600"
            >
              <IoMdAddCircleOutline />
              <span>Add New State</span>
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
        </div>
      )}
    </>
  );
};

export default EditStates;
