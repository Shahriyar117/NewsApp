import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import MainFeaturedPost from "../components/random/MainFeaturedNews";
import FeaturedPost from "../components/random/FeaturedNews";
import Main from "../components/random/Main";
import Sidebar from "../components/random/Sidebar";
import { Stack } from "@mui/material";
import data from "../news.json";
import { useParams } from "react-router-dom";

export default function NewsDetail() {
  const params = useParams();
  const [news, setNews] = useState(
    data.articles.filter((news) => news._id === params.id)[0]
  );
  console.log(news);

  return (
    <Stack
      sx={{
        padding: {
          xs: "24px 14px 24px 14px",
          sm: "44px 14px 44px 14px",
          md: "44px 44px 44px 44px",
          lg: "44px 104px 44px 104px",
        },
      }}
    >
      <MainFeaturedPost post={news} />
      {/* <Grid container spacing={4}>
        {featuredPosts.map((post) => (
          <FeaturedPost key={post.title} post={post} />
        ))}
      </Grid> */}
      <Grid container spacing={5} sx={{ mt: 3 }}>
        <Main news={news} />
        <Sidebar post={news} />
      </Grid>
    </Stack>
  );
}
