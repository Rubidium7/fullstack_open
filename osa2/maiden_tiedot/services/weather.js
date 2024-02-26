import axios from 'axios'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const imgUrl = 'https://openweathermap.org/img/wn'
const api_key = import.meta.env.OW_api

const getWeather = (lat, lon) => {
	console.log(api_key)
	const request = axios.get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${api_key}`)
	return request.then(response => response.data)
}

const getImg = id => {
	const request = axios.get(`${imgUrl}/${id}@2x.png`)
	return request.then(response => response.data)
}

export default {getWeather, getImg}
