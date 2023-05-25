import type { PexelsImage } from './types/PexelsImage';
import type { PexelsResponse } from './types/PexelsResponse';

const PEXELS_URL = 'https://api.pexels.com/v1/curated';
const API_KEY = 'dg0x4maV6RukCQ7yFcGIn50JqBqGGuGusEmlkNDwBNljc3TS43eoN7C9';

export async function fetchPexels(page = 0, perPage = 30): Promise<PexelsResponse> {
  const headers = {
    Authorization: API_KEY
  };

  const url = `${PEXELS_URL}?page=${page}&per_page=${perPage}`

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    console.log(data)
    const pexels: PexelsImage[] = data.photos.map((e: any) => ({
      ...e
    }))
    


    return {
      page: data.page,
      perPage: data.per_page,
      nextPage: data.next_page,
      photos: pexels, 
      totalResults: data.total_results
    };
  } catch (error) {
    console.error('Error fetching data from Pexels:', error);
    throw error;
  }
}