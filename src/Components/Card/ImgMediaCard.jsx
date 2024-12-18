import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

 function ImgMediaCard({checkSong , props}) {
  console.log(checkSong);
  if(!props) {
   return(<>
    <div>no data found</div>
   </>)
  }
 else {
  console.log(props.id)
  return (
    <>
      <Card
        sx={{
          width: "159px",
          height: "230px",
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
          cursor:"pointer"
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="170"
          image={props.image}
        />
        <CardContent
          sx={{ width: "100", height: "23px", borderRadius: "10px" }}
        >
          <Stack direction="row" spacing={1}>
            <Chip
              sx={{ backgroundColor: "#121212", color: "#FFFFFF" ,cursor:"pointer" }}
              label={checkSong ? props.likes : props.follows +" Follows"}
            />
          </Stack>
        </CardContent>
      </Card>

      <Card
        sx={{
          width: "159px",
          borderRadius: "10px",
          backgroundColor: "#121212",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Poppins",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "21px",
            textAlign: "left",
            textUnderlinePosition: "from-font",
            textDecorationSkipInk: "none",
            color: "#FFFFFF",
            backgroundColor: "#121212",
            paddingTop:'10px',
            paddingLeft:'5px'
          }}
        >
         { props.title}
        </Typography>
      </Card>
    </>
  );}
}

export default ImgMediaCard;