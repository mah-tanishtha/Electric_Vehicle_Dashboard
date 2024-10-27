import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';


export default function Cards({data}) {
  
  const { icon, label, value, backgroundColor} = data;
  console.log(data)
 
  return (
  
    <Card sx={{  backgroundColor:{backgroundColor}, margin:2}}>
      <CardActionArea sx={{ pt:2}}>
        { icon }
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { label }
          </Typography>
          <Typography variant="h5" sx={{ color: 'text.secondary' }}>
            { value } 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
