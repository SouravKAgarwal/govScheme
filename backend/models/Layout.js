import mongoose from "mongoose";

const bannerImageSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  url: { type: String, required: true },
});

const faqSchema = new mongoose.Schema({
  question: { type: String },
  answer: { type: String },
});

const imageSchema = new mongoose.Schema({
  light: bannerImageSchema,
  dark: bannerImageSchema,
  mobileLight: bannerImageSchema,
  mobileDark: bannerImageSchema,
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: imageSchema,
  title: { type: String, required: true },
  color: { type: String, required: true },
  icon: bannerImageSchema,
  stateSchemes: { type: Number, default: 0 },
  centralSchemes: { type: Number, default: 0 },
  totalSchemes: { type: Number, default: 0 },
});

const ministrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: imageSchema,
  color: { type: String, required: true },
  title: { type: String, required: true },
  icon: bannerImageSchema,
  stateSchemes: { type: Number, default: 0 },
  centralSchemes: { type: Number, default: 0 },
  totalSchemes: { type: Number, default: 0 },
});

const stateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: imageSchema,
  title: { type: String, required: true },
  icon: bannerImageSchema,
  color: { type: String, required: true },
  stateSchemes: { type: Number, default: 0 },
  centralSchemes: { type: Number, default: 0 },
  totalSchemes: { type: Number, default: 0 },
});

const layoutSchema = new mongoose.Schema({
  type: { type: String },
  faq: [faqSchema],
  categories: [categorySchema],
  ministries: [ministrySchema],
  states: [stateSchema],
  banner: {
    image: bannerImageSchema,
    title: { type: String },
    subTitle: { type: String },
  },
});

const Layout = mongoose.model("Layout", layoutSchema);

export default Layout;
