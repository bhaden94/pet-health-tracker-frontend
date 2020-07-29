import React, { useState, useEffect } from 'react';
import {withRouter} from "react-router-dom";
import MaterialTable from "material-table";

const WorkoutTable = ({history}) => {
    const [workouts, setWorkouts] = useState([])

    const [isLoading, setIsLoading] = useState(false)


    const columns = [
        {
            title: "Date & Time",
            field: "date_time"
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
            state: {...rowData}
        })
    }

    const deleteWorkout = (e, rowData) => {
        console.log(rowData.id)
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

    useEffect(() => {
        async function fetchWorkouts() {
            setIsLoading(true);
            const res = await fetch("/api/workouts");
            const json = await res.json();
            console.log(json)
            setWorkouts(json);
            setIsLoading(false);
        }
        fetchWorkouts();
    }, []);

    return ( 
        <div className="workout-table">
        <h1>Workouts</h1>
            <MaterialTable
            columns={columns}
            data={workouts}
            actions={actions}
            title="Workouts"
            />
      </div>
     );
}
 
export default withRouter(WorkoutTable);