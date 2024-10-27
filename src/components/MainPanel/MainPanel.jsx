import React, { useState, useEffect } from 'react'
import './styles/MainPanel.css'
import CardInfo from '../MainPanel/CardInfo'
import BarChart from '../MainPanel/charts/barchart/BarChart'
import { Paper } from '@mui/material'
import PieActiveArc from './charts/pieChart/PieChart'
import EVPieChart from './charts/pieChart/EVPieChart'
import { ColumnChart } from './charts/columnChart/ColumnChart'
import Histogram from './charts/histogram/Histogram'
import Papa from 'papaparse'
import VehicleTable from '../EVTable/Table'
import CityChart from './charts/barchart/CityChart'


const MainPanel = () => {
  // const [data, setData] = useState([]);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const fetchCSVData = async () => {
      const response = await fetch('/data/Electric_Vehicle_Population_Data.csv');
      const textData = await response.text();

      Papa.parse(textData, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log('Parsed CSV Data:', results.data); // Log the parsed data
          setCsvData(results.data); 
        },
      });
    };

    fetchCSVData();
  }, []);

  console.log("CSV", csvData)
  // if (loading) return <Loader />;
  return (
    <div className='mainpanel-container'>
      <h2 className='dash-heading'>DASHBOARD</h2>
      <div className='card-container'>
        <CardInfo />
      </div>

      {/* Chart for country and city */}

      <div className='location-container p-3'>
        <div className='country-container'>
          <Paper elevation={3} >
            <h2>Country-Wise Distribution</h2>
            <BarChart data={csvData} />
          </Paper>
        </div>

        <div className='map-container'>
          <Paper elevation={10} padding={10} square={false}>
            <h2>City-Wise Distribution</h2>
            <CityChart data={csvData}/>
          </Paper>
        </div>

      </div>

      <div className='Pie-chart-container p-3'>
        <div className='EVType-container'>
          <Paper elevation={10}>
            <h2>MSRP Distribution</h2>
            <EVPieChart data={csvData} />
          </Paper>
        </div>

        <div className='BaseMSVP-container'>
          <Paper elevation={10}>
            <h2>EV-Type Distribution</h2>
            <PieActiveArc data={csvData} />
          </Paper>
        </div>

      </div>

      <div className='Line-Range-container p-3'>
        <div className='Line-container'>
          <Paper elevation={10}>
            <h2>EV Sales Based on Model Year</h2>
            <Histogram data={csvData} />
          </Paper>

        </div>
        <div className='Electric-range-chart'>
          <Paper elevation={10}>
            <h2>Electric Range Distribution</h2>
            <ColumnChart data={csvData} />
          </Paper>

        </div>

      </div>

      <div className='EvContainer m-2 pb-3'>
        <Paper elevation={10} sx={{"paddingBottom":"2px"}}>
          <h1>EV Table Details</h1>
          <div className='Ev-Table-Container m-2'>
            <VehicleTable data={csvData} />
          </div>
        </Paper>

      </div>
    </div>
  )
}

export default MainPanel
