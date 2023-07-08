import axios from 'axios';
import queryString from 'query-string';
import { CustomerReplyInterface, CustomerReplyGetQueryInterface } from 'interfaces/customer-reply';
import { GetQueryInterface } from '../../interfaces';

export const getCustomerReplies = async (query?: CustomerReplyGetQueryInterface) => {
  const response = await axios.get(`/api/customer-replies${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCustomerReply = async (customerReply: CustomerReplyInterface) => {
  const response = await axios.post('/api/customer-replies', customerReply);
  return response.data;
};

export const updateCustomerReplyById = async (id: string, customerReply: CustomerReplyInterface) => {
  const response = await axios.put(`/api/customer-replies/${id}`, customerReply);
  return response.data;
};

export const getCustomerReplyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/customer-replies/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCustomerReplyById = async (id: string) => {
  const response = await axios.delete(`/api/customer-replies/${id}`);
  return response.data;
};
