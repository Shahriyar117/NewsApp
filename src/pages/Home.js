import React, { useEffect, useState } from "react";
import axios from "axios";
import TopNews from "../components/home/TopNews";
import { Stack, Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";

const Home = () => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [topNewsSource, setTopNewsSource] = useState();
  const [topNewsCountry, setTopNewsCountry] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const getDataCountry = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${process.env.REACT_APP_TOP_NEWS_COUNTRY}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      setTopNewsCountry(getDataCountry.data.articles);
      const getDataSource = await axios.get(
        `https://newsapi.org/v2/top-headlines?sources=${process.env.REACT_APP_TOP_NEWS_SOURCE}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      setTopNewsSource(getDataSource.data.articles);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Stack
      className={classes.mediaContainer}
      sx={{
        padding: {
          xs: "24px 14px 24px 14px",
          sm: "44px 14px 44px 14px",
          md: "44px 44px 44px 44px",
          lg: "44px 104px 44px 104px",
        },
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#FEC20C",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <>
          <TopNews
            topNews={topNewsCountry}
            about={process.env.REACT_APP_TOP_NEWS_COUNTRY}
          />
          <TopNews
            topNews={topNewsSource}
            about={process.env.REACT_APP_TOP_NEWS_SOURCE}
          />
        </>
      )}
    </Stack>
  );
};

const useStyles = makeStyles({
  flexGrow: {
    flex: "1",
  },
  mediaContainer: {
    backgroundColor: "#ebecf0",
  },
});

export default Home;
