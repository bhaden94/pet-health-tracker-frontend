import React, { useState, useEffect } from "react";
import {
    TextField,
    MenuItem,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    Button,
    ButtonGroup
} from "@material-ui/core";
import LineChart from './Charts/LineChart'
import PieChart from './Charts/PieChart'



const Home = () => {
    const [pets, setPets] = useState([])
    const [chosenPet, setChosenPet] = useState({})
    const [currentWorkouts, setCurrentWorkouts] = useState()
    const [tab, setTab] = useState(0)

    const [isLoading, setIsLoading] = useState(false)
    const [showLine, setSowLine] = useState(true)
    const [showTypePie, setShowTypePie] = useState(false)
    const [showIntensityPie, setShowIntensityPie] = useState(false)



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
            <h1>Pet Workout Dashboard</h1>
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
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                        <Button>Duration</Button>
                        <Button>Types</Button>
                        <Button>Intensity</Button>
                    </ButtonGroup>
                    {showLine && <LineChart currentWorkouts={currentWorkouts} />}
                    {showTypePie && <PieChart currentWorkouts={currentWorkouts} intensityOrType="type" />}
                    {showIntensityPie && <PieChart currentWorkouts={currentWorkouts} intensityOrType="intensity" />}
                </div>
            </div>
            }
        </div>
    );
}

export default Home;