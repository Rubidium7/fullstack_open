import { useState } from 'react'

const Header = ({name}) => {

	return <h1>{name}</h1>
}

const Button = ({command, name}) => {

	return (
		<>
		<button onClick={command}>
			{name}
		</button>
		</>
	)
}

const StatisticLine = ({text, value}) => {

	let end = ""
	if (text == "positive")
		end = " %"
	return <p>{text} {value}{end}</p>
}

const Statistics = ({good, neutral, bad}) => {

	const all = good + neutral + bad
	if (!all)
		return <p>No feedback given</p>
	const average = (good * 1 + bad * -1) / all
	const positive = good * 100 / all

	return (
		<div>
		<StatisticLine text="good" value={good} />
		<StatisticLine text="neutral" value={neutral} />
		<StatisticLine text="bad" value={bad} />
		<StatisticLine text="all" value={all} />
		<StatisticLine text="average" value={average} />
		<StatisticLine text="positive" value={positive} />	
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
			<Button command={handleClickGood} name="good" />
			<Button command={handleClickNeutral} name="neutral" />
			<Button command={handleClickBad} name="bad" />
			<Header name="statistics" />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

export default App
