import React, { useState, useEffect } from 'react'
import { Chart } from "react-google-charts";
import Variants from '../../../Loader/Skeleton';


const Histogram = ({ data }) => {

  const [chartData, setChartData] = useState([["Model Year", "Count"]]); // Initial data format for the chart
  const [loading, setLoading] = useState(true); // Loading state



  useEffect(() => {
    if (data && data.length > 0) {
      aggregateModelYearData(data);
    } else {
      console.log("No data available"); // Log if no data
      setLoading(false); // Set loading to false if there's no data
    }

  }, [data]);

  const aggregateModelYearData = (vehicleData) => {
    const yearCounts = {};

    // Aggregate the counts for each Model Year
    vehicleData.forEach((vehicle) => {
      const modelYear = vehicle["Model Year"];
      if (!yearCounts[modelYear]) {
        yearCounts[modelYear] = 0;
      }
      yearCounts[modelYear] += 1; // Increment the count for this year
    });

    // Prepare data for the chart
    const newChartData = [["Model Year", "Count"]];
    for (const year in yearCounts) {
      newChartData.push([year, yearCounts[year]]);
    }

    setChartData(newChartData);
    setLoading(false);
  };

  const options = {
    title: " Sales of EV",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Sales",
      minValue: 0,
    },
    vAxis: {
      title: "Model Year",
      format:'string'
    },
  }

  return (
    <div>
      {loading ? ( 
        <Variants />
      ) : (
        <Chart
          chartType="BarChart"
          width="100%"
          height="250px"
          data={chartData}
          options={options}
          legendToggle
        />
      )}
    </div>
  )
}


export default Histogram
