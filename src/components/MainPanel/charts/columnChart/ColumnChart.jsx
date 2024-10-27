import React from "react";
import { Chart } from "react-google-charts";
import Variants from "../../../Loader/Skeleton";

const aggregateVehicleData = (data) => {
  const makerStats = {};

  // Aggregate electric range and vehicle count per maker
  data.forEach((row) => {
    const maker = row["Make"];
    const electricRange = parseFloat(row["Electric Range"]);

    if (!makerStats[maker]) {
      makerStats[maker] = { totalRange: 0, vehicleCount: 0 };
    }

    makerStats[maker].totalRange += electricRange;
    makerStats[maker].vehicleCount += 1;
  });

  // Prepare data in Google Chart format
  const formattedData = [["Maker", "Total Vehicles", "Electric Range", "Maker", "Vehicle Count"]];
  for (const [maker, stats] of Object.entries(makerStats)) {
    formattedData.push([
      maker,
      stats.vehicleCount,
      stats.totalRange / stats.vehicleCount, // Average electric range
      maker,
      stats.vehicleCount,
    ]);
  }

  return formattedData;
};

export const options = {
  title: "Electric Range vs Total Vehicle Counts per Maker",
  hAxis: { title: "Total Vehicle Counts" },
  vAxis: { title: "Average Electric Range" },
  bubble: { textStyle: { fontSize: 11 } },
};

export function ColumnChart({ data }) {
  const [loading, setLoading] = React.useState(true); // Track loading state
  const [chartData, setChartData] = React.useState([])

  React.useEffect(() => {
    if (data && data.length > 0) { // Check if data is not empty
      const aggregatedData = aggregateVehicleData(data);
      setChartData(aggregatedData);
      setLoading(false); // Set loading to false after processing
    }
  
  }, [data]);

  return (
    <>
      {loading ? ( // Check loading state
        <Variants /> // Show loader if loading
      ) : (
        <Chart
          chartType="BubbleChart"
          width="100%"
          height="250px"
          data={chartData}
          options={options}
        />
      )}
    </>
  );
}
