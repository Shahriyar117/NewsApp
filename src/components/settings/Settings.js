import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DropDownCheckbox from "./DropDownCheckbox";
import { Box, Grid, Slide, TextField } from "@mui/material";
import { connect } from "react-redux";
import { setPreferences } from "../../redux/actions";
import DropDown from "./DropDown";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const categoriesData = [
  {
    id: 1,
    name: "business",
    value: "business",
  },
  {
    id: 2,
    name: "entertainment",
    value: "entertainment",
  },
  {
    id: 3,
    name: "general",
    value: "general",
  },
  { name: "health", value: "health" },
  {
    id: 4,
    name: "science",
    value: "science",
  },
  { id: 5, name: "sports", value: "sports" },
  {
    id: 6,
    name: "technology",
    value: "technology",
  },
];

const countriesData = [
  {
    id: 1,
    name: "USA",
    value: "us",
  },
  {
    id: 2,
    name: "UAE",
    value: "ua",
  },
  {
    id: 3,
    name: "Pakistan",
    value: "pk",
  },
];
const languageData = [
  {
    id: 1,
    name: "English",
    value: "en",
  },
  {
    id: 2,
    name: "Afericans",
    value: "af",
  },
  {
    id: 3,
    name: "Arebic",
    value: "ar",
  },
];
const SettingsDialog = ({
  setPreference,
  handleClose,
  open,
  country,
  language,
}) => {
  const [sources, setSources] = useState([]);
  const [countrySelected, setCountrySelected] = useState(country);
  const [languageSelected, setLanguageSelected] = useState(language);
  const [categorySelected, setCategorySelected] = useState(language);

  const handleSetSources = (value) => {
    setSources(value);
  };
  const handleSetCountry = (value) => {
    setCountrySelected(value);
  };
  const handleSetLanguage = (value) => {
    setLanguageSelected(value);
  };
  const handleSetCategory = (value) => {
    setCategorySelected(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userPreferences = {
      category: categorySelected,
      country: countrySelected,
      language: languageSelected,
    };
    console.log(userPreferences);
    setPreference(userPreferences);
    handleClose();
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="Preference"
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>Prefrences</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "90%" }}>
              <DropDown
                title={"Country"}
                selected={countrySelected}
                data={countriesData}
                handleSelected={handleSetCountry}
              />
              <DropDown
                title={"Language"}
                selected={languageSelected}
                data={languageData}
                handleSelected={handleSetLanguage}
              />
              <DropDown
                title={"Category"}
                selected={categorySelected}
                data={categoriesData}
                handleSelected={handleSetCategory}
              />
            </Box>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            color: "black",
            cursor: "pointer",
            "&:hover": { backgroundColor: "#FEC20C" },
          }}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          sx={{
            backgroundColor: "#FEC20C",
            color: "black",
            cursor: "pointer",
            "&:hover": { backgroundColor: "black", color: "white" },
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
const msp = ({ preference }) => ({
  category: preference.category,
  country: preference.country,
  language: preference.language,
});
const mdp = (dispatch) => ({
  setPreference: (category, country, language) =>
    dispatch(setPreferences(category, country, language)),
});

export default connect(msp, mdp)(SettingsDialog);
