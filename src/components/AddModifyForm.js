import React, { useState, useEffect } from "react";
import { Typography, Slider, TextField, Button, Icon } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AddModifyForm = ({ data }) => {
  const [id, setId] = useState();
  const [type, setType] = useState("Walk");
  const [dateTime, setDateTime] = useState(new Date());
  const [intensity, setIntensity] = useState(1);
  const [distance, setDistance] = useState("0.0");
  const [pets, setPets] = useState([]);
  const [chosenPet, setChosenPet] = useState();
  const [calories, setCalories] = useState("0");
  const [isLoading, setIsLoading] = useState(false);

  // marks for slider component
  const marks = [
    {
      value: 1,
      label: "Low",
    },
    {
      value: 2,
      label: "Medium",
    },
    {
      value: 3,
      label: "High",
    },
  ];

  const typeProps = {
    options: ["Walk", "Run", "Other"],
  };

  const petsProps = {
    options: pets,
    getOptionLabel: (option) => option.name,
  };

  useEffect(() => {
    async function fetchPets() {
      setIsLoading(true);
      const res = await fetch("/api/pets");
      const json = await res.json();
      setPets(json);
      setIsLoading(false);
    }
    fetchPets();
    if (data) {
      setId(data.id);
      setType(data.type);
      setDateTime(data.dateTime);
      setIntensity(data.intensity);
      setDistance(data.distance);
      setChosenPet(data.chosenPet);
      setCalories(data.calories);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(type, dateTime, intensity, distance, chosenPet, calories);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Autocomplete
            style={{ width: "50%", paddingLeft: "25vw" }}
            {...typeProps}
            id="open-on-focus"
            value={type}
            openOnFocus
            renderInput={(params) => (
              <TextField {...params} label="Workout Type" margin="normal" />
            )}
            onChange={(e) => setType(e.target.innerHTML)}
          />
          <br />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              style={{ width: "50%" }}
              variant="inline"
              ampm={false}
              label="Date & Time"
              value={dateTime}
              format="yyyy/MM/dd hh:mm a"
              onChange={(e) => setDateTime(e)}
            />
          </MuiPickersUtilsProvider>
          <br />
          <div>
            <Typography id="discrete-slider" gutterBottom>
              Workout Intensity
            </Typography>
            <Slider
              style={{ width: "50%" }}
              value={intensity}
              aria-label="discrete-slider"
              step={1}
              marks={marks}
              min={1}
              max={3}
              onChange={(e, value) => setIntensity(value)}
            />
          </div>
          <br />
          <TextField
            style={{ width: "50%" }}
            type="number"
            value={distance}
            inputProps={{ step: ".1", min: "0" }}
            label="Distance in Miles"
            onChange={(e) => setDistance(e.target.value)}
          />
          <br />
          <Autocomplete
            style={{ width: "50%", paddingLeft: "25vw" }}
            {...petsProps}
            id="open-on-focus"
            value={chosenPet}
            openOnFocus
            renderInput={(params) => (
              <TextField {...params} label="Pet" margin="normal" />
            )}
            onChange={(e) =>
              setChosenPet(
                pets.filter((pet) => pet.name === e.target.innerHTML)[0]
              )
            }
          />
          <TextField
            style={{ width: "50%" }}
            type="number"
            value={calories}
            inputProps={{ step: "1", min: "0" }}
            label="Calories Burned"
            onChange={(e) => setCalories(e.target.value)}
          />
          <br />
          <Button
            style={{ width: "50%", marginTop: "30px" }}
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
            type="submit"
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddModifyForm;
