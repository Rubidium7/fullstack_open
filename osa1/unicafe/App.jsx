import { useState } from 'react'

const Header = ({name}) => {

	return <h1>{name}</h1>
}

const PrintState = ({name, count}) => {

	let end = ""
	if (name == "positive")
		end = " %"
	return <p>{name} {count}{end}</p>
}

const Statistics = ({good, neutral, bad}) => {

	const all = good + neutral + bad
	let average = 0
	let positive = 0
	if (all != 0) {
		average = (good * 1 + bad * -1) / all
		positive = good * 100 / all
	}

	return (
		<div>
		<Header name="statistics" />
		<PrintState name="good" count={good} />
		<PrintState name="neutral" count={neutral} />
		<PrintState name="bad" count={bad} />
		<PrintState name="all" count={all} />
		<PrintState name="average" count={average} />
		<PrintState name="positive" count={positive} />	
		</div>
	)
}

const App = () => {

	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const handleClickGood = () => {
		setGood(good + 1)
	}

	const handleClickNeutral = () => {
		setNeutral(neutral + 1)
	}

	const handleClickBad = () => {
		setBad(bad + 1)
	}
	
	return (
		<div>
			<Header name="give feedback" />
			<button onClick={handleClickGood}>
				good
			</button>
			<button onClick={handleClickNeutral}>
				neutral
			</button>
			<button onClick={handleClickBad}>
				bad
			</button>
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

export default App
