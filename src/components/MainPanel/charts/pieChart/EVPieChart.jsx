import React from 'react'
import { Chart } from "react-google-charts";

const EVPieChart = ({data}) => {

  //function to aggragate MSRP 

  const aggregateMSRP = (data) => {
    const msrpCounts = {
      "Below $20,000": 0,
      "$20,000 - $40,000": 0,
      "$40,000 - $60,000": 0,
      "$60,000 - $80,000": 0,
      "Above $80,000": 0,
    };

    data.forEach(row => {
      const msrp = parseFloat(row['Base MSRP']); // Ensure you replace 'MSRP' with the exact column name in your CSV
      
      if (!isNaN(msrp)) {
        if (msrp < 20000) {
          msrpCounts["Below $20,000"] += 1;
        } else if (msrp >= 20000 && msrp < 40000) {
          msrpCounts["$20,000 - $40,000"] += 1;
        } else if (msrp >= 40000 && msrp < 60000) {
          msrpCounts["$40,000 - $60,000"] += 1;
        } else if (msrp >= 60000 && msrp < 80000) {
          msrpCounts["$60,000 - $80,000"] += 1;
        } else {
          msrpCounts["Above $80,000"] += 1;
        }
      }
    });

    // Prepare data in the format expected by Google Charts
    const formattedData = [['Price Range', 'Count']]; // Initial header
    for (const [key, value] of Object.entries(msrpCounts)) {
      formattedData.push([key, value]);
    }

    return formattedData;
  };

  // Aggregate the MSRP data
  const aggregatedData = aggregateMSRP(data); // This variable holds the aggregated data

   

      const options = {
        title: "Base MSRP Distribution",
        pieHole: 0.4,
        is3D: false,
      };
  return (
    
        <Chart
      chartType="PieChart"
      // width={1200}
      // height="100%"
      data={aggregatedData}
      options={options}
    />
      
    
  )
}

export default EVPieChart




