import * as React from 'react';
import { Chart } from "react-google-charts";


export default function PieActiveArc({data}) {

  const aggregateVehicleTypes = (data) => {
    const vehicleCounts = {};

    data.forEach((row) => {
      const evType = row['Electric Vehicle Type']; // Change this to the exact name of your column
      if (evType) {
        vehicleCounts[evType] = (vehicleCounts[evType] || 0) + 1; // Count occurrences of each EV type
      }
    });

    // Prepare data in the format expected by Google Charts
    const formattedData = [['EV Type', 'Count']]; // Initial header
    for (const [key, value] of Object.entries(vehicleCounts)) {
      formattedData.push([key, value]);
    }

    return formattedData;
  };

  // Prepare the data using the aggregate function
  const chartdata = aggregateVehicleTypes(data);



  const options = {
    title: "Electric Vehicle Types",
    pieHole: 0.4, // Creates a Donut Chart. Does not do anything when is3D is enabled
    is3D: true, // Enables 3D view
    // slices: {
    //   1: { offset: 0.2 }, // Explodes the second slice
    // },
    pieStartAngle: 100, // Rotates the chart
    sliceVisibilityThreshold: 0.02, // Hides slices smaller than 2%
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "#233238",
        fontSize: 14,
      },
    },
    colors: ["#8AD1C2", "#9F8AD1", "#D18A99", "#BCD18A", "#D1C28A"],
  };

  return (
   
      <Chart
      chartType="PieChart"
      data={chartdata}
      options={options}
      width="100%"
      height="100%"
    />

    
    
  );
}
