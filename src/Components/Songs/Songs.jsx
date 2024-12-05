import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ImgMediaCard from "../Card/ImgMediaCard"; // Replace with your ImgMediaCard component
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import Grid from "@mui/material/Grid2";
import Song from "./Songs.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Songs() {
  const [genres, setGenres] = useState([]); // Holds genres
  const [selectedTab, setSelectedTab] = useState(""); // Active tab key
  const [songs, setSongs] = useState([]); // Songs for the selected tab
  const [error, setError] = useState(null); // Error state

  // Fetch genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("https://qtify-backend-labs.crio.do/genres");
        console.log(response);
        console.log(response.data.data);
        setGenres(response.data.data);
        setSelectedTab(response.data.data[0]?.key || ""); // Default to the first tab
      } catch (err) {
        console.error("Error fetching genres:", err);
        setError("Failed to fetch genres. Please try again later.");
      }
    };

    fetchGenres();
  }, []);

  // Fetch songs for the selected genre
  useEffect(() => {
    if (selectedTab) {
      const fetchSongs = async () => {
        try {
          const response = await axios.get("https://qtify-backend-labs.crio.do/songs");
          console.log("Full Response:", response);
          console.log("Response Data:", response.data); // Check the structure of response.data
          console.log("Response Data Data:", response.data?.data); 
          const filteredSongs =await response.data.filter((song) => song.genre.key === selectedTab);
          console.log(filteredSongs);
          setSongs(filteredSongs);
        } catch (err) {
          console.error("Error fetching songs:", err);
          setError("Failed to fetch songs. Please try again later.");
        }
      };

      fetchSongs();
    }
  }, [selectedTab]);

  // Handle tab change
  const handleChange = (event, newValue) => {
    setSelectedTab(genres[newValue].key); // Update the active tab key
  };

  return (
    <Box>
      {/* Tabs for Genres */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Grid className="gridOuterTag" container spacing={2}>
        {/* First two items */}
        <Grid item size={{ xs: 12, md: 12 }}>
          <div className="Songs">Songs</div>
        </Grid>
        </Grid >
        <Tabs
          value={genres.findIndex((genre) => genre.key === selectedTab)}
          onChange={handleChange}
          aria-label="dynamic tabs example"
          textColor="inherit"
          indicatorColor="primary"
        >
          {genres.map((genre, index) => (
            <Tab key={genre.key} label={genre.label} sx={{ color: "#FFFFFF" }} />
          ))}
        </Tabs>
      </Box>

      {/* Swiper for Songs */}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        slidesPerView={8}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <SwiperSlide key={index}>
              <ImgMediaCard checkSong={true}  props={song} />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p>No data found</p>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Error Message */}
      {error && <Box sx={{ color: "red", mt: 2 }}>{error}</Box>}
    </Box>
  );
}

export default Songs;
