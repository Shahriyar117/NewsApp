import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBox from "../../components/news/Search";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import {
  Stack,
  Box,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import RenderNews from "../../components/news/RenderNews";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import SettingsDialog from "../../components/settings/Settings";
import { connect } from "react-redux";
import DropDownCheckbox from "../../components/settings/DropDownCheckbox";

const sortByArray = [
  { name: "Recent First", value: "publishedAt" },
  { name: "Popular", value: "popularity" },
];
const searchBy = [
  { name: "Search By Category", value: "searchCategory" },
  { name: "Search By Source", value: "searchSource" },
];

const sourcesData = [
  {
    id: 1,
    name: "BBC NEWS",
    value: "bbc-news",
  },
  {
    id: 2,
    name: "ABC NEWS",
    value: "abc-news",
  },
];

const AllNews = ({ country, language, category }) => {
  const classes = useStyles();
  const location = useLocation();
  const filterNews = location.pathname.split("/")[1];

  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState();
  const [selected, setSelected] = useState(sortByArray[0].value);
  const [selectedSearch, setSelectedSearch] = useState(searchBy[0].value);
  const [sources, setSources] = useState([]);
  const [search, setSearch] = useState("all");
  const [pageSize, setPageSize] = useState(20);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      let getData;
      setIsLoading(true);
      if (filterNews === "topNews") {
        if (selectedSearch === "searchCategory") {
          getData = await axios.get(
            `https://newsapi.org/v2/top-headlines?q=${search}&sortBy=${selected}&pageSize=${pageSize}&country=${country}&category=${category}&language=${language}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
          );
        } else {
          const allSources = sources.map((x) => x.value);
          getData = await axios.get(
            `https://newsapi.org/v2/top-headlines?sources=${allSources.toString()}&q=${search}&sortBy=${selected}&pageSize=${pageSize}&apiKey=${
              process.env.REACT_APP_NEWS_API_KEY
            }`
          );
        }
      } else {
        getData = await axios.get(
          `https://newsapi.org/v2/everything?q=${search}&sortBy=${selected}&pageSize=${pageSize}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
      }

      setNewsData(getData.data.articles);
      setIsLoading(false);
    };
    fetchData();
  }, [
    selected,
    search,
    pageSize,
    filterNews,
    country,
    language,
    category,
    sources,
    selectedSearch,
  ]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setSelected(value);
  };

  const handleSelectedSearchChange = (e) => {
    const { value } = e.target;
    setSelectedSearch(value);
  };

  const handleSetSources = (value) => {
    setSources(value);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setPageSize(pageSize + 20);
  };

  return (
    <>
      <SettingsDialog open={open} handleClose={handleClose} />
      {filterNews !== "topNews" && <Header title={"The News"} />}
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
        {filterNews === "topNews" && (
          <Grid
            container
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Select
              value={selectedSearch}
              size="small"
              onChange={handleSelectedSearchChange}
              border="none"
              sx={{ width: { xs: "95vw", md: "60vw" } }}
            >
              {searchBy.map((list) => (
                <MenuItem
                  key={list.name}
                  value={list.value}
                  sx={{ fontSize: "14px" }}
                >
                  {list.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        )}
        {selectedSearch === "searchSource" && (
          <Grid
            container
            xs={12}
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DropDownCheckbox
              title={"Sources"}
              data={sourcesData}
              value={sources}
              handleSet={handleSetSources}
            />
          </Grid>
        )}

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
            {filterNews === "topNews" &&
              selectedSearch === "searchCategory" && (
                <Box
                  sx={{
                    ml: 1,
                    p: 1,
                    display: "flex",
                  }}
                >
                  <SettingsSuggestIcon
                    onClick={handleClickOpen}
                    sx={{
                      color: "black",
                      width: { xs: "30px", md: "50px" },
                      fontSize: { xs: "12px", md: "14px" },
                      height: { xs: "30px", md: "40px" },
                      borderColor: "black",
                      "&:hover": { color: "#FEC20C", cursor: "pointer" },
                    }}
                  />
                </Box>
              )}
          </Grid>
        </Grid>
        <RenderNews
          isLoading={isLoading}
          newsData={newsData}
          pageSize={pageSize}
          handleLoadMore={handleLoadMore}
        />
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
const msp = ({ preference }) => ({
  category: preference.category,
  country: preference.country,
  language: preference.language,
});
const mdp = (dispatch) => ({});

export default connect(msp, mdp)(AllNews);
