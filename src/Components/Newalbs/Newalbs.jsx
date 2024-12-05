import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import ImgMediaCard from "../Card/ImgMediaCard";
import axios from "axios";
import Newalb from "./Newalbs.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

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
  const url = "https://qtify-backend-labs.crio.do/albums/new";

  try {
    const response = await axios.get(url);
    return response.data; // Axios stores the JSON response in the `data` property
  } catch (error) {
    console.error("Failed to fetch top albums:", error.message);
    return []; // Return an empty array to handle errors gracefully
  }
}

function Newalbs() {
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
    <Box className="newAlbs" sx={{ flexGrow: 2 }}>
      <Grid className="gridOuterTag" container spacing={2}>
        {/* First two items */}
        <Grid item size={{ xs: 6, md: 6 }}>
          <div className="newaAlbums">New Albums</div>
        </Grid>
        <Grid item size={{ xs: 6, md: 6 }}>
          <div className="showAll" onClick={() => setShowAll(!showAll)}>
            {" "}
            {showAll ? "Collapse" : "Show All"}
          </div>
        </Grid>

        {showAll ? (
          displayedData && displayedData.length > 0 ? (
            displayedData.map((album, index) => (
              <Grid item key={index} xs={12}>
                <ImgMediaCard  checkSong={false} props={album} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <p>No data found</p>
            </Grid>
          )
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={8}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {data && data.length > 0 ? (
              data.map((album, index) => (
                <SwiperSlide key={index}>
                  <ImgMediaCard  checkSong={false} props={album} />
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <p>No data found</p>
              </SwiperSlide>
            )}
          </Swiper>
        )}

        {/* {showAll ? (
          displayedData && displayedData.length > 0 ? (
            displayedData.map((album, index) => (
              <Grid item key={index} xs={12}>
                {console.log("album", album)}
                <ImgMediaCard props={album} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <p>No data found</p>
            </Grid>
          )
        ) : (
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]} // Enable required modules
            spaceBetween={10}
            slidesPerView={7}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {displayedData && displayedData.length > 0 ? (
              displayedData.map((album, index) => (
                <SwiperSlide key={index}>
                  {console.log("album", album)}
                  <ImgMediaCard props={album} /> 
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <Grid item xs={12}>
                  <p>No data found</p>{" "}
                
                </Grid>
              </SwiperSlide>
            )}
          </Swiper>
        )} */}

        {/* <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]} // Enable required modules
          spaceBetween={10}
          slidesPerView={7}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {displayedData && displayedData.length > 0 ? (
            displayedData.map((album, index) => (
              <SwiperSlide key={index}>
                <Grid item xs={12}>
                  {console.log("album", album)}
                  <ImgMediaCard props={album} />
                </Grid>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <Grid item xs={12}>
                <p>No data found</p>{" "}
              </Grid>
            </SwiperSlide>
          )}
        </Swiper> */}

        {/* Dynamic items taking full width */}
        {/* {displayedData && displayedData.length > 0 ? (
          displayedData.map((album, index) => (
            <Grid item key={index} xs={12}>
              {console.log("album", album)}
              <ImgMediaCard props={album} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <p>No data found</p>
          </Grid>
        )} */}
      </Grid>
    </Box>
  );
}

export default Newalbs;
