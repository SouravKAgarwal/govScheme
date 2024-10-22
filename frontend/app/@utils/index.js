import nlp from "compromise";

export const statesData = [
  { name: "Andaman and Nicobar", stateCount: "18", centralCount: "468" },
  { name: "Andhra Pradesh", stateCount: "54", centralCount: "469" },
  { name: "Arunachal Pradesh", stateCount: "35", centralCount: "472" },
  { name: "Assam", stateCount: "49", centralCount: "472" },
  { name: "Bihar", stateCount: "54", centralCount: "468" },
  { name: "Chandigarh", stateCount: "20", centralCount: "468" },
  { name: "Chhattisgarh", stateCount: "80", centralCount: "469" },
  { name: "Delhi", stateCount: "35", centralCount: "469" },
  { name: "Goa", stateCount: "117", centralCount: "469" },
  { name: "Gujarat", stateCount: "118", centralCount: "470" },
  { name: "Haryana", stateCount: "157", centralCount: "468" },
  { name: "Himachal Pradesh", stateCount: "55", centralCount: "468" },
  { name: "Jammu and Kashmir", stateCount: "55", centralCount: "468" },
  { name: "Jharkhand", stateCount: "50", centralCount: "468" },
  { name: "Karnataka", stateCount: "60", centralCount: "469" },
  { name: "Kerala", stateCount: "45", centralCount: "468" },
  { name: "Ladakh", stateCount: "45", centralCount: "468" },
  { name: "Lakshadweep", stateCount: "45", centralCount: "468" },
  { name: "Madhya Pradesh", stateCount: "72", centralCount: "469" },
  { name: "Maharashtra", stateCount: "62", centralCount: "470" },
  { name: "Manipur", stateCount: "35", centralCount: "472" },
  { name: "Meghalaya", stateCount: "25", centralCount: "472" },
  { name: "Mizoram", stateCount: "30", centralCount: "472" },
  { name: "Nagaland", stateCount: "40", centralCount: "472" },
  { name: "Odisha", stateCount: "55", centralCount: "469" },
  { name: "Puducherry", stateCount: "55", centralCount: "469" },
  { name: "Punjab", stateCount: "49", centralCount: "468" },
  { name: "Rajasthan", stateCount: "65", centralCount: "469" },
  { name: "Sikkim", stateCount: "12", centralCount: "472" },
  { name: "Tamil Nadu", stateCount: "85", centralCount: "469" },
  { name: "Telangana", stateCount: "70", centralCount: "469" },
  {
    name: "The Dadra And Nagar Haveli And Daman And Diu",
    stateImage: "Daman and Diu",
    stateCount: "70",
    centralCount: "469",
  },
  { name: "Tripura", stateCount: "20", centralCount: "472" },
  { name: "Uttar Pradesh", stateCount: "102", centralCount: "469" },
  { name: "Uttarakhand", stateCount: "30", centralCount: "469" },
  { name: "West Bengal", stateCount: "75", centralCount: "469" },
];

