import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
    Typography,
    Slider,
    TextField,
    Button,
    Icon,
    MenuItem,
    ListItemIcon,
    ListItemText,
    CircularProgress
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const AddModifyForm = (props) => {
    const [id, setId] = useState();
    const [type, setType] = useState("Walk");
    const [dateTime, setDateTime] = useState(new Date());
    const [intensity, setIntensity] = useState(1);
    const [distance, setDistance] = useState();
    const [pets, setPets] = useState([]);
    const [chosenPet, setChosenPet] = useState();
    const [calories, setCalories] = useState();
    const [duration, setDuration] = useState();

    const [btnHeadingTxt, setBtnHeadingTxt] = useState("Add");
    const [btnIcon, setBtnIcon] = useState("add")
    const [isLoading, setIsLoading] = useState(false);
    const [postLoading, setPostLoading] = useState(false)

    const location = useLocation();

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

    useEffect(() => {
        async function fetchPets() {
            setIsLoading(true);
            const res = await fetch("/api/pets");
            const json = await res.json();
            setPets(json);
            setIsLoading(false);
        }
        fetchPets();
        // console.log(location.state.pet, pets)
        if (location.state) {
            setId(location.state.id);
            setType(location.state.type);
            setDateTime(location.state.date_time);
            setIntensity(location.state.intensity);
            setDistance(location.state.distance);
            setChosenPet(location.state.pet)
            setCalories(location.state.calories_burned);
            setDuration(location.state.workout_duration);
            setBtnHeadingTxt("Update");
            setBtnIcon("update")
        }
    }, [props]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (btnHeadingTxt === "Update") {
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
            setPostLoading(true)
            const res = await fetch("/api/add_workout", requestOptions);
            const json = await res.json();
            setPostLoading(false)
        }
    };

    return (
        <div className="add-modify-form">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                    <div>
                        <h1>{btnHeadingTxt} Workout</h1>
                        <form className="form" onSubmit={handleSubmit} autoComplete="off">
                            <div className="form-item">
                                <TextField
                                    className="pet-input"
                                    select
                                    value={chosenPet ? chosenPet.name : ""}
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
                                            <ListItemText primary={option.name} />
                                            <ListItemIcon>
                                                <img
                                                    style={{ width: "40px" }}
                                                    alt="dog"
                                                    src="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"
                                                />
                                            </ListItemIcon>
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="form-item">
                                <TextField
                                    className="type-input"
                                    select
                                    value={type}
                                    label="Workout Type"
                                    required
                                    onChange={(e) => setType(e.target.value)}
                                    margin="normal"
                                >
                                    {types.map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            <ListItemText primary={option} />
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <br />
                            <div className="form-item">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDateTimePicker
                                        className="date-time-input"
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
                            <div className="form-item">
                                <Typography className="slider-input">
                                    Workout Intensity
                                </Typography>
                                <Slider
                                    className="form-slider"
                                    value={intensity}
                                    step={1}
                                    marks={marks}
                                    min={1}
                                    max={3}
                                    onChange={(e, value) => setIntensity(value)}
                                />
                            </div>
                            <br />
                            <div className="distance-input form-item">
                                <TextField
                                    type="number"
                                    value={distance}
                                    inputProps={{ step: ".1", min: "0" }}
                                    label="Distance in Miles"
                                    onChange={(e) => setDistance(e.target.value)}
                                />
                            </div>
                            <br />
                            <div className="duration-input form-item">
                                <TextField
                                    type="number"
                                    value={duration}
                                    required
                                    inputProps={{ step: "1", min: "0" }}
                                    label="Workout Duration in Minutes"
                                    onChange={(e) => setDuration(e.target.value)}
                                />
                            </div>
                            <br />

                            <br />
                            <div className="calorie-input form-item">
                                <TextField
                                    type="number"
                                    value={calories}
                                    inputProps={{ step: "1", min: "0" }}
                                    label="Calories Burned"
                                    onChange={(e) => setCalories(e.target.value)}
                                />
                            </div>
                            <br />
                            <div className="form-item submit">
                                <Button
                                    className="submit-btn"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    disabled={postLoading}
                                    endIcon={<Icon>{btnIcon}</Icon>}
                                    type="submit"
                                >
                                    {btnHeadingTxt}
                                </Button>
                                {postLoading && <CircularProgress size={24} color="primary" className="post-loading" />}
                            </div>
                        </form>
                    </div>
                )}
        </div>
    );
};

export default AddModifyForm;
