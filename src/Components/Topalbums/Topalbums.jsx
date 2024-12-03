import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import ImgMediaCard from "../Card/ImgMediaCard";
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles?.('dark', {
    backgroundColor: '#1A2027',
  }),
}));

async function fetchTopAlbums() {
  const url = "https://qtify-backend-labs.crio.do/albums/top";

  try {
    const response = await axios.get(url);
    return response.data; // Axios stores the JSON response in the `data` property
  } catch (error) {
    console.error("Failed to fetch top albums:", error.message);
    return []; // Return an empty array to handle errors gracefully
  }
}

function TopAlbums() {
  const [data, setData] = useState([]);

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    async function getData() {
      const albums = await fetchTopAlbums();
      setData(albums);
    }
    getData();
  }, []); // Empty dependency array ensures it only runs on mount

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        
        {data && Date.length>0 ? data.map((album, index) => (
          <Grid key={index} xs={12} sm={6} md={4}>
            {console.log("album") }
            {console.log(album)}
            <ImgMediaCard  props={album}/>
          </Grid>
        )):<p>No data found</p>}
      </Grid>
    </Box>
  );
}

export default TopAlbums;
