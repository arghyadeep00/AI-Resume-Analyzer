import { SchemaType } from "@google/generative-ai";
import { getModel } from "./provider.js";

const resumeSchema = {
  type: SchemaType.OBJECT,
  properties: {
    personal: {
      type: SchemaType.OBJECT,
      properties: {
        name: { type: SchemaType.STRING },
        email: { type: SchemaType.STRING },
        phone: { type: SchemaType.STRING },
        location: { type: SchemaType.STRING },
      },
    },
    summary: {
      type: SchemaType.STRING,
      description: "Professional summary or objective",
    },
    skills: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "All general skills",
    },
    technicalSkills: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description:
        "Hard technical skills, programming languages, software, tools",
    },
    softSkills: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "Soft skills like communication, leadership, etc.",
    },
    experience: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          company: { type: SchemaType.STRING },
          position: { type: SchemaType.STRING },
          startDate: { type: SchemaType.STRING },
          endDate: {
            type: SchemaType.STRING,
            description: "Leave as 'Present' if currently working",
          },
          description: {
            type: SchemaType.STRING,
            description:
              "Detailed description of responsibilities and achievements",
          },
          technologies: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
            description: "Technologies used in this specific role",
          },
        },
      },
    },
    education: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          degree: { type: SchemaType.STRING },
          institution: { type: SchemaType.STRING },
          year: { type: SchemaType.STRING },
        },
      },
    },
    projects: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          name: { type: SchemaType.STRING },
          description: { type: SchemaType.STRING },
          technologies: {
            type: SchemaType.ARRAY,
            items: { type: SchemaType.STRING },
          },
        },
      },
    },
    certifications: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
    },
    totalExperienceYears: {
      type: SchemaType.NUMBER,
      description:
        "Calculated total years of professional experience across all roles. Estimate if dates are provided.",
    },
  },
  required: [
    "personal",
    "skills",
    "experience",
    "education",
    "totalExperienceYears",
  ],
};

export const parseResumeText = async (resumeText) => {
  const model = getModel(process.env.AI_MODEL, {
    responseMimeType: "application/json",
    responseSchema: resumeSchema,
    temperature: 0.1,
  });

  const prompt = `
    You are an expert ATS (Applicant Tracking System) AI parser. 
    Extract the structured information from the following Resume text.
    - Do not invent any experience, skills, or education.
    - If a section is missing, return empty arrays or empty strings.
    - Treat absent information as "not documented".
    - Calculate totalExperienceYears accurately based on the work history dates.

    Resume Text:
    ${resumeText}
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Resume Parsing Error:", error);
    throw new Error("Failed to parse resume text using AI");
  }
};
