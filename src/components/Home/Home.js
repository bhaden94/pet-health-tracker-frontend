import React, { useState, useEffect } from "react";
import {
    TextField,
    MenuItem,
    ListItemIcon,
    ListItemText,
    CircularProgress,
    Paper,
    Tabs,
    Tab
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

    const chartChange = (event, newValue) => {
        const tabClicked = event.target.innerHTML
        if (tabClicked === 'Duration') {
            setSowLine(true)
            setShowTypePie(false)
            setShowIntensityPie(false)
        } else if (tabClicked === 'Types') {
            setSowLine(false)
            setShowTypePie(true)
            setShowIntensityPie(false)
        } else {
            setSowLine(false)
            setShowTypePie(false)
            setShowIntensityPie(true)
        }
        setTab(newValue)
    }

    return (
        <div className="home">
            <h1>Pet Workout Dashboard</h1>
            {isLoading ? <CircularProgress size={50} color="primary" /> :
                <div>
                    <div className="chart-pet">
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
                                            style={{ width: "50px" }}
                                            alt="dog"
                                            src={option.picture_url}
                                        />
                                    </ListItemIcon>
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="chart">
                        <Paper>
                            <Tabs
                                value={tab}
                                onChange={chartChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                            >
                                <Tab label="Duration" />
                                <Tab label="Types" />
                                <Tab label="Intensity" />
                            </Tabs>
                        </Paper>
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