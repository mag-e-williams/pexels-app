import Image from 'next/image';
import type { PexelsImage } from '@/types/PexelsImage';
import React, { useState } from 'react';
import { Container, Link, Skeleton, Typography } from '@mui/material';

type LoadingImageProps = {
  image: PexelsImage;
};

export function LoadingImage({ image }: LoadingImageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleMouseEnter = () => {
    setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    setShowOverlay(false);
  };

  return (
    <Container
      sx={{
        padding: 'none',
        transform: 'initial',
        cursor: 'pointer',
        opacity: 1,
        transition: 'all .2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading && (
        <Skeleton
          variant="rounded"
          sx={{
            display: 'block',
            width: '100%',
            height: 20,
          }}
        />
      )}

      <Image
        onLoad={() => setIsLoading(false)}
        src={`${image.src.original}?w=400&auto=format`}
        alt={image.alt}
        width={0}
        height={0}
        loading="lazy"
        sizes="100vw"
        style={{
          borderRadius: 6,
          display: 'block',
          width: '100%',
          height: 'auto',
          // Since masonry lists depend on the height of the element,
          // minHeight serves as a placeholder value while the img has not yet loaded.
          minHeight: 10,
        }}
      />

      {showOverlay && (
        <Container 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor:' rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(2px)',
            borderRadius: 2,
          }}>
            <Container 
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 10,
              padding: 2,
              color: 'white',
            }}>
              <Typography variant="h5">
                {image.photographer}
              </Typography>
              <Typography variant="subtitle1">
                <Link 
                  href={image.photographer_url} 
                  color="inherit" 
                  underline="hover" 
                  target="_blank"
                >
                  {image.photographer_url}
                </Link>
              </Typography>
            </Container>
        </Container>
      )}

    </Container>
  );
}
