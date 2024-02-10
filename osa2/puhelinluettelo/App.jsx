import {useState} from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	])
	const [newName, setNewName] = useState('')

	const addName = (event) => {
		event.preventDefault()
		
		const found = persons.find(person => person.name == newName)
		if (found != undefined)
			window.alert(`${newName} is already added to the phonebook`)
		else {
			const personObject = { name: newName }
			setPersons(persons.concat(personObject))
			setNewName('')
		}
	}

	const handleTextChange = (event) => {
		console.log(event.target.Value)
		setNewName(event.target.value)
	}

	return (
		<div>
		<h2>Phonebook</h2>
		<form onSubmit={addName}>
			<div>
			name: <input value={newName}
				onChange={handleTextChange}/>
			</div>
			<div>
			<button type="submit">add</button>
			</div>
		</form>
		<h2>Numbers</h2>
			{persons.map(person => <p key={person.name}>{person.name}</p>)}
		</div>
	)
}

export default App

