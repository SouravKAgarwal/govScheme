import { generateLast12MonthData } from "../utils/analytics.js";
import User from "../models/User.js";
import Scheme from "../models/Scheme.js";
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../config/errorHandler.js";

export const getUserAnalytics = catchAsyncError(async (req, res, next) => {
  try {
    const users = await generateLast12MonthData(User);

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getTotalSchemes = catchAsyncError(async (req, res, next) => {
  try {
    const totalSchemes = await Scheme.countDocuments();

    const totalCentralSchemes = await Scheme.countDocuments({
      "basicDetails.level": "Central",
    });
    const totalStateSchemes = await Scheme.countDocuments({
      "basicDetails.level": "State",
    });

    res.status(200).json({
      success: true,
      totalCentralSchemes,
      totalStateSchemes,
      totalSchemes,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getSchemeCounts = catchAsyncError(async (req, res, next) => {
  try {
    const { state, ministryName } = req.body;

    let totalStateSchemes = 0;
    let totalCentralSchemes = 0;
    let totalMinistrySchemes = 0;

    if (state) {
      totalStateSchemes = await Scheme.countDocuments({
        "basicDetails.state": state,
        "basicDetails.level": "State",
      });
    }

    if (state) {
      totalCentralSchemes = await Scheme.countDocuments({
        "basicDetails.level": "Central",
        "basicDetails.state": state,
      });
    }

    if (ministryName) {
      totalMinistrySchemes = await Scheme.countDocuments({
        "basicDetails.ministryName": ministryName,
      });
    }

    res.status(200).json({
      success: true,
      totalCentralSchemes,
      totalStateSchemes,
      totalMinistrySchemes,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
