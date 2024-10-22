import ErrorHandler from "../config/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";
import Layout from "../models/Layout.js";
import { redis } from "../config/redis.js";
import Scheme from "../models/Scheme.js";

export const createLayout = catchAsyncError(async (req, res, next) => {
  try {
    const { type } = req.body;

    const isTypeExists = await Layout.findOne({ type });
    if (isTypeExists)
      return next(new ErrorHandler(`${type} already exists`, 400));

    if (type === "Banner") {
      const { image, title, subTitle } = req.body;

      const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: "banners",
      });

      const banner = {
        type: "Banner",
        banner: {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
          title,
          subTitle,
        },
      };

      await Layout.create(banner);
    }

    if (type === "FAQ") {
      const { faqData } = req.body;
      const faqItems = faqData.map((item) => ({
        question: item.question,
        answer: item.answer,
      }));
      await Layout.create({ type: "FAQ", faq: faqItems });
    }

    if (type === "Categories") {
      const { categories } = req.body;

      const categoryItems = await Promise.all(
        categories.map(async (item) => {
          let iconData;
          if (item.icon) {
            iconData = await cloudinary.v2.uploader.upload(item.icon, {
              folder: "icons",
            });
          }

          const imageUrlData = await Promise.all(
            Object.entries(item.imageUrl).map(async ([key, value]) => {
              if (typeof value === "string" && !value.startsWith("https")) {
                const uploadResult = await cloudinary.v2.uploader.upload(
                  value,
                  {
                    folder: `category_images/${key}`,
                  }
                );
                return {
                  [key]: {
                    public_id: uploadResult.public_id,
                    url: uploadResult.secure_url,
                  },
                };
              }
              return {
                [key]: {
                  public_id: null,
                  url: value,
                },
              };
            })
          );

          const flattenedImageUrl = imageUrlData.reduce((acc, curr) => {
            return { ...acc, ...curr };
          }, {});

          return {
            name: item.name,
            color: item.color,
            imageUrl: flattenedImageUrl,
            title: item.title,
            icon: iconData
              ? { public_id: iconData.public_id, url: iconData.secure_url }
              : null,
            stateSchemes: item.stateSchemes || 0,
            centralSchemes: item.centralSchemes || 0,
            totalSchemes: item.totalSchemes || 0,
          };
        })
      );
      await Layout.create({ type: "Categories", categories: categoryItems });
    }

    if (type === "Ministries") {
      const { ministries } = req.body;

      const ministryItems = await Promise.all(
        ministries.map(async (item) => {
          let iconData;
          if (item.icon) {
            iconData = await cloudinary.v2.uploader.upload(item.icon, {
              folder: "icons",
            });
          }

          const imageUrlData = await Promise.all(
            Object.entries(item.imageUrl).map(async ([key, value]) => {
              if (typeof value === "string" && !value.startsWith("https")) {
                const uploadResult = await cloudinary.v2.uploader.upload(
                  value,
                  {
                    folder: `ministry_images/${key}`,
                  }
                );
                return {
                  [key]: {
                    public_id: uploadResult.public_id,
                    url: uploadResult.secure_url,
                  },
                };
              }
              return {
                [key]: {
                  public_id: null,
                  url: value,
                },
              };
            })
          );

          const flattenedImageUrl = imageUrlData.reduce((acc, curr) => {
            return { ...acc, ...curr };
          }, {});

          return {
            name: item.name,
            color: item.color,
            imageUrl: flattenedImageUrl,
            title: item.title,
            icon: iconData
              ? { public_id: iconData.public_id, url: iconData.secure_url }
              : null,
            stateSchemes: item.stateSchemes || 0,
            centralSchemes: item.centralSchemes || 0,
            totalSchemes: item.totalSchemes || 0,
          };
        })
      );
      await Layout.create({ type: "Ministries", ministries: ministryItems });
    }

    if (type === "States") {
      const { states } = req.body;

      const stateItems = await Promise.all(
        states.map(async (item) => {
          let iconData;
          if (item.icon) {
            iconData = await cloudinary.v2.uploader.upload(item.icon, {
              folder: "icons",
            });
          }

          const imageUrlData = await Promise.all(
            Object.entries(item.imageUrl).map(async ([key, value]) => {
              if (typeof value === "string" && !value.startsWith("https")) {
                const uploadResult = await cloudinary.v2.uploader.upload(
                  value,
                  {
                    folder: `ministry_images/${key}`,
                  }
                );
                return {
                  [key]: {
                    public_id: uploadResult.public_id,
                    url: uploadResult.secure_url,
                  },
                };
              }
              return {
                [key]: {
                  public_id: null,
                  url: value,
                },
              };
            })
          );

          const flattenedImageUrl = imageUrlData.reduce((acc, curr) => {
            return { ...acc, ...curr };
          }, {});

          return {
            name: item.name,
            color: item.color,
            imageUrl: flattenedImageUrl,
            title: item.title,
            icon: iconData
              ? { public_id: iconData.public_id, url: iconData.secure_url }
              : null,
            stateSchemes: item.stateSchemes || 0,
            centralSchemes: item.centralSchemes || 0,
            totalSchemes: item.totalSchemes || 0,
          };
        })
      );
      await Layout.create({ type: "States", states: stateItems });
    }

    res.status(200).json({
      success: true,
      message: `${type} created successfully`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const editLayout = catchAsyncError(async (req, res, next) => {
  try {
    const { type } = req.body;

    if (type === "Banner") {
      const { image, title, subTitle } = req.body;
      const bannerData = await Layout.findOne({ type: "Banner" });

      const imageUrl =
        typeof image === "string" && image.startsWith("https")
          ? bannerData.banner.image.url
          : (await cloudinary.v2.uploader.upload(image, { folder: "layouts" }))
              .secure_url;

      const banner = {
        type: "Banner",
        banner: {
          image: {
            public_id:
              typeof image === "string" && image.startsWith("https")
                ? bannerData.banner.image.public_id
                : (
                    await cloudinary.v2.uploader.upload(image, {
                      folder: "layouts",
                    })
                  ).public_id,
            url: imageUrl,
          },
          title,
          subTitle,
        },
      };
      await Layout.findByIdAndUpdate(bannerData._id, banner);
      await redis.set(type, JSON.stringify(banner));
    }

    if (type === "FAQ") {
      const { faq } = req.body;
      const faqData = await Layout.findOne({ type: "FAQ" });

      const faqItems = faq.map((item) => ({
        question: item.question,
        answer: item.answer,
      }));

      await Layout.findByIdAndUpdate(faqData._id, { faq: faqItems });
    }

    if (type === "Categories") {
      const { categories } = req.body;
      const categoryData = await Layout.findOne({ type: "Categories" });

      const existingCategoriesMap = categoryData.categories.reduce(
        (acc, item, index) => {
          acc[item.name] = index;
          return acc;
        },
        {}
      );

      const categoryItems = await Promise.all(
        categories.map(async (item) => {
          const existingIndex = existingCategoriesMap[item.name];
          const existingCategory = categoryData.categories[existingIndex] || {};

          if (item.icon && typeof item.icon === "string") {
            if (!item.icon.startsWith("https")) {
              if (existingCategory.icon?.public_id) {
                await cloudinary.v2.uploader.destroy(
                  existingCategory.icon.public_id
                );
              }

              const myCloud = await cloudinary.v2.uploader.upload(item.icon, {
                folder: "icons",
              });
              item.icon = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
              };
            } else {
              item.icon = {
                public_id: existingCategory.icon?.public_id,
                url: existingCategory.icon?.url,
              };
            }
          }

          const imageFields = ["light", "dark", "mobileLight", "mobileDark"];

          for (const field of imageFields) {
            if (item.imageUrl && item.imageUrl[field]) {
              if (typeof item.imageUrl[field] === "string") {
                if (!item.imageUrl[field].startsWith("https")) {
                  if (existingCategory.imageUrl?.[field]?.public_id) {
                    await cloudinary.v2.uploader.destroy(
                      existingCategory.imageUrl[field].public_id
                    );
                  }

                  const imageUpload = await cloudinary.v2.uploader.upload(
                    item.imageUrl[field],
                    {
                      folder: "category_images",
                    }
                  );
                  item.imageUrl[field] = {
                    public_id: imageUpload.public_id,
                    url: imageUpload.secure_url,
                  };
                } else {
                  item.imageUrl[field] = {
                    public_id: existingCategory.imageUrl?.[field]?.public_id,
                    url: existingCategory.imageUrl?.[field]?.url,
                  };
                }
              }
            }
          }

          item.totalSchemes = await Scheme.countDocuments({
            "basicDetails.schemeCategory": { $in: [item.name] },
          });

          return {
            name: item.name,
            title: item.title,
            color: item.color,
            imageUrl: {
              light: {
                public_id: item.imageUrl.light.public_id,
                url: item.imageUrl.light.url,
              },
              dark: {
                public_id: item.imageUrl.dark.public_id,
                url: item.imageUrl.dark.url,
              },
              mobileLight: {
                public_id: item.imageUrl.mobileLight.public_id,
                url: item.imageUrl.mobileLight.url,
              },
              mobileDark: {
                public_id: item.imageUrl.mobileDark.public_id,
                url: item.imageUrl.mobileDark.url,
              },
            },
            icon: { public_id: item.icon.public_id, url: item.icon.url },
            stateSchemes: item.stateSchemes || 0,
            centralSchemes: item.centralSchemes || 0,
            totalSchemes: item.totalSchemes || 0,
          };
        })
      );

      console.log(categoryItems);

      await Layout.findByIdAndUpdate(categoryData._id, {
        categories: categoryItems,
      });
    }

    if (type === "Ministries") {
      const { ministries } = req.body;

      const ministryData = await Layout.findOne({ type: "Ministries" });
      const existingCategoriesMap = ministryData.ministries.reduce(
        (acc, item, index) => {
          acc[item.name] = index;
          return acc;
        },
        {}
      );

      const ministryItems = await Promise.all(
        ministries.map(async (item) => {
          const existingIndex = existingCategoriesMap[item.name];
          const existingCategory = ministryData.ministries[existingIndex] || {};

          if (item.icon && typeof item.icon === "string") {
            if (!item.icon.startsWith("https")) {
              if (existingCategory.icon?.public_id) {
                await cloudinary.v2.uploader.destroy(
                  existingCategory.icon.public_id
                );
              }

              const myCloud = await cloudinary.v2.uploader.upload(item.icon, {
                folder: "icons",
              });
              item.icon = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
              };
            } else {
              item.icon = {
                public_id: existingCategory.icon?.public_id,
                url: existingCategory.icon?.url,
              };
            }
          }

          const imageFields = ["light", "dark", "mobileLight", "mobileDark"];

          for (const field of imageFields) {
            if (item.imageUrl && item.imageUrl[field]) {
              if (typeof item.imageUrl[field] === "string") {
                if (!item.imageUrl[field].startsWith("https")) {
                  if (existingCategory.imageUrl?.[field]?.public_id) {
                    await cloudinary.v2.uploader.destroy(
                      existingCategory.imageUrl[field].public_id
                    );
                  }

                  const imageUpload = await cloudinary.v2.uploader.upload(
                    item.imageUrl[field],
                    {
                      folder: "category_images",
                    }
                  );
                  item.imageUrl[field] = {
                    public_id: imageUpload.public_id,
                    url: imageUpload.secure_url,
                  };
                } else {
                  item.imageUrl[field] = {
                    public_id: existingCategory.imageUrl?.[field]?.public_id,
                    url: existingCategory.imageUrl?.[field]?.url,
                  };
                }
              }
            }
          }

          item.totalSchemes = await Scheme.countDocuments({
            "basicDetails.ministryName": { $in: item.name },
          });

          return {
            name: item.name,
            color: item.color,
            title: item.title,
            imageUrl: {
              light: {
                public_id: item.imageUrl.light.public_id,
                url: item.imageUrl.light.url,
              },
              dark: {
                public_id: item.imageUrl.dark.public_id,
                url: item.imageUrl.dark.url,
              },
              mobileLight: {
                public_id: item.imageUrl.mobileLight.public_id,
                url: item.imageUrl.mobileLight.url,
              },
              mobileDark: {
                public_id: item.imageUrl.mobileDark.public_id,
                url: item.imageUrl.mobileDark.url,
              },
            },
            icon: { public_id: item.icon.public_id, url: item.icon.url },
            stateSchemes: item.stateSchemes || 0,
            centralSchemes: item.centralSchemes || 0,
            totalSchemes: item.totalSchemes || 0,
          };
        })
      );
      await Layout.findByIdAndUpdate(ministryData._id, {
        ministries: ministryItems,
      });
    }

    if (type === "States") {
      const { states } = req.body;
      const stateData = await Layout.findOne({ type: "States" });

      const existingStatesMap = stateData.states.reduce((acc, item, index) => {
        acc[item.name] = index;
        return acc;
      }, {});

      const stateItems = await Promise.all(
        states.map(async (item) => {
          const existingIndex = existingStatesMap[item.name];
          const existingState = stateData.states[existingIndex] || {};

          if (item.icon && typeof item.icon === "string") {
            if (!item.icon.startsWith("https")) {
              if (existingState.icon?.public_id) {
                await cloudinary.v2.uploader.destroy(
                  existingState.icon.public_id
                );
              }

              const myCloud = await cloudinary.v2.uploader.upload(item.icon, {
                folder: "icons",
              });
              item.icon = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
              };
            } else {
              item.icon = {
                public_id: existingState.icon?.public_id,
                url: existingState.icon?.url,
              };
            }
          }

          const imageFields = ["light", "dark", "mobileLight", "mobileDark"];

          for (const field of imageFields) {
            if (item.imageUrl && item.imageUrl[field]) {
              if (typeof item.imageUrl[field] === "string") {
                if (!item.imageUrl[field].startsWith("https")) {
                  if (existingState.imageUrl?.[field]?.public_id) {
                    await cloudinary.v2.uploader.destroy(
                      existingState.imageUrl[field].public_id
                    );
                  }

                  const imageUpload = await cloudinary.v2.uploader.upload(
                    item.imageUrl[field],
                    {
                      folder: "category_images",
                    }
                  );
                  item.imageUrl[field] = {
                    public_id: imageUpload.public_id,
                    url: imageUpload.secure_url,
                  };
                } else {
                  item.imageUrl[field] = {
                    public_id: existingState.imageUrl?.[field]?.public_id,
                    url: existingState.imageUrl?.[field]?.url,
                  };
                }
              }
            }
          }

          item.stateSchemes = await Scheme.countDocuments({
            "basicDetails.level": "State",
            "basicDetails.state": { $in: [item.name] },
          });

          item.centralSchemes = await Scheme.countDocuments({
            "basicDetails.level": "Central",
            "basicDetails.state": { $in: [item.name] },
          });

          item.totalSchemes = await Scheme.countDocuments({
            "basicDetails.state": { $in: [item.name] },
          });

          return {
            name: item.name,
            title: item.title,
            color: item.color,
            imageUrl: {
              light: {
                public_id: item.imageUrl.light.public_id,
                url: item.imageUrl.light.url,
              },
              dark: {
                public_id: item.imageUrl.dark.public_id,
                url: item.imageUrl.dark.url,
              },
              mobileLight: {
                public_id: item.imageUrl.mobileLight.public_id,
                url: item.imageUrl.mobileLight.url,
              },
              mobileDark: {
                public_id: item.imageUrl.mobileDark.public_id,
                url: item.imageUrl.mobileDark.url,
              },
            },
            icon: { public_id: item.icon.public_id, url: item.icon.url },
            stateSchemes: item.stateSchemes || 0,
            centralSchemes: item.centralSchemes || 0,
            totalSchemes: item.totalSchemes || 0,
          };
        })
      );

      await Layout.findByIdAndUpdate(stateData._id, {
        states: stateItems,
      });
    }

    res.status(200).json({
      success: true,
      message: `${type} updated successfully`,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getLayoutByType = catchAsyncError(async (req, res, next) => {
  try {
    const { type } = req.params;

    const layout = await Layout.findOne({ type });

    if (type === "States") {
      const updatedCategories = await Promise.all(
        layout.states.map(async (state) => {
          const stateSchemes = await Scheme.countDocuments({
            "basicDetails.level": "State",
            "basicDetails.state": { $in: [state.name] },
          });

          const centralSchemes = await Scheme.countDocuments({
            "basicDetails.level": "Central",
            "basicDetails.state": { $in: [state.name] },
          });

          const totalSchemes = await Scheme.countDocuments({
            "basicDetails.state": { $in: [state.name] },
          });

          return { ...state, stateSchemes, centralSchemes, totalSchemes };
        })
      );

      layout.states = updatedCategories;
      await layout.save();
    } else if (type === "Ministries") {
      const updatedCategories = await Promise.all(
        layout.ministries.map(async (ministry) => {
          const totalSchemes = await Scheme.countDocuments({
            "basicDetails.ministryName": { $in: ministry.name },
          });

          return { ...ministry, totalSchemes };
        })
      );

      layout.ministries = updatedCategories;
      await layout.save();
    } else if (type === "Categories") {
      const updatedCategories = await Promise.all(
        layout.categories.map(async (category) => {
          const totalSchemes = await Scheme.countDocuments({
            "basicDetails.schemeCategory": { $in: [category.name] },
          });

          return { ...category, totalSchemes };
        })
      );

      layout.categories = updatedCategories;
      await layout.save();
    }

    res.status(200).json({
      success: true,
      layout,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
