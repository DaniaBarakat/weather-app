import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

// React
import React, { useState, useEffect } from 'react';
// Material UI COMPONENTS
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import axios from 'axios';
const theme = createTheme({
  typography: {
    fontFamily: 'IBM',
  },
});

let cancelAxios = null

function App() {
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    axios
      .get(
        'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=a022d9f3ddc42b43948f94b5baeba68a',
        {cancelToken: new axios.CancelToken((c) => (window.axiosCancel = c))}
      )
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 273.15); // Convert from Kelvin to Celsius
        setTemp(responseTemp);
      })
      .catch(function (error) {
        console.error('Error fetching weather data:', error);
      });
      return () => {
        if (window.axiosCancel) {
          window.axiosCancel(); // Cancel the request if the component unmounts
          }
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
                    الإثنين ١٠:٣٠ ص
                  </Typography>
                </div>
                {/* == CITY & TIME == */}

                <hr />

                {/*CONTAINER OF DEGREE + CLOUD ICON */}
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  {/* DEGREE & DESCRIPTION */}
                  <div>
                    {/* TEMP */}
                    <div>
                      <Typography variant="h1" style={{ textAlign: 'right' }}>
                        {temp}°
                      </Typography>

                      {/* TODO: TEMP IMAGE */}
                    </div>
                    {/* == TEMP == */}

                    <Typography variant="h6">BROKEN CLOUDS</Typography>
                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <h5> الصغرى: 25° </h5>
                      <h5 style={{ margin: '0 5px' }}> | </h5>
                      <h5> الكبرى: 35° </h5>
                    </div>
                    {/* == MIN & MAX == */}
                  </div>
                  {/* == DEGREE & DESCRIPTION == */}

                  <CloudIcon style={{ fontSize: '200px', color: 'white' }} />
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
