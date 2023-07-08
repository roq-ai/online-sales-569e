import axios from 'axios';
import queryString from 'query-string';
import { VideoShareInterface, VideoShareGetQueryInterface } from 'interfaces/video-share';
import { GetQueryInterface } from '../../interfaces';

export const getVideoShares = async (query?: VideoShareGetQueryInterface) => {
  const response = await axios.get(`/api/video-shares${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createVideoShare = async (videoShare: VideoShareInterface) => {
  const response = await axios.post('/api/video-shares', videoShare);
  return response.data;
};

export const updateVideoShareById = async (id: string, videoShare: VideoShareInterface) => {
  const response = await axios.put(`/api/video-shares/${id}`, videoShare);
  return response.data;
};

export const getVideoShareById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/video-shares/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteVideoShareById = async (id: string) => {
  const response = await axios.delete(`/api/video-shares/${id}`);
  return response.data;
};
