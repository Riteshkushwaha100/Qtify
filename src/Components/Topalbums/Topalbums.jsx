import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import ImgMediaCard from "../Card/ImgMediaCard";
import axios from "axios";
import Topalbums from "./Topalbums.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles?.("dark", {
    backgroundColor: "#1A2027",
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
  const [showAll, setShowAll] = useState(false); // State to toggle "show all"
  const displayedData = showAll ? data : data.slice(0, 7);

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    async function getData() {
      const albums = await fetchTopAlbums();
      setData(albums);
    }
    getData();
  }, []); // Empty dependency array ensures it only runs on mount

  return (
    <Box sx={{ flexGrow: 2 }}>
      <Grid className="gridOuterTag" container spacing={2}>
        {/* First two items */}
        <Grid item size={{ xs: 6, md: 6 }}>
          <div className="topaAlbums">Top Albums</div>
        </Grid>
        <Grid item size={{ xs: 6, md: 6 }}>
          <div className="showAll"  onClick={() => setShowAll(!showAll)}  > {showAll ? 'Collapse' : 'Show All'}</div>
        </Grid>

        {/* Dynamic items taking full width */}
        {displayedData && displayedData.length > 0 ? (
          displayedData.map((album, index) => (
            <Grid  item key={index} xs={12}>
              {console.log("album", album)}
              <ImgMediaCard props={album} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <p>No data found</p>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default TopAlbums;
