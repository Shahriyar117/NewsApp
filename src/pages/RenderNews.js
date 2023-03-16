import React, { useEffect, useState } from "react";
import {
  Stack,
  Typography,
  Box,
  imageListItemClasses,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import NewsCard from "../components/news/NewsCard";
import axios from "axios";
import SearchBox from "../components/news/Search";
import { useParams } from "react-router-dom";

const RenderNews = () => {
  const sortByArray = [
    { name: "Recent First", value: "publishedAt" },
    { name: "Popular", value: "popularity" },
  ];
  const params = useParams();
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState();
  const [selected, setSelected] = useState(sortByArray[0].value);
  const [search, setSearch] = useState("all");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // const getData = await axios.get(
      //   `https://newsapi.org/v2/everything?q=${search}&from=2023-02-15&sortBy=${selected}&pageSize=${pageSize}&page=${totalPages}&apiKey=5affcbc2c62140c08c3d822eed933afd`
      // );
      const getData = await axios.get(
        `https://newsapi.org/v2/everything?q=${search}&from=2023-02-15&sortBy=${selected}&category=${params.name}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      setNewsData(getData.data.articles);
      setIsLoading(false);
      //setSearch(getData.data.articles);
    };
    fetchData();
  }, [selected, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setSelected(value);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "20vh",
          backgroundColor: "black",
        }}
      >
        <Typography
          variant="h3"
          component={"h6"}
          sx={{
            fontWeight: 900,
            textAlign: { xs: "center", sm: "left" },
            color: "white",
          }}
        >
          The News
        </Typography>
      </Box>
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
        <Grid
          container
          md={12}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <SearchBox handleSearchChange={handleSearchChange} />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Box sx={{ bgcolor: "white" }}>
              <Select value={selected} size="small" onChange={handleSortChange}>
                {sortByArray.map((list) => (
                  <MenuItem
                    key={list.name}
                    value={list.value}
                    sx={{ fontSize: "14px" }}
                  >
                    {list.name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>
        </Grid>

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
          <Box
            sx={{
              backgroundColor: "transparent",
              mt: 2,
              display: "grid",
              gap: 1,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              [`& .${imageListItemClasses.root}`]: {
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            {newsData.map((news) => (
              <NewsCard item={news} />
            ))}
          </Box>
        )}
        {/* <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          position="bottom"
          sx={{ mt: 1 }}
        >
          <Typography sx={{ fontSize: "14px" }}>
            Showing 1-10 of 100 items
          </Typography>
          <TablePagination
            component="div"
            count={totalPages}
            page={0}
            //onPageChange={handleChangePage}
            rowsPerPage={10}
            //onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box> */}
      </Stack>
    </>
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
export default RenderNews;
