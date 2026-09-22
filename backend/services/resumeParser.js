import fs from 'fs';
import mammoth from 'mammoth';
import path from 'path';
import { PDFParse } from 'pdf-parse';

export const extractResumeText = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath);
    let text = "";

    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const uint8Array = new Uint8Array(dataBuffer.buffer, dataBuffer.byteOffset, dataBuffer.byteLength);
      const parser = new PDFParse(uint8Array);
      const data = await parser.getText();
      text = data.text;
    } else if (ext === '.docx' || ext === '.doc') {
      const result = await mammoth.extractRawText({ path: filePath });
      text = result.value;
    } else {
      throw new Error(`Unsupported file type: ${ext}`);
    }

    return {
      fileName,
      fileType: ext,
      text: text.trim()
    };
  } catch (error) {
    console.error("Error extracting text from file:", error);
    throw new Error("Failed to extract text from document");
  }
};
