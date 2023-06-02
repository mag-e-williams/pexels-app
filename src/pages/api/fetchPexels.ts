import type { PexelsImage } from './types/PexelsImage';
import type { PexelsResponse } from './types/PexelsResponse';

const CURATED_PEXELS_URL = 'https://api.pexels.com/v1/curated';
const SEARCH_PEXELS_URL = 'https://api.pexels.com/v1/search';

const API_KEY = '$_USER_API_KEY';

export async function fetchPexels(page = 0, search = '', perPage = 20): Promise<PexelsResponse> {
  const headers = {
    Authorization: API_KEY
  };
  
  const base_url = search ? SEARCH_PEXELS_URL : CURATED_PEXELS_URL;
  const params = search ? `query=${search}&page=${page}&per_page=${perPage}` : `page=${page}&per_page=${perPage}`;

  const url = `${base_url}?${params}`;

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