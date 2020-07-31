import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Alert from "@material-ui/lab/Alert";
import MaterialTable from "material-table";

const WorkoutTable = ({ history }) => {
    const [workouts, setWorkouts] = useState([])
    const [rowDataToDelete, setRowDataToDelete] = useState()

    const [isLoading, setIsLoading] = useState(false)
    const [showSuccess, setShowSucess] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)


    const columns = [
        {
            title: "Date & Time",
            field: "date_time",
            render: rowData => new Date(rowData.date_time).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
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
        history.push({
            pathname: '/add_modify',
            state: { ...rowData }
        })
    }

    const deleteWorkout = async (e, rowData) => {
        const requestOptions = {
            method: "DELETE"
        };
        const res = await fetch(`/api/remove_workout/${rowDataToDelete.id}`, requestOptions);
        fetchWorkouts()
        if (res.status === 200) {
            setShowSucess(true)
        } else {
            setShowAlert(true)
        }
        setShowDeleteDialog(false)
        setRowDataToDelete()
    }

    const deleteDialog = (e, rowData) => {
        setRowDataToDelete(rowData)
        setShowDeleteDialog(true)
    }

    const closeDialog = () => {
        setRowDataToDelete()
        setShowDeleteDialog(false)
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
            onClick: deleteDialog
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
            <Dialog
                open={showDeleteDialog}
                onClose={closeDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Workout?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this workout?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={closeDialog} color="primary">
                    Cancel
                </Button>
                <Button onClick={deleteWorkout} color="secondary">
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
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