import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    ar: {
      translation: {
        city: 'العيزرية',
        min: 'الصغرى',
        max: 'الكبرى',
        languageButton: 'English',
        weather: {
          thunderstorm: 'عاصفة رعدية',
          drizzle: 'رذاذ',
          rain: 'مطر',
          snow: 'ثلج',
          mist: 'ضباب خفيف',
          smoke: 'دخان',
          haze: 'شبورة',
          dust: 'غبار',
          fog: 'ضباب',
          sand: 'عاصفة رملية',
          ash: 'رماد بركاني',
          squalls: 'رياح عاصفة',
          tornado: 'إعصار',
          clear: 'سماء صافية',
          fewClouds: 'غيوم قليلة',
          scatteredClouds: 'غيوم متفرقة',
          brokenClouds: 'غيوم متقطعة',
          overcast: 'سماء ملبدة بالغيوم',
        },
      },
    },
    en: {
      translation: {
        city: 'Al-Eizariya',
        min: 'Low',
        max: 'High',
        languageButton: 'العربية',
        weather: {
          thunderstorm: 'Thunderstorm',
          drizzle: 'Drizzle',
          rain: 'Rain',
          snow: 'Snow',
          mist: 'Mist',
          smoke: 'Smoke',
          haze: 'Haze',
          dust: 'Dust',
          fog: 'Fog',
          sand: 'Sandstorm',
          ash: 'Volcanic ash',
          squalls: 'Squalls',
          tornado: 'Tornado',
          clear: 'Clear sky',
          fewClouds: 'Few clouds',
          scatteredClouds: 'Scattered clouds',
          brokenClouds: 'Broken clouds',
          overcast: 'Overcast clouds',
        },
      },
    },
  },
  lng: 'ar',
  fallbackLng: 'en',
  supportedLngs: ['ar', 'en'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
