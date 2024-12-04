import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

 function ImgMediaCard({props}) {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

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
          height: "205px",
          borderRadius: "10px",
          backgroundColor: "#FFFFFF",
         
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={props.image}
        />
        <CardContent
          sx={{ width: "100", height: "23px", borderRadius: "10px" }}
        >
          <Stack direction="row" spacing={1}>
            <Chip
              sx={{ backgroundColor: "#121212", color: "#FFFFFF" }}
              label={props.follows +" Follows"}
              onClick={handleClick}
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
         {props.title}
        </Typography>
      </Card>
    </>
  );}
}

export default ImgMediaCard;