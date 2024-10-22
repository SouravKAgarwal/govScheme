import Scheme from "../models/Scheme.js";
import ErrorHandler from "../config/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import cloudinary from "cloudinary";

export const createScheme = catchAsyncError(async (req, res, next) => {
  const {
    basicDetails,
    schemeContent,
    applicationProcess,
    eligibilityDescription,
    faqs,
    documents_required,
    slug,
  } = req.body;

  try {
    let schemeImageUrl = "";
    if (basicDetails?.schemeImageUrl) {
      const result = await cloudinary.v2.uploader.upload(
        basicDetails.schemeImageUrl,
        { folder: "schemes" }
      );
      schemeImageUrl = result.secure_url;
    }

    const scheme = await Scheme.create({
      basicDetails: { ...basicDetails, schemeImageUrl },
      schemeContent,
      applicationProcess,
      eligibilityDescription,
      faqs,
      documents_required,
      slug,
    });

    res.status(201).json({ success: true, scheme });
  } catch (err) {
    return next(new ErrorHandler(err.message, 500));
  }
});

export const getSchemes = catchAsyncError(async (req, res, next) => {
  const schemes = await Scheme.find();
  res.status(200).json({ success: true, schemes });
});

export const getSingleScheme = catchAsyncError(async (req, res, next) => {
  const { slug } = req.params;

  const scheme = await Scheme.findOne({ slug });

  scheme.popularity += 1;
  await scheme.save();

  if (!scheme) {
    return next(new ErrorHandler("Scheme not found", 404));
  }

  res.status(200).json({ success: true, scheme });
});

export const updateScheme = catchAsyncError(async (req, res, next) => {
  const {
    basicDetails,
    schemeContent,
    applicationProcess,
    eligibilityDescription,
    faqs,
    documents_required,
    slug,
  } = req.body;

  const { id } = req.params;

  let scheme = await Scheme.findById(id);
  if (!scheme) {
    return next(new ErrorHandler("Scheme not found", 404));
  }

  if (
    basicDetails?.schemeImageUrl &&
    basicDetails.schemeImageUrl !== scheme.basicDetails.schemeImageUrl
  ) {
    if (scheme.basicDetails.schemeImageUrl) {
      const publicId = scheme.basicDetails.schemeImageUrl
        .split("/")
        .pop()
        .split(".")[0];
      await cloudinary.v2.uploader.destroy(publicId);
    }

    const result = await cloudinary.v2.uploader.upload(
      basicDetails.schemeImageUrl,
      {
        folder: "schemes",
      }
    );
    basicDetails.schemeImageUrl = result.secure_url;
  }

  scheme.basicDetails = { ...scheme.basicDetails, ...basicDetails };
  scheme.schemeContent = { ...scheme.schemeContent, ...schemeContent };
  scheme.applicationProcess = applicationProcess || scheme.applicationProcess;
  scheme.eligibilityDescription =
    eligibilityDescription || scheme.eligibilityDescription;
  scheme.faqs = faqs || scheme.faqs;
  scheme.documents_required = documents_required || scheme.documents_required;
  scheme.slug = slug || scheme.slug;

  await scheme.save();

  res.status(200).json({ success: true, scheme });
});

export const deleteScheme = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const scheme = await Scheme.findById(id);
  if (!scheme) {
    return next(new ErrorHandler("Scheme not found", 404));
  }

  if (scheme.basicDetails.schemeImageUrl) {
    const publicId = scheme.basicDetails.schemeImageUrl
      .split("/")
      .pop()
      .split(".")[0];
    await cloudinary.v2.uploader.destroy(publicId);
  }

  await Scheme.findByIdAndDelete(id);

  res
    .status(200)
    .json({ success: true, message: "Scheme deleted successfully" });
});

export const getSchemesByEligibility = catchAsyncError(
  async (req, res, next) => {
    const userCriteria = req.user.criteria;

    const eligibleSchemes = await Scheme.find({
      "eligibilityDescription.text": { $regex: new RegExp(userCriteria, "i") },
    }).select(
      "basicDetails.schemeName basicDetails.schemeShortTitle basicDetails.level basicDetails.schemeCategory basicDetails.state"
    );

    res.status(200).json({ success: true, eligibleSchemes });
  }
);

export const getTopPopularSchemes = catchAsyncError(async (req, res, next) => {
  try {
    const schemes = await Scheme.find({}).sort({ popularity: -1 }).limit(5);

    if (!schemes || schemes.length === 0) {
      return next(
        new ErrorHandler("No schemes found for the specified criteria.", 404)
      );
    }

    for (const scheme of schemes) {
      if (scheme.popularity === null || scheme.popularity === undefined) {
        return next(
          new ErrorHandler("Scheme found but has no popularity value.", 500)
        );
      }
    }

    res.status(200).json({ success: true, schemes });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
