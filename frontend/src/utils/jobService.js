import api from './api';

export const getJobs = () => api.get('/jobs');
export const createJob = (job) => api.post('/jobs', job);
export const applyToJob = (jobId, application) => api.post(`/jobs/${jobId}/apply`, application);
export const getSummary = () => api.get('/summary');
