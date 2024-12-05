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
import { CircularProgress } from "@mui/material";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Songs() {
  const [genres, setGenres] = useState([]); // Holds genres
  const [selectedTab, setSelectedTab] = useState("All"); // Active tab key, default to "All"
  const [songs, setSongs] = useState([]); // Songs for the selected tab
  const [allSongs, setAllSongs] = useState([]); // All songs from the API
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch genres on mount
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("https://qtify-backend-labs.crio.do/genres");
        setGenres(response.data.data);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setError("Failed to fetch genres. Please try again later.");
      }
    };

    fetchGenres();
  }, []);

  // Fetch all songs on mount
  useEffect(() => {
    const fetchAllSongs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://qtify-backend-labs.crio.do/songs");
        setAllSongs(response.data);
        setSongs(response.data); // Initially show all songs
      } catch (err) {
        console.error("Error fetching songs:", err);
        setError("Failed to fetch songs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllSongs();
  }, []);

  // Update songs when the selected tab changes
  useEffect(() => {
    if (selectedTab === "All") {
      setSongs(allSongs); // Show all songs
    } else {
      const filteredSongs = allSongs.filter((song) => song.genre.key === selectedTab);
      setSongs(filteredSongs);
    }
  }, [selectedTab, allSongs]);

  // Handle tab change
  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      setSelectedTab("All"); // Handle "All"
    } else {
      setSelectedTab(genres[newValue - 1]?.key || ""); // Adjust for "All" at index 0
    }
  };

  return (
    <Box>
      {/* Tabs for Genres */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Grid className="gridOuterTag" container spacing={2}>
          <Grid item size={{ xs: 12, md: 12 }}>
            <div className="Songs">Songs</div>
          </Grid>
        </Grid>
        <Tabs
          value={selectedTab === "All" ? 0 : genres.findIndex((genre) => genre.key === selectedTab) + 1}
          onChange={handleChange}
          aria-label="dynamic tabs example"
          textColor="inherit"
          indicatorColor="primary"
        >
          <Tab key="All" label="All" sx={{ color: "#FFFFFF" }} />
          {genres.map((genre, index) => (
            <Tab key={genre.key} label={genre.label} sx={{ color: "#FFFFFF" }} />
          ))}
        </Tabs>
      </Box>

      {/* Swiper for Songs */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
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
                <ImgMediaCard checkSong={true} props={song} />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <p>No data found</p>
            </SwiperSlide>
          )}
        </Swiper>
      )}

      {/* Error Message */}
      {error && <Box sx={{ color: "red", mt: 2 }}>{error}</Box>}
    </Box>
  );
}

export default Songs;
