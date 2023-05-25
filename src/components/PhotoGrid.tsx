// import type { ContentCardProps } from 'components/contentCards/ContentCard';
import { Box, Container } from '@mui/material';
import type { PexelsImage } from '@/pages/api/types/PexelsImage';
import React, { useState } from 'react';
import { Masonry } from '@mui/lab';
import { LoadingImage } from './LoadingImage';

type PhotoGridProps =  {
  photos: Array<PexelsImage>;
  modal?: boolean;
};

export function PhotoGrid({ photos, modal }: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PexelsImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handlePhotoClick = (photo: PexelsImage, index: number) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
  };

  return (
    <Box
      id="photography-container" // ID on the Box component for scrolling
      sx={(theme) => ({
        padding: 4,
        display: 'flex',
        [theme.breakpoints.down('md')]: {
          padding: 1,
        },
      })}
    >
      <Masonry
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        // columns={5}
        spacing={1}
      >
        {photos.map((item, index) => (
          <Container key={item.id} onClick={() => handlePhotoClick(item, index)}>
            <LoadingImage image={item} />
          </Container>
        ))}
      </Masonry>

      {/* {modal && selectedPhoto && (
        <PhotoGridModal
          turnOnAnimation
          photos={photos}
          selectedPhoto={selectedPhoto}
          selectedIndex={selectedIndex}
          onSelectedPhoto={setSelectedPhoto}
          onSelectedIndex={setSelectedIndex}
        />
      )} */}
    </Box>
  );
}
