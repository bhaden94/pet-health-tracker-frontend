import React, {useState, useEffect} from "react";

import { ResponsivePie } from '@nivo/pie'


const PieChart = ({currentWorkouts, intensityOrType}) => {
    const [graphData, setGraphData] = useState([])
    const [label1, setLabel1] = useState()
    const [label2, setLabel2] = useState()
    const [label3, setLabel3] = useState()

    useEffect(() => {
        if (currentWorkouts) {
            let value1 = [];
            let value2 = [];
            let value3 = [];
            if(intensityOrType === 'type') {
                setLabel1("Walk")
                setLabel2("Run")
                setLabel3("Other")
                currentWorkouts.forEach(workout => {
                    if (workout.type.toLowerCase() === 'walk') {
                        value1.push(workout)
                    } else if (workout.type.toLowerCase() === 'run') {
                        value2.push(workout)
                    } else {
                        value3.push(workout)
                    }
                })
            } else {
                setLabel1("Low")
                setLabel2("Medium")
                setLabel3("High")
                currentWorkouts.forEach(workout => {
                    if (workout.intensity === 1) {
                    value1.push(workout)
                } else if (workout.intensity === 2) {
                    value2.push(workout)
                } else {
                    value3.push(workout)
                }
                })
            }

            const pieData = [
                {
                    id: label1,
                    label: label1,
                    value: Math.round((value1.length * 100 / currentWorkouts.length)),
                },
                {
                    id: label2,
                    label: label2,
                    value: Math.round((value2.length * 100 / currentWorkouts.length)),
                },
                {
                    id: label3,
                    label: label3,
                    value: Math.round((value3.length * 100 / currentWorkouts.length)),
                }
            ]
            setGraphData(pieData)
        }
    }, [currentWorkouts, intensityOrType, label1, label2, label3])

    return ( 
        <ResponsivePie
            data={graphData}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            sortByValue={true}
            innerRadius={0.05}
            padAngle={1}
            cornerRadius={5}
            colors={{ scheme: 'category10' }}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', '0' ] ] }}
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor={{ from: 'color' }}
            sliceLabel={function(e){return e.value + '%'}}
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#fff"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            legends={[]}
        />
     );
}
 
export default PieChart;