import React, { useState, useEffect } from "react";
import {
    TextField,
    MenuItem,
    ListItemIcon,
    ListItemText,
    CircularProgress
} from "@material-ui/core";
import LineChart from './LineChart'


const Home = () => {
    const [pets, setPets] = useState([])
    const [chosenPet, setChosenPet] = useState({})
    const [currentWorkouts, setCurrentWorkouts] = useState()
    const [graphData, setGraphData] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (currentWorkouts) {
            const xyData = currentWorkouts.map(workout => {
                const dateTime = new Date(workout.date_time).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
                return {
                    x: dateTime,
                    y: workout.workout_duration
                }
            })
            if (chosenPet) {
                setGraphData([
                    {
                        id: chosenPet.name,
                        data: xyData
                    }
                ])
            }
        }
    }, [currentWorkouts])

    const fetchWorkouts = async () => {
        if (chosenPet) {
            setIsLoading(true)
            const res = await fetch(`/api/workouts/pet/${chosenPet.id}`)
            const json = await res.json()
            setCurrentWorkouts(json)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchWorkouts()
    }, [chosenPet])

    const createGraphData = () => {
        setChosenPet(pets[0])
    }

    useEffect(() => {
        createGraphData()
    }, [pets])

    useEffect(() => {
        async function fetchPets() {
            setIsLoading(true);
            const res = await fetch("/api/pets");
            const json = await res.json();
            setPets(json);
            setIsLoading(false);
        }
        fetchPets();
    }, []);

    return (
        <div className="home">
            <h1>Your Dashboard</h1>
            {isLoading ? <CircularProgress size={50} color="primary" /> : 
            <div>
                <div className="chart-pet">
                    <TextField
                        className="pet-input"
                        inline
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
                <div className="chart">
                    <LineChart graphData={graphData} />
                </div>
            </div>
            }
        </div>
    );
}

export default Home;