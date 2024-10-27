import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const xLabels = [
//   'Page A',
//   'Page B',
//   'Page C',
//   'Page D',
//   'Page E',
//   'Page F',
//   'Page G',
// ];

export default function SimpleBarChart({data}) {
  const [aggregatedData, setAggregatedData] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      aggregateVehicleData(data);
    }
  }, [data]);

  // Aggregate vehicle counts by country
  const aggregateVehicleData = (data) => {
    const vehicleCounts = {};
    console.log("Data2",data)
    data.forEach((row) => {
      const country = row['County']; // Adjust the key based on your CSV's structure
      if (country) {
        vehicleCounts[country] = (vehicleCounts[country] || 0) + 1;
      }
    });

    const formattedData = Object.keys(vehicleCounts).map((country) => ({
      label: country,
      value: vehicleCounts[country],
    }));

    setAggregatedData(formattedData);
  };

  // Prepare data for the BarChart
  const xLabels = aggregatedData.map(item => item.label);
  const values = aggregatedData.map(item => item.value);
  return (
    <BarChart
      // width={"1200"}
      height={300}
      series={[{ data: values, label: 'Vehicle Count', id: 'vehicleCountId' }]}
      xAxis={[{ data: xLabels, scaleType: 'band', label: 'Country' }]}
      // yAxis={[{ label: 'Number of Vehicles' }]}
      tooltip={{ enabled: true }}

    />
  );
}
