import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

// React
import React, { useState, useEffect } from 'react';
// Material UI COMPONENTS
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// EXTERNAL LIBRARIES
import axios from 'axios';
import moment from 'moment';
import "moment/min/locales"; // Import moment locales
moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: 'IBM',
  },
});

function App() {
  const dateAndTime = moment().format('MMMM Do YYYY, h:mm:ss a'); // Get current date and time in the desired format
  
  const [dataAndTime, setDataAndTime] = useState(dateAndTime);
  const [temp, setTemp] = useState({
    number: null,
    description: '',
    icon: '',
    min: null,
    max: null,
  });

  useEffect(() => {
    setDataAndTime(moment().format('MMMM Do YYYY, h:mm:ss a')); // Update the date and time format
    const controller = new AbortController(); // Create an AbortController instance

    axios
      .get(
        'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=a022d9f3ddc42b43948f94b5baeba68a',
        { signal: controller.signal },
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 273.15); // Convert from Kelvin to Celsius
        const min = Math.round(response.data.main.temp_min - 273.15);
        const max = Math.round(response.data.main.temp_max - 273.15);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        setTemp({
          number: responseTemp,
          description: description,
          icon: icon,
          min: min,
          max: max,
        });
      })
      .catch(function (error) {
        if (!axios.isCancel(error) && error.name !== 'CanceledError') {
          console.error('Error fetching weather data:', error);
        }
      });
    return () => {
      controller.abort(); // Cancel this effect's request on cleanup
    };
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          {/* CONTENT CONTAINER */}
          <div
            style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {/* CARD */}
            <div
              dir="rtl"
              style={{
                width: '100%',
                background: 'rgb(28 52 91 / 36%)',
                color: 'white',
                padding: '10px',
                borderRadius: '15px',
                boxShadow: '0px 11px 1px rgba(0,0,0,0.05)',
              }}
            >
              {/* CONTENT */}
              <div>
                {/* CITY & TIME */}
                <div
                  style={{ display: 'flex', alignItems: 'end', justifyContent: 'start' }}
                  dir="rtl"
                >
                  <Typography variant="h2" style={{ marginRight: '20px', fontWeight: '600' }}>
                    فلسطين
                  </Typography>

                  <Typography variant="h5" style={{ marginRight: '20px' }}>
                    {dateAndTime}
                  </Typography>
                </div>
                {/* == CITY & TIME == */}

                <hr />

                {/*CONTAINER OF DEGREE + CLOUD ICON */}
                <div
                  style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
                >
                  {/* DEGREE & DESCRIPTION */}
                  <div>
                    {/* TEMP */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Typography variant="h1" style={{ textAlign: 'right' }}>
                        {temp?.number}°
                      </Typography>
                      {temp.icon && (
                        <img
                          src={`https://openweathermap.org/img/wn/${temp.icon}@2x.png`}
                          alt={temp.description || 'Weather condition'}
                          style={{ width: '120px', height: '120px', objectFit: 'contain' }}
                        />
                      )}
                    </div>
                    {/* == TEMP == */}

                    <Typography variant="h6">{temp.description}</Typography>
                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <h5> الصغرى: {temp.min} </h5>
                      <h5 style={{ margin: '0 5px' }}> | </h5>
                      <h5> الكبرى: {temp.max} </h5>
                    </div>
                    {/* == MIN & MAX == */}
                  </div>
                  {/* == DEGREE & DESCRIPTION == */}
                </div>
                {/* == CONTAINER OF DEGREE + CLOUD ICON == */}
              </div>
              {/* == CONTENT == */}
            </div>
            {/*c== CARD ==c*/}

            {/* TRANSLATION CONTAINER */}
            <div
              dir="rtl"
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'end',
                marginTop: '20px',
              }}
            >
              <Button style={{ color: 'white' }} variant="text">
                إنجليزي
              </Button>
            </div>
            {/* == TRANSLATION CONTAINER == */}
          </div>
          {/* == CONTENT CONTAINER == */}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
