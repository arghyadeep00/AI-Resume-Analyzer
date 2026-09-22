import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI = null;

export const initAI = () => {
  if (genAI) return genAI;
  const apiKey = process.env.AI_API_KEY;
  genAI = new GoogleGenerativeAI(apiKey);
  return genAI;
};

export const getModel = (modelName , generationConfig = {}) => {
  const ai = initAI();
  return ai.getGenerativeModel({
    model: process.env.AI_MODEL || modelName,
    generationConfig,
  });
};