export const filtersData = [
  {
    identifier: "beneficiaryState",
    label: "State",
    display: "ComboBoxFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "All",
        count: 20,
      },
      {
        label: "Puducherry",
        count: 18,
      },
      {
        label: "Chhattisgarh",
        count: 17,
      },
      {
        label: "Assam",
        count: 10,
      },
      {
        label: "Gujarat",
        count: 10,
      },
      {
        label: "Punjab",
        count: 9,
      },
      {
        label: "Delhi",
        count: 7,
      },
      {
        label: "Karnataka",
        count: 7,
      },
      {
        label: "Uttarakhand",
        count: 7,
      },
      {
        label: "Arunachal Pradesh",
        count: 6,
      },
      {
        label: "Goa",
        count: 6,
      },
      {
        label: "Kerala",
        count: 6,
      },
      {
        label: "Odisha",
        count: 6,
      },
      {
        label: "Rajasthan",
        count: 6,
      },
      {
        label: "Tripura",
        count: 6,
      },
      {
        label: "Tamil Nadu",
        count: 5,
      },
      {
        label: "Telangana",
        count: 5,
      },
      {
        label: "West Bengal",
        count: 5,
      },
      {
        label: "Andaman and Nicobar Islands",
        count: 4,
      },
      {
        label: "Andhra Pradesh",
        count: 4,
      },
      {
        label: "Haryana",
        count: 4,
      },
      {
        label: "Himachal Pradesh",
        count: 4,
      },
      {
        label: "Jharkhand",
        count: 4,
      },
      {
        label: "Chandigarh",
        count: 3,
      },
      {
        label: "Meghalaya",
        count: 3,
      },
      {
        label: "Nagaland",
        count: 3,
      },
      {
        label: "Sikkim",
        count: 3,
      },
      {
        label: "The Dadra And Nagar Haveli And Daman And Diu",
        count: 3,
      },
      {
        label: "Uttar Pradesh",
        count: 3,
      },
      {
        label: "Madhya Pradesh",
        count: 2,
      },
      {
        label: "Maharashtra",
        count: 2,
      },
      {
        label: "Mizoram",
        count: 2,
      },
      {
        label: "Bihar",
        count: 1,
      },
      {
        label: "Jammu and Kashmir",
        count: 1,
      },
      {
        label: "Ladakh",
        count: 1,
      },
      {
        label: "Lakshadweep",
        count: 1,
      },
    ],
  },
  {
    identifier: "schemeCategory",
    label: "Scheme Category",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "Social welfare & Empowerment",
        count: 1104,
      },
      {
        label: "Education & Learning",
        count: 630,
      },
      {
        label: "Business & Entrepreneurship",
        count: 345,
      },
      {
        label: "Agriculture,Rural & Environment",
        count: 343,
      },
      {
        label: "Women and Child",
        count: 327,
      },
      {
        label: "Skills & Employment",
        count: 218,
      },
      {
        label: "Banking,Financial Services and Insurance",
        count: 173,
      },
      {
        label: "Health & Wellness",
        count: 173,
      },
      {
        label: "Sports & Culture",
        count: 106,
      },
      {
        label: "Housing & Shelter",
        count: 66,
      },
      {
        label: "Science, IT & Communications",
        count: 57,
      },
      {
        label: "Transport & Infrastructure",
        count: 46,
      },
      {
        label: "Travel & Tourism",
        count: 34,
      },
      {
        label: "Utility & Sanitation",
        count: 30,
      },
      {
        label: "Public Safety,Law & Justice",
        count: 9,
      },
    ],
  },
  {
    identifier: "gender",
    label: "Gender",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "All",
        count: 132,
      },
      {
        label: "Female",
        count: 39,
      },
      {
        label: "Male",
        count: 8,
      },
    ],
  },
  {
    identifier: "age-general",
    label: "Age",
    display: "ComboBoxFacet",
    type: "RangeFacet",
    entries: [
      {
        label: 0,
        count: 59,
      },
      {
        label: 10,
        count: 144,
      },
      {
        label: 20,
        count: 139,
      },
      {
        label: 30,
        count: 138,
      },
      {
        label: 40,
        count: 138,
      },
      {
        label: 50,
        count: 138,
      },
      {
        label: 60,
        count: 138,
      },
      {
        label: 70,
        count: 76,
      },
      {
        label: 80,
        count: 76,
      },
      {
        label: 90,
        count: 76,
      },
      {
        label: 100,
        count: 76,
      },
    ],
  },
  {
    identifier: "caste",
    label: "Caste",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "All",
        count: 166,
      },
      {
        label: "Scheduled Caste (SC)",
        count: 7,
      },
      {
        label: "Scheduled Tribe (ST)",
        count: 4,
      },
      {
        label: "Other Backward Class (OBC)",
        count: 1,
      },
    ],
  },
  {
    identifier: "nodalMinistryName",
    label: "Ministry Name",
    display: "ComboBoxFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "Ministry Of Health & Family Welfare",
        count: 8,
      },
      {
        label: "Ministry Of Defence",
        count: 3,
      },
      {
        label: "Ministry of Women and Child Development",
        count: 3,
      },
      {
        label: "Ministry Of Housing & Urban Affairs",
        count: 2,
      },
      {
        label: "Ministry Of Chemicals And Fertilizers",
        count: 1,
      },
      {
        label: "Ministry Of External Affairs",
        count: 1,
      },
      {
        label: "Ministry Of Jal Shakti",
        count: 1,
      },
      {
        label: "Ministry Of Social Justice and Empowerment",
        count: 1,
      },
      {
        label: "Ministry Of Youth Affairs & Sports",
        count: 1,
      },
      {
        label: "Ministry of Education",
        count: 1,
      },
    ],
  },
  {
    identifier: "level",
    label: "Level",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "State",
        count: 151,
      },
      {
        label: "Central",
        count: 22,
      },
    ],
  },
  {
    identifier: "residence",
    label: "Residence",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "Both",
        count: 166,
      },
      {
        label: "Rural",
        count: 6,
      },
      {
        label: "Urban",
        count: 3,
      },
    ],
  },
  {
    identifier: "minority",
    label: "Minority",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "No",
        count: 173,
      },
    ],
  },
  {
    identifier: "disability",
    label: "Differently Abled",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "No",
        count: 161,
      },
      {
        label: "Yes",
        count: 12,
      },
    ],
  },
  {
    identifier: "benefitTypes",
    label: "Benefit Type",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "Cash",
        count: 101,
      },
      {
        label: "In Kind",
        count: 57,
      },
      {
        label: "Composite",
        count: 15,
      },
    ],
  },
  {
    identifier: "dbtScheme",
    label: "DBT Scheme",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "No",
        count: 154,
      },
      {
        label: "Yes",
        count: 19,
      },
    ],
  },
  {
    identifier: "maritalStatus",
    label: "Marital Status",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "All",
        count: 169,
      },
      {
        label: "Married",
        count: 2,
      },
      {
        label: "Never Married",
        count: 1,
      },
    ],
  },
  {
    identifier: "disabilityPercentage",
    label: "Disability Percentage",
    display: "ComboBoxFacet",
    type: "RangeFacet",
    entries: [
      {
        label: 0,
        count: 2,
      },
      {
        label: 10,
        count: 2,
      },
      {
        label: 20,
        count: 2,
      },
      {
        label: 30,
        count: 2,
      },
      {
        label: 40,
        count: 6,
      },
      {
        label: 50,
        count: 7,
      },
      {
        label: 60,
        count: 7,
      },
      {
        label: 70,
        count: 7,
      },
      {
        label: 80,
        count: 7,
      },
      {
        label: 90,
        count: 7,
      },
      {
        label: 100,
        count: 7,
      },
    ],
  },
  {
    identifier: "isBpl",
    label: "Below Poverty Line",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "No",
        count: 164,
      },
      {
        label: "Yes",
        count: 9,
      },
    ],
  },
  {
    identifier: "isEconomicDistress",
    label: "Economic Distress",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "No",
        count: 167,
      },
      {
        label: "Yes",
        count: 6,
      },
    ],
  },
  {
    identifier: "isGovEmployee",
    label: "Government Employee",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "No",
        count: 170,
      },
      {
        label: "Yes",
        count: 3,
      },
    ],
  },
  {
    identifier: "employmentStatus",
    label: "Employment Status",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "All",
        count: 112,
      },
      {
        label: "Employed",
        count: 50,
      },
      {
        label: "Self-Employed/ Entrepreneur",
        count: 11,
      },
    ],
  },
  {
    identifier: "isStudent",
    label: "Student",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "No",
        count: 172,
      },
      {
        label: "Yes",
        count: 1,
      },
    ],
  },
  {
    identifier: "occupation",
    label: "Occupation",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "Construction Worker",
        count: 43,
      },
      {
        label: "Unorganized Worker",
        count: 24,
      },
      {
        label: "All",
        count: 21,
      },
      {
        label: "Journalist",
        count: 3,
      },
      {
        label: "Ex Servicemen",
        count: 2,
      },
      {
        label: "Organized Worker",
        count: 2,
      },
      {
        label: "Health Worker",
        count: 1,
      },
      {
        label: "Student",
        count: 1,
      },
    ],
  },
  {
    identifier: "applicationMode",
    label: "Application Mode",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "Offline",
        count: 118,
      },
      {
        label: "Online",
        count: 71,
      },
      {
        label: "Online - via CSC",
        count: 12,
      },
    ],
  },
  {
    identifier: "schemeType",
    label: "Scheme Type",
    display: "ListFacet",
    type: "RefinementSelectFacet",
    entries: [
      {
        label: "Central Sector Scheme",
        count: 5,
      },
      {
        label: "Centrally Sponsored Scheme",
        count: 2,
      },
    ],
  },
];

export function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function filteredData(item, itemName) {
  const data = item
    .filter((i) => i.name === decodeURIComponent(itemName))
    .map((i) => ({
      imageUrl: i.imageUrl,
      color: i.color,
    }));

  const image = data.length > 0 ? data[0].imageUrl : null;
  const color = data.length > 0 ? data[0].color : null;

  return { image, color };
}

export function checkEligibility(user, criteria) {
  const {
    age,
    aadharCard,
    aadhaarLinkedBankAccount,
    nationality,
    maritalStatus,
    state,
    income,
    gender,
  } = user;

  const ageValid =
    criteria.age &&
    (criteria.age.length === 0 ||
      (age >= criteria.age.min && age <= criteria.age.max));

  const aadhaarValid =
    criteria.aadharCard &&
    (criteria.aadharCard ||
      (aadharCard.length > 0 && aadhaarLinkedBankAccount));

  const nationalityValid =
    criteria.nationality &&
    (nationality === criteria.nationality || criteria.nationality);

  const stateValid = criteria.state && state === criteria.state;

  const maritalValid =
    gender === "Female" &&
    ((maritalStatus && maritalStatus.toLowerCase() === "widow") ||
      criteria.isWidow);

  const incomeValid =
    criteria.income && (income < criteria.income || !criteria.income);

  const totalCriteria = criteria.count;
  let metCriteria = 0;

  if (ageValid) metCriteria++;
  if (aadhaarValid) metCriteria++;
  if (nationalityValid) metCriteria++;
  if (maritalValid) metCriteria++;
  if (stateValid) metCriteria++;
  if (incomeValid) metCriteria++;

  const percentage = (metCriteria / totalCriteria) * 100;

  return percentage >= 75;
}

export function extractEligibilityCriteria(paragraph) {
  const combined = paragraph.join(" ");
  const doc = nlp(combined);

  let age = {};
  let aadhaarRequired = null;
  let nationality = "";
  let state = "";
  let isWidow = null;
  let income = null;

  const noAgeLimitMatch = doc.match("(no age limit|any age|all ages)");
  if (noAgeLimitMatch.found) {
    age.min = 0;
    age.max = 100;
  } else {
    const ageMatch = doc.match(
      "(aged between|between the ages of|in the age group of) [#Value] and [#Value]"
    );
    if (ageMatch.found) {
      const ageValues = ageMatch.values().toNumber();
      if (ageValues.length === 2) {
        const extractedAges = extractAges(ageValues);
        age.min = extractedAges.minAge || null;
        age.max = extractedAges.maxAge || null;
      }
    } else {
      const minAgeMatch = doc.match(
        "(age must be|applicant must be) (above|over|greater than|at least) [#Value]"
      );
      if (minAgeMatch.found) {
        const minAgeValue = minAgeMatch.values().toNumber();
        if (minAgeValue) {
          age.min = extractAges(minAgeValue).minAge || null;
        }
      }

      const maxAgeMatch = doc.match(
        "(age must be|applicant must be) (below|under|less than|no more than) [#Value]"
      );
      if (maxAgeMatch.found) {
        const maxAgeValue = maxAgeMatch.values().toNumber();
        if (maxAgeValue) {
          age.max = extractAges(maxAgeValue).maxAge || null;
        }
      }
    }
  }

  aadhaarRequired =
    (doc.has("Aadhaar card") && doc.has("Aadhaar linked bank account")) || null;

  const nationalityMatch = doc
    .match("[#Noun] (nationality|citizens)")
    .out("text");
  if (nationalityMatch) {
    nationality = nationalityMatch.trim().split(" ")[0];
  }

  const stateMatch = doc.match("(State of) [#Noun]").out("text");
  if (stateMatch) {
    state = stateMatch.trim().split(" ")[2];
  }

  isWidow = doc.has("widow") || null;

  const incomeMatch = doc.match(
    "income of the applicant (should be|must be) (less than|under|below|not exceeding) [#Value]"
  );
  if (incomeMatch.found) {
    const incomeValue = incomeMatch.values().toNumber();
    incomeValue.ptrs.map((ptr) => {
      const incomeString = ptr[3];
      income = parseInt(incomeString.split("|")[0].replace("₹", ""), 10);
    });
  }

  let criteriaCount = 0;
  if (age.min != null && age.max !== null) criteriaCount++;
  if (aadhaarRequired !== null) criteriaCount++;
  if (nationality !== "") criteriaCount++;
  if (state !== "") criteriaCount++;
  if (isWidow !== null) criteriaCount++;
  if (income !== null) criteriaCount++;

  const result = {};
  if (Object.keys(age).length > 0) result.age = age;
  if (aadhaarRequired) result.aadhaarRequired = aadhaarRequired;
  if (nationality.length > 0) result.nationality = nationality;
  if (state.length > 0) result.state = state;
  if (isWidow) result.isWidow = isWidow;
  if (income !== null) result.income = income;
  if (criteriaCount > 0) result.count = criteriaCount;

  return result;
}

function extractAges(ageValues) {
  if (!ageValues || !ageValues.ptrs) return { minAge: null, maxAge: null };

  const ages = ageValues.ptrs.map((ptr) => {
    const ageString = ptr[3];
    return parseInt(ageString.split("|")[0], 10);
  });

  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);

  return { minAge, maxAge };
}
