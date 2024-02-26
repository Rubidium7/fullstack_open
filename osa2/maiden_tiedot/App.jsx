import {useState, useEffect} from 'react'
import countryService from './services/countries'

const CountryForm = ({country, handler}) => {
	return (
		<form>
			<div>
			find countries <input autoComplete='off' name='filter'
					value={country}	onChange={handler}/>
			</div>
		</form>
	)
}

const DisplayOneCountry = ({country}) => {
	const languages = Object.values(country.languages)
	let capital
	if (!country.capital)
		capital = '>NOT FOUND<'
	else
		capital = country.capital.at(0)
	return (
		<>
		<h1>{country.name.common}</h1>
		<p>capital {capital}</p>
		<p>area {country.area}</p>
		<p><strong>languages:</strong></p>	
		<ul>
			{languages.map(language => <li key={language}>{language}</li>)}
		</ul>
		<img src={country.flags.png}/>
		</>
	)
}

const DisplayCountries = ({filter, countries, handler}) => {

	if (!filter)
		return
	else if (countries.length > 10)
		return <p>Too many matches, specify another filter</p>
	else if (countries.length === 1)
		return <DisplayOneCountry country={countries.at(0)} />
	return (
		<>
			{countries.map(country => {
				return (
					<div key={country.name.common}>
						<p>{country.name.common}</p>
						<button onClick={() => handler(country.name.common)}>show</button>
					</div>
				)})}
		</>
	)
}

const App = () => {
	const [countryFilter, setCountryFilter] = useState('')
	const [countries, setCountries] = useState([])
	
	useEffect(() => {
		countryService
			.getAll()
			.then(response => {
				setCountries(response.filter(country => {
					return country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
				}))
			})
	}, [countryFilter])

	const handleCountryFilterChange = (event) => {
		console.log(event.target.value)
		setCountryFilter(event.target.value)
	}

	const changeFilter = (country) => {
		console.log(country)
		setCountryFilter(country)
	}

	return (
		<div>
		<CountryForm country={countryFilter}
			handler={handleCountryFilterChange}/>
		<DisplayCountries filter={countryFilter} countries={countries}
			handler={changeFilter}/>
		</div>
	)
}

export default App
