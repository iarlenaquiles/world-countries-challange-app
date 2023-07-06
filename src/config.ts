const BASE_URL = 'http://localhost:5001/api/weather';

export const getWeather = (country) => `${BASE_URL}?city=${country}`