import { SchemaType } from "@google/generative-ai";
import { getModel } from "./provider.js";

const explanationSchema = {
  type: SchemaType.OBJECT,
  properties: {
    summary: { 
      type: SchemaType.STRING,
      description: "A short, professional 2-3 sentence summary of the candidate's fit for the role based on the score and matches."
    },
    strengths: { 
      type: SchemaType.ARRAY, 
      items: { type: SchemaType.STRING },
      description: "3-5 key strengths or strong matches (e.g., specific skills, experience overlap)."
    },
    weaknesses: { 
      type: SchemaType.ARRAY, 
      items: { type: SchemaType.STRING },
      description: "Any areas where the candidate falls short, based on the missing matches."
    },
    recommendations: { 
      type: SchemaType.ARRAY, 
      items: { type: SchemaType.STRING },
      description: "Actionable recommendations (e.g., 'Interview to verify Docker knowledge' or 'Proceed to technical screen')."
    },
  },
  required: ["summary", "strengths", "weaknesses", "recommendations"],
};

export const generateExplanation = async (analysisData) => {
  const model = getModel(process.env.AI_MODEL, {
    responseMimeType: "application/json",
    responseSchema: explanationSchema,
    temperature: 0.4, 
  });

  const prompt = `
    You are an expert technical recruiter AI.
    Based on the following deterministic matching analysis between a Candidate and a Job Description, generate a human-readable explanation of the fit.
    
    IMPORTANT RULES:
    1. Base your explanation ONLY on the provided extracted evidence and calculated matches.
    2. Do NOT invent missing skills or strengths.
    3. Be objective and professional.
    
    Analysis Data:
    ${JSON.stringify(analysisData, null, 2)}
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Explanation Error:", error);
    return {
      summary: "AI explanation generation failed.",
      strengths: [],
      weaknesses: [],
      recommendations: []
    };
  }
};
