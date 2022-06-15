import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import Slider from 'react-slick';

export default function HomePage() {
  // const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ marginTop: '-32px' }}>
      <Slider {...settings}>
        <div>
          <img
            src="https://topdogtips.com/wp-content/uploads/2016/03/Does-My-Dog-Love-Me-How-to-Read-Dogs-Emotions.jpg"
            alt="image"
            style={{
              display: 'block',
              width: '100%',
              maxHeight: 500,
              objectFit: 'cover',
            }}
          />
        </div>
        <div>
          <img
            src="https://besthqwallpapers.com/Uploads/8-9-2018/65107/thumb-border-collie-brown-dog-pets-human-friend-cute-animals.jpg"
            alt="hero"
            style={{
              display: 'block',
              width: '100%',
              maxHeight: 500,
              objectFit: 'cover',
            }}
          />
        </div>
        <div>
          <img
            src="https://cdn5.vectorstock.com/i/1000x1000/50/84/home-pets-set-cat-dog-parrot-goldfish-hamster-vector-9205084.jpg"
            alt="hero"
            style={{
              display: 'block',
              width: '100%',
              maxHeight: 500,
              objectFit: 'cover',
            }}
          />
        </div>
      </Slider>
      <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
        {/* <Stack spacing={2}>
          <Typography variant="h2">Welcome to the store</Typography>
        </Stack> */}
        <Stack direction="row" spacing={2}>
          <Button
            href="/posts"
            variant="outlined"
            startIcon={<HomeIcon color="primary" />}
          >
            Go To Home
          </Button>
          <Button href="/login" variant="contained" endIcon={<SendIcon />}>
            Login
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
