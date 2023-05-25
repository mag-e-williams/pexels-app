import react, { useEffect, useState } from 'react';

import { Container } from '@mui/material';
import { fetchPexels } from '@/pages/api/fetchPexels';
import { PexelsImage } from '@/pages/api/types/PexelsImage';

export function Homepage() {
  const [pexels, setPexels] = useState<PexelsImage[]>([]);

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const fetchedPexels = await fetchPexels();
        setPexels(fetchedPexels)
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      }
    };

    fetchGifs();
  }, []);

  return (
    <>
      <Container sx={{ marginTop: 16 }}>
        hello world
      </Container>
    </>
  );
}
