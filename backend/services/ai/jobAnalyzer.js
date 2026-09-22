import { SchemaType } from "@google/generative-ai";
import { getModel } from "./provider.js";

const jobSchema = {
  type: SchemaType.OBJECT,
  properties: {
    jobTitle: {
      type: SchemaType.STRING,
      description: "The official job title",
    },
    requiredSkills: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "Must-have skills explicitly required by the job",
    },
    preferredSkills: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "Nice-to-have or preferred skills",
    },
    requiredExperienceYears: {
      type: SchemaType.NUMBER,
      description:
        "Minimum years of experience required. Return 0 if not specified.",
    },
    educationRequirements: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "Educational degrees or certifications required",
    },
    responsibilities: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "Key responsibilities and duties of the role",
    },
    qualifications: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "General qualifications, soft skills, or requirements",
    },
    tools: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "Specific software tools mentioned (e.g., Jira, Figma, Git)",
    },
    technologies: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description:
        "Specific programming languages, frameworks, or technical stacks",
    },
  },
  required: [
    "jobTitle",
    "requiredSkills",
    "preferredSkills",
    "requiredExperienceYears",
    "educationRequirements",
    "responsibilities",
    "technologies",
  ],
};

export const parseJobDescription = async (jobDescription, title = "") => {
  const model = getModel(process.env.AI_MODEL, {
    responseMimeType: "application/json",
    responseSchema: jobSchema,
    temperature: 0.1,
  });

  const prompt = `
    You are an expert HR and recruitment AI. Extract the structured information from the following Job Description.
    Do not invent or assume any information that is not present in the text.
    If a field like preferredSkills is missing, return an empty array.
    
    Job Title Context: ${title}
    
    Job Description:
    ${jobDescription}
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Job Parsing Error:", error);
    throw new Error("Failed to parse job description using AI");
  }
};
