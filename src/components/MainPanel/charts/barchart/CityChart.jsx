import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function CityChart({ data }) {
  const [aggregatedData, setAggregatedData] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      aggregateVehicleData(data);
    }
  }, [data]);

  // Aggregate vehicle counts by city
  const aggregateVehicleData = (data) => {
    const vehicleCounts = {};
    console.log("Data2", data);

    data.forEach((row) => {
      const city = row['City']; // Adjusted key to use 'City'
      if (city) {
        vehicleCounts[city] = (vehicleCounts[city] || 0) + 1;
      }
    });

    const formattedData = Object.keys(vehicleCounts).map((city) => ({
      label: city,
      value: vehicleCounts[city],
    }));

    setAggregatedData(formattedData);
  };

  // Prepare data for the BarChart
  const xLabels = aggregatedData.map(item => item.label);
  const values = aggregatedData.map(item => item.value);

  return (
    <BarChart
    //   maxWidth="300px"
    //   maxHeight="300px"
    height={300}
    // width={"1200"}
      series={[{ data: values, label: 'Vehicle Count', id: 'vehicleCountId' }]}
      xAxis={[{ data: xLabels, scaleType: 'band', label: 'City' }]} // Changed label to 'City'
    //   yAxis={[{ label: 'Number of Vehicles' }]}
      tooltip={{ enabled: true }}
    />
  );
}
