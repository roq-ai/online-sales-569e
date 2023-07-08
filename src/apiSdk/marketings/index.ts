import axios from 'axios';
import queryString from 'query-string';
import { MarketingInterface, MarketingGetQueryInterface } from 'interfaces/marketing';
import { GetQueryInterface } from '../../interfaces';

export const getMarketings = async (query?: MarketingGetQueryInterface) => {
  const response = await axios.get(`/api/marketings${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMarketing = async (marketing: MarketingInterface) => {
  const response = await axios.post('/api/marketings', marketing);
  return response.data;
};

export const updateMarketingById = async (id: string, marketing: MarketingInterface) => {
  const response = await axios.put(`/api/marketings/${id}`, marketing);
  return response.data;
};

export const getMarketingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/marketings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMarketingById = async (id: string) => {
  const response = await axios.delete(`/api/marketings/${id}`);
  return response.data;
};
