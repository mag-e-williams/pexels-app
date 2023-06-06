import Image from 'next/image';
import type { PexelsImage } from '@/types/PexelsImage';
import React, { useState } from 'react';
import { Container, Skeleton, styled } from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';


const IconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  width: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


export function NoImagesFound() {

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
      <IconWrapper>
        <ImageNotSupportedIcon />
        No Images Found
      </IconWrapper>
    </Container>
  );
}
