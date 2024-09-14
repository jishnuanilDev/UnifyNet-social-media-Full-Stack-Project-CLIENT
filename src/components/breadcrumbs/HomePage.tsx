"use client"
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function HomeBreadcrumbs() {
    const breadcrumbs = [
        // <Link
        //   underline="hover"
        //   key="1"
        //   href="/"
        //   sx={{ color: 'grey' }}  // Change the color of the first link
        //   onClick={handleClick}
        // >
          
        // </Link>,
        <Link
          underline="hover"
          key="2"
          href="/material-ui/getting-started/installation/"
          sx={{ color: 'grey' }}  // Change the color of the second link
          onClick={handleClick}
        >
          
        </Link>,
        <Typography
          key="3"
          sx={{ color: 'grey' ,fontFamily:'monospace' }}  // Change the color of the current breadcrumb item
        >
          Home
        </Typography>,
      ];

  return (

        <Stack spacing={2} >
          <Breadcrumbs  sx={{ color: 'grey',fontFamily:'monospace' }}  separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>

  );
}
