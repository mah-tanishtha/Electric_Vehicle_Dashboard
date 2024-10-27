import * as React from 'react';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import InsightsIcon from '@mui/icons-material/Insights';
import Cards from './parts/Cards';
import Papa from 'papaparse';


export default function ActionAreaCard() {

    const [cardList, setCardList] = React.useState([]);

    const vehicleDataCSV = '/data/Electric_Vehicle_Population_Data.csv';

    React.useEffect(() => {
        fetch(vehicleDataCSV)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then((data) => {
                Papa.parse(data, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (result) => {
                        console.log("Parsed CSV Data:", result.data);
                        const transformedData = transformCSVData(result.data);
                        setCardList(transformedData);
                    },
                    error: (error) => console.error('Error loading CSV:', error),
                });
            })
            .catch(error => console.error('Error fetching the CSV file:', error));
    }, []);


    //getting card data from CSV file 

    const transformCSVData = (data) => {
        //total vehicles 
        const totalVehicles = data.length;
         
       


        // Most common vehicle make
        const makeCounts = {};
        data.forEach(vehicle => {
            const make = vehicle.Make; 
            if (make) {
                makeCounts[make] = (makeCounts[make] || 0) + 1;
            }
        });
        const mostCommonMake = Object.entries(makeCounts).reduce((a, b) => a[1] > b[1] ? a : b, [null, 0])[0];
        console.log(mostCommonMake,"Tmake")

        //most common model make
        const modelCounts = {};
        data.forEach(vehicle => {
            const model = vehicle.Model; 
            if (model) {
                modelCounts[model] = (modelCounts[model] || 0) + 1;
            }
        });
        const mostCommonModelMake = Object.entries(modelCounts).reduce((a, b) => a[1] > b[1] ? a : b, [null, 0])[0];
        console.log(mostCommonModelMake,"Tmake")

        
        // state with the most vehicles
        const countryCounts = {};
        data.forEach(vehicle => {
            const country = vehicle.County; 
            if (country) {
                countryCounts[country] = (countryCounts[country] || 0) + 1;
            }
        });

        const mostVehiclesCountry = Object.entries(countryCounts).reduce((a, b) => a[1] > b[1] ? a : b, [null, 0]);
        console.log("VEh",mostVehiclesCountry)
   
   
       return  [
        {
            id: "1",
            name: "Card 1",
            icon: <ElectricCarIcon />,
            label: "Total Electric Vehicles",
            value: totalVehicles,
            backgroundColor: "#ea80fc"


        },
        {
            id: "2",
            name: "Card 2",
            icon: <AddBusinessIcon />,
            label: "Most Common Vehicle Make",
            value: mostCommonMake,
            backgroundColor: "#ffd180"


        },
        {
            id: "3",
            name: "Card 3",
            icon: <ThumbUpAltIcon />,
            label: "Most Common Model Make",
            value: mostCommonModelMake,
            backgroundColor: "#ccff90"


        },
        {
            id: "4",
            name: "Card 4",
            icon: <InsightsIcon />,
            label: "Country with Most Vehicles",
            value: mostVehiclesCountry[0],
            backgroundColor: "Lightpink"


        }
    ]
    }
    
    return (
        <>
            {
                cardList.map((data) => (
                    <Cards data={data} key={data.id || data.VIN} />
                ))
            }
        </>

    );
}
