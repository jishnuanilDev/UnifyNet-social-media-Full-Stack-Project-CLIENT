import * as React from 'react';
import Stack from '@mui/material/Stack';
import dynamic from 'next/dynamic';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearLoading() {
  return (
    <Stack sx={{ width: '100%', color: 'grey.500' }}>
      <LinearProgress color="secondary" />

    </Stack>
  );
}