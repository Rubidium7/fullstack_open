import {useState} from 'react'

const App = () => {
	const [persons, setPersons] = useState([{ 
			name: 'Arto Hellas',
			number: '040-1231244'
		}
	])
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
		<form name='phonebookInput' onSubmit={addPerson}>
			<div>
			name: <input autoComplete='off' name='name' value={newName}
				onChange={handleNameChange}/>
			</div>
			<div>
			number: <input autoComplete='off' name='number' value={newNumber}
				onChange={handleNumberChange}/>
			</div>
			<div>
			<button type="submit">add</button>
			</div>
		</form>
		<h2>Numbers</h2>
			{persons.map(person => 
				<p key={person.name}>{person.name} {person.number}</p>)}
		</div>
	)
}

export default App

