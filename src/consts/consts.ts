const API_KEY = "QbygCGPnVCTCdDMm9JU2ipKOwnCSPJij&q";
export const GET_CITIES_URL = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}=`;
export const GET_WEATHER_URL = (cityKey) => `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}&details=true`;
export const MONGO_URI='mongodb+srv://tal:talp123@cluster0.hy1hx.mongodb.net/?retryWrites=true&w=majority'
