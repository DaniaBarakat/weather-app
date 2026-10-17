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
import 'moment/min/locales';
import { useTranslation } from 'react-i18next';

const theme = createTheme({
  typography: {
    fontFamily: 'IBM',
  },
});

function getWeatherTranslationKey(conditionId) {
  if (conditionId >= 200 && conditionId < 300) return 'weather.thunderstorm';
  if (conditionId >= 300 && conditionId < 400) return 'weather.drizzle';
  if (conditionId >= 500 && conditionId < 600) return 'weather.rain';
  if (conditionId >= 600 && conditionId < 700) return 'weather.snow';

  const atmosphericConditions = {
    701: 'weather.mist',
    711: 'weather.smoke',
    721: 'weather.haze',
    731: 'weather.dust',
    741: 'weather.fog',
    751: 'weather.sand',
    761: 'weather.dust',
    762: 'weather.ash',
    771: 'weather.squalls',
    781: 'weather.tornado',
    800: 'weather.clear',
    801: 'weather.fewClouds',
    802: 'weather.scatteredClouds',
    803: 'weather.brokenClouds',
    804: 'weather.overcast',
  };

  return atmosphericConditions[conditionId] || null;
}

function App() {
  const { t, i18n } = useTranslation(); // Use the useTranslation hooks
  const language = i18n.resolvedLanguage || i18n.language;

  // ======== STATES ======== //
  const [dataAndTime, setDataAndTime] = useState('');
  const [temp, setTemp] = useState({
    number: null,
    description: '',
    conditionId: null,
    icon: null,
    min: null,
    max: null,
  });
  // ======== EVENT HANDLER ======== //
  function handleLanguageClick() {
    i18n.changeLanguage(language === 'ar' ? 'en' : 'ar');
  }

  useEffect(() => {
    const updateClock = () => {
      setDataAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
    };

    moment.locale(language);
    updateClock();
    const clockInterval = window.setInterval(updateClock, 1000);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    return () => window.clearInterval(clockInterval);
  }, [language]);

  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance

    axios
      .get('/api/weather', { signal: controller.signal })
      .then(function (response) {
        // handle success
        const responseTemp = Math.round(response.data.main.temp - 273.15); // Convert from Kelvin to Celsius
        const min = Math.round(response.data.main.temp_min - 273.15);
        const max = Math.round(response.data.main.temp_max - 273.15);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        const conditionId = response.data.weather[0].id;
        setTemp({
          number: responseTemp,
          description: description,
          conditionId: conditionId,
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
              dir={language === 'ar' ? 'rtl' : 'ltr'}
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
                  dir={language === 'ar' ? 'rtl' : 'ltr'}
                >
                  <Typography variant="h2" style={{ marginRight: '20px', fontWeight: '600' }}>
                    {t('city')}
                  </Typography>

                  <Typography variant="h5" style={{ marginInlineStart: '20px' }}>
                    {dataAndTime}
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
                      <Typography variant="h1" style={{ textAlign: 'start' }}>
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

                    <Typography variant="h6">
                      {temp.conditionId
                        ? t(getWeatherTranslationKey(temp.conditionId), {
                            defaultValue: temp.description,
                          })
                        : temp.description}
                    </Typography>
                    {/* MIN & MAX */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <h5>
                        {' '}
                        {t('min')}: {temp.min}{' '}
                      </h5>
                      <h5 style={{ margin: '0 5px' }}> | </h5>
                      <h5>
                        {' '}
                        {t('max')}: {temp.max}{' '}
                      </h5>
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
              dir={language === 'ar' ? 'rtl' : 'ltr'}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: language === 'ar' ? 'end' : 'start',
                marginTop: '20px',
              }}
            >
              <Button onClick={handleLanguageClick} style={{ color: 'white' }} variant="text">
                {t('languageButton')}
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
