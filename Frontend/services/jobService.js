import api from './api';

export const createJob = async (jobData) => {
  const response = await api.post('/jobs/job-post', jobData);
  return response.data;
};

export const getJobs = async () => {
  const response = await api.get('/jobs/job-get');
  return response.data;
};

export const getJobById = async (id) => {
  const response = await api.get(`/jobs/job-get/${id}`);
  return response.data;
};

export const updateJob = async (id, jobData) => {
  const response = await api.patch(`/jobs/job-update/${id}`, jobData);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/job-delete/${id}`);
  return response.data;
};
