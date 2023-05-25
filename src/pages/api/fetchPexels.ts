import type { PexelsImage } from './types/PexelsImage';
// import type { PexelsResponse } from './types/PexelsResponse';

const PEXELS_URL = 'https://api.pexels.com/v1/curated';
const API_KEY = 'dg0x4maV6RukCQ7yFcGIn50JqBqGGuGusEmlkNDwBNljc3TS43eoN7C9';

export async function fetchPexels(): Promise<PexelsImage[]> {
  const headers = {
    Authorization: API_KEY
  };

  try {
    const response = await fetch(PEXELS_URL, { headers });
    const data = await response.json();
    const pexels: PexelsImage[] = data.photos.map((e: any) => ({
      ...e
    }))
    
    return pexels;
  } catch (error) {
    console.error('Error fetching data from Pexels:', error);
    throw error;
  }
}