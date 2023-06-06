// import type { ContentCardProps } from 'components/contentCards/ContentCard';
import { Box, Container } from '@mui/material';
import type { PexelsImage } from '@/types/PexelsImage';
import React, { useState } from 'react';
import { Masonry } from '@mui/lab';
import { LoadingImage } from './LoadingImage';
import { NoImagesFound } from './NoImagesFound';

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
        columns={{ xs: 1, sm: 2, md: 2, lg: 3 }}
        // columns={5}
        spacing={1}
      >

        {!photos.length && (
          <NoImagesFound/>
        )}

        {photos.map((item, index) => (
          <Container key={item.id} onClick={() => handlePhotoClick(item, index)}>
            <LoadingImage image={item} />
          </Container>
        ))}
      </Masonry>
    </Box>
  );
}
