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

const DisplayCountries = ({filter, countries}) => {

	if (!filter)
		return
	else if (countries.length > 10)
		return <p>Too many matches, specify another filter</p>
	return (
		<>
			{countries.map(country => {
				return <p key={country.name.common}>{country.name.common}</p>
			})}
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
					return country.name.common.toLowerCase().includes(countryFilter)
				}))
			})
	}, [countryFilter])

	const handleCountryFilterChange = (event) => {
		console.log(event.target.value)
		setCountryFilter(event.target.value)
	}

	return (
		<div>
		<CountryForm country={countryFilter}
			handler={handleCountryFilterChange}/>
		<DisplayCountries filter={countryFilter} countries={countries} />
		</div>
	)
}

export default App
