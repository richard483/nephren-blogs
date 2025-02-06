import axios from 'axios';

async function getData(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('#error fetching external api: ', error);
    throw error;
  }
}

export { getData };
