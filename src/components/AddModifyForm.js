import React, { useState, useEffect } from "react";
import {
    Typography,
    Slider,
    TextField,
    Button,
    Icon,
    MenuItem,
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const AddModifyForm = ({ data }) => {
    const [id, setId] = useState();
    const [type, setType] = useState("Walk");
    const [dateTime, setDateTime] = useState(new Date());
    const [intensity, setIntensity] = useState(1);
    const [distance, setDistance] = useState();
    const [pets, setPets] = useState([]);
    const [chosenPet, setChosenPet] = useState();
    const [calories, setCalories] = useState();
    const [duration, setDuration] = useState();

    const [btnTxt, setBtnTxt] = useState("Submit");
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

    // type of workouts allowed from user
    const types = ["Walk", "Run", "Other"];

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
            setDuration(data.duration);
            setBtnTxt("Update");
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data) {
            console.log("put request would go here");
        } else {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: type,
                    date_time: dateTime,
                    intensity: intensity,
                    calories_burned: calories,
                    distance: distance,
                    pet: chosenPet,
                    workout_duration: duration,
                }),
            };
            const res = await fetch("/api/add_workout", requestOptions);
            const json = await res.json();
            console.log(json);
        }
    };

    return (
        <div className="add-modify-form">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                    <form className="form" onSubmit={handleSubmit} autoComplete="off">
                        <div>
                            <TextField
                                style={{ width: "50%", textAlign: "left" }}
                                select
                                value={type}
                                label="Workout Type"
                                required
                                onChange={(e) => setType(e.target.value)}
                                margin="normal"
                            >
                                {types.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <br />
                        <div>
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
                        </div>
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
                        <div>
                            <TextField
                                style={{ width: "50%" }}
                                type="number"
                                value={distance}
                                inputProps={{ step: ".1", min: "0" }}
                                label="Distance in Miles"
                                onChange={(e) => setDistance(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <TextField
                                style={{ width: "50%" }}
                                type="number"
                                value={duration}
                                required
                                inputProps={{ step: "1", min: "0" }}
                                label="Workout Duration in Minutes"
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <TextField
                                style={{ width: "50%", textAlign: "left" }}
                                select
                                value={chosenPet}
                                label="Pet"
                                required
                                onChange={(e) =>
                                    setChosenPet(
                                        pets.filter((pet) => pet.name === e.target.value)[0]
                                    )
                                }
                                margin="normal"
                            >
                                {pets.map((option, index) => (
                                    <MenuItem key={index} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <br />
                        <div>
                            <TextField
                                style={{ width: "50%" }}
                                type="number"
                                value={calories}
                                inputProps={{ step: "1", min: "0" }}
                                label="Calories Burned"
                                onChange={(e) => setCalories(e.target.value)}
                            />
                        </div>
                        <br />
                        <div>
                            <Button
                                style={{ width: "50%", marginTop: "30px" }}
                                variant="contained"
                                color="primary"
                                endIcon={<Icon>send</Icon>}
                                type="submit"
                            >
                                {btnTxt}
                            </Button>
                        </div>
                    </form>
                )}
        </div>
    );
};

export default AddModifyForm;
