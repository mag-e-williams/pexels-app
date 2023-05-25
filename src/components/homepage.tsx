import react, { useEffect, useState } from 'react';

import { Container, Pagination } from '@mui/material';
import { fetchPexels } from '@/pages/api/fetchPexels';
import { PexelsImage } from '@/pages/api/types/PexelsImage';
import { PhotoGrid } from './PhotoGrid';
import Header from './Header';

export function Homepage() {
  const [pexels, setPexels] = useState<PexelsImage[]>([]);
  const [totalPages, setTotalPages] = useState<number>();

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchPexelsImages = async () => {
      try {
        const response = await fetchPexels(page);
        const fetchedPexels =response.photos;

        setPexels(fetchedPexels)
        setTotalPages(Math.ceil(response.totalResults/response.perPage))
      } catch (error) {
        console.error('Error fetching GIFs:', error);
      }
    };

    fetchPexelsImages();
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, selectedPage: number) => {
    setPage(selectedPage);
  };

  return (
    <>
      <Header />

      <Container sx={{ marginTop: 16 }}>
        <PhotoGrid photos={pexels} />
      </Container>

      <Container sx={{ display: 'flex', justifyContent: 'center', paddingY: 5 }}>
        <Pagination 
          count={totalPages} 
          page={page} 
          onChange={handlePageChange}
          size="small" 
          shape="rounded" 
          showFirstButton 
          showLastButton
        />
      </Container>
    </>
  );
}
