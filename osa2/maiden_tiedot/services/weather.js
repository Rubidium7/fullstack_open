import axios from 'axios'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const api_key = import.meta.env.OW_api

const getWeather = (lat, lon) => {
	const request = axios.get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${api_key}`)
	return request.then(response => response.data)
}

export default {getWeather}
