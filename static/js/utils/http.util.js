
const axios = require('axios');


const client = axios.create({
  baseURL: '',
  timeout: 300000,
  responseType: 'json',
  // headers: { Pragma: "no-cache" },
});

export const get = async (url, headers) => {
  const response = await client.get(url, { headers });
  return response?.data;//?.map(data => metadataSchema(data));
}

export const post = async (url, body, headers = {}) => {
  const response = await client.post(url, body, { headers });
  return response;
}

export const patch = async (url, body, headers = {}) => {
  const response = await client.patch(url, body, { headers });
  return response;
}

export const del = async (url, headers = {}) => {
  const response = await client.delete(url, { headers });
  return response;
}
