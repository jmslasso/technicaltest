import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const handleErrorResponse = (error) => {
  console.error('API call failed:', error);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
    console.error('Headers:', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
  }
  return null;
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const getPostsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    return handleErrorResponse(error);
  }
};
