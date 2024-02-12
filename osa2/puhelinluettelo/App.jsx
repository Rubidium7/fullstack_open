import {useState} from 'react'

const Filter = ({filter, handler}) => {
		return (
		<form>
			<div>
			filter shown with <input autoComplete='off' name='filter'
				value={filter} onChange={handler}/>
			</div>
		</form>
		)
}

const PersonForm = ({addPerson, name, nameHandler, number, numberHandler}) => {
	return (
		<form onSubmit={addPerson}>
			<div>
			name: <input autoComplete='off' name='name' value={name}
				onChange={nameHandler}/>
			</div>
			<div>
			number: <input autoComplete='off' name='number' value={number}
				onChange={numberHandler}/>
			</div>
			<div>
			<button type="submit">add</button>
			</div>
		</form>
	)
}

const Persons = ({persons, filter}) => {
	return (
			<>
			{persons.map((person) => {
				if (!person.name.toLowerCase().includes(filter.toLowerCase()))
					return
				else
					return <p key={person.name}>{person.name} {person.number}</p>
			})}
			</>
	)
}

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-1231244' },
		{ name: 'Ada Lovelace', number: '39-44-5323523' },
		{ name: 'Dan Abramov', number: '12-43-234345' },
		{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	])

	const [newFilter, setNewFilter] = useState('')
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')

	const addPerson = (event) => {
		event.preventDefault()
		
		const found = persons.find(person => person.name == newName)
		if (newName == '' || newNumber == '')
			window.alert('fill both fields')
		else if (found != undefined)
			window.alert(`${newName} is already added to the phonebook`)
		else {
			const personObject = { name: newName, number: newNumber }
			setPersons(persons.concat(personObject))
			setNewName('')
			setNewNumber('')
		}
	}

	const handleFilterChange = (event) => {
		console.log(event.target.Value)
		setNewFilter(event.target.value)
	}

	const handleNameChange = (event) => {
		console.log(event.target.Value)
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		console.log(event.target.Value)
		setNewNumber(event.target.value)
	}

	return (
		<div>
		<h2>Phonebook</h2>
		
		<Filter filter={newFilter} handler={handleFilterChange}/>

		<h3>Add a new</h3>
		
		<PersonForm addPerson={addPerson}
			name={newName} nameHandler={handleNameChange} 
			number={newNumber} numberHandler={handleNumberChange}/>
		
		<h3>Numbers</h3>
		
		<Persons persons={persons} filter={newFilter}/>
		</div>
	)
}

export default App

