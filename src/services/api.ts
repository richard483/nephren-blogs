import axios from 'axios';

async function getData<T>(url: string): Promise<T> {
  const response = await axios.get<T>(url);
  return response.data;
}

export { getData };
