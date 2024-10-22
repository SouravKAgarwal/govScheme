import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReferenceSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

const FAQSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const ApplicationModeSchema = new Schema({
  type: { type: String, required: true },
  instructions: [
    {
      text: { type: String, required: true },
    },
  ],
});

const SchemeContentSchema = new Schema({
  references: [ReferenceSchema],
  detailedDescription: { type: String, required: true },
  benefits: { type: String, required: true },
  exclusions: [{ type: String }],
});

const BasicDetailsSchema = new Schema({
  ministryName: { type: String, required: true },
  tags: [{ type: String }],
  schemeImageUrl: { type: String, default: "" },
  schemeName: { type: String, required: true },
  schemeShortTitle: { type: String, required: true },
  briefDescription: { type: String, required: true },
  level: { type: String, required: true },
  schemeCategory: [{ type: String, required: true }],
  state: [{ type: String, required: true }],
});

const SchemeSchema = new Schema(
  {
    basicDetails: BasicDetailsSchema,
    schemeContent: SchemeContentSchema,
    applicationProcess: [ApplicationModeSchema],
    eligibilityDescription: [{ type: String, required: true }],
    faqs: [FAQSchema],
    documents_required: [{ type: String, required: true }],
    slug: { type: String, required: true },
    popularity: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Scheme = mongoose.model("Scheme", SchemeSchema);

export default Scheme;
