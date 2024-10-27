import React ,{useState,useEffect} from 'react'
import { Chart } from "react-google-charts";


const Histogram = ({data}) => {

  const [chartData, setChartData] = useState([["Model Year", "Count"]]); // Initial data format for the chart

  useEffect(() => {
    if (data) {
      aggregateModelYearData(data);
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
        },}

  return (
    <div>
       <Chart
      chartType="BarChart"
      width="100%"
      height="250px"
      data={chartData}
      options={options}
      legendToggle
    />
    </div>
  )
}


export default Histogram
