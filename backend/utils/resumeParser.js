import fs from 'fs';
import pdfParse from 'pdf-parse';


export const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error("Failed to parse PDF");
  }
};


export const calculateMatchPercentage = (resumeText, jobKeywords) => {
  if (!jobKeywords || jobKeywords.length === 0) {
    return { score: 0, matched: [], missing: [] };
  }

  const cleanedResumeText = resumeText.toLowerCase().replace(/[^a-zA-Z0-9\s#\+\-]/g, ' ');

  const matched = [];
  const missing = [];

  jobKeywords.forEach(keyword => {
    const cleanedKeyword = keyword.toLowerCase().trim();
    
    const escapedKeyword = cleanedKeyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'i');

    if (regex.test(cleanedResumeText)) {
      matched.push(keyword);
    } else {
      missing.push(keyword);
    }
  });

  const score = Math.round((matched.length / jobKeywords.length) * 100);

  return {
    score,
    matched,
    missing
  };
};
