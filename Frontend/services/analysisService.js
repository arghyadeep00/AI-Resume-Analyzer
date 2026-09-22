import api from "./api";

export const uploadAndAnalyzeResume = async (file, jobId) => {
  const formData = new FormData();
  formData.append("resumes", file);
  if (jobId) {
    formData.append("jobId", jobId);
  }

  const uploadRes = await api.post("/storage/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  const uploadedFiles = uploadRes.data.files;
  if (!uploadedFiles || uploadedFiles.length === 0) {
    throw new Error("File upload failed");
  }

  const resumeId = uploadedFiles[0]._id;

  const analysisRes = await api.post("/analysis", { resumeId, jobId });
  return analysisRes.data;
};

export const getAnalyses = async (jobId = null) => {
  const url = jobId ? `/analysis?jobId=${jobId}` : "/analysis";
  const res = await api.get(url);
  return res.data;
};

export const getAnalysisById = async (id) => {
  const res = await api.get(`/analysis/${id}`);
  return res.data;
};

