import Image from 'next/image';
import type { PexelsImage } from '@/pages/api/types/PexelsImage';
import React, { useState } from 'react';
import { Container, Skeleton } from '@mui/material';

type LoadingImageProps = {
  image: PexelsImage;
};

export function LoadingImage({ image }: LoadingImageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    </Container>
  );
}
