import React, {useState, useEffect} from "react";

import { ResponsiveLine } from '@nivo/line'


const LineChart = ({currentWorkouts}) => {
    const [graphData, setGraphData] = useState([])

    useEffect(() => {
        if (currentWorkouts) {
            const xyData = currentWorkouts.map(workout => {
                const dateTime = new Date(workout.date_time).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
                return {
                    x: dateTime,
                    y: workout.workout_duration
                }
            })
            setGraphData([
                {
                    data: xyData
                }
            ])
        }
    }, [currentWorkouts])

    return ( 
        <ResponsiveLine
            data={graphData}
            margin={{ top: 30, right: 55, bottom: 70, left: 55 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Workout Duration (minutes)',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={{ scheme: 'category10' }}
            pointSize={10}
            pointColor={{ from: 'color', modifiers: [] }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[]}
        />
     );
}
 
export default LineChart;