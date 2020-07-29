import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";

const WorkoutTable = ({ history }) => {
    const [workouts, setWorkouts] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const [showSuccess, setShowSucess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);


    const columns = [
        {
            title: "Date & Time",
            field: "date_time",
            render: rowData => new Date(rowData.date_time).toLocaleString('en-US', {dateStyle:'medium', timeStyle: 'short'})
        },
        {
            title: "Pet Name",
            field: "pet.name"
        },
        {
            title: "Workout Type",
            field: "type"
        },
        {
            title: "Duration (minutes)",
            field: "workout_duration",
            type: "numeric"
        }
    ]

    const editWorkout = (e, rowData) => {
        console.log(rowData)
        history.push({
            pathname: '/add_modify',
            state: { ...rowData }
        })
    }

    const deleteWorkout = async (e, rowData) => {
        const requestOptions = {
            method: "DELETE"
        };
        const res = await fetch(`/api/remove_workout/${rowData.id}`, requestOptions);
        fetchWorkouts()
        if(res.status === 200) {
            setShowSucess(true)
        } else {
            setShowAlert(true)
        }
    }

    const actions = [
        {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: editWorkout
        },
        {
            icon: 'delete',
            tooltip: 'Delete',
            onClick: deleteWorkout
        }
    ]
    async function fetchWorkouts() {
        setIsLoading(true);
        const res = await fetch("/api/workouts");
        const json = await res.json();
        setWorkouts(json);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const snackBarClose = (e, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setShowSucess(false)
        setShowAlert(false)
    }

    return (
        <div className="workout-table">
            <h1>Workouts</h1>
            {isLoading ? <CircularProgress size={50} color="primary" /> :
                <MaterialTable
                    columns={columns}
                    data={workouts}
                    actions={actions}
                    title="Workouts"
                />
            }
            <Snackbar open={showSuccess} autoHideDuration={5000} onClose={snackBarClose}>
                <Alert onClose={snackBarClose} severity="success">Sucess!</Alert>
            </Snackbar>
            <Snackbar open={showAlert} autoHideDuration={5000} onClose={snackBarClose}>
                <Alert onClose={snackBarClose} severity="error">Something went wrong, please try again</Alert>
            </Snackbar>
        </div>
    );
}

export default withRouter(WorkoutTable);