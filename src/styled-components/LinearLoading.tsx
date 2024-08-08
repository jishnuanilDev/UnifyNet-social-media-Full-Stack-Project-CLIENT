import * as React from 'react';
import Stack from '@mui/material/Stack';
import dynamic from 'next/dynamic';
const LinearProgress = dynamic(() => import('@mui/material/LinearProgress'));

export default function LinearLoading() {
  return (
    <Stack sx={{ width: '100%', color: 'grey.500' }}>
      <LinearProgress color="secondary" />

    </Stack>
  );
}