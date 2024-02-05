import { useState } from 'react'

const Header = ({name}) => {

	return <h1>{name}</h1>
}

const PrintState = ({name, count}) => {

	return <p>{name} {count}</p>
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
			<Header name="statistics" />
			<PrintState name="good" count={good} />
			<PrintState name="neutral" count={neutral} />
			<PrintState name="bad" count={bad} />
		</div>
	)
}

export default App
