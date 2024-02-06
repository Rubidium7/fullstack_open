import { useState } from 'react'

const Header = ({text}) => {
	return <h1>{text}</h1>
}

const MostVotes = ({anecdotes, index, points}) => {

	if (index == -1)
		return <></>
	return (
		<>
			<p>{anecdotes[index]}</p>
			<p>has {points} votes</p>
		</>
	)
}

const App = () => {
		const anecdotes = [
				'If it hurts, do it more often.',
				'Adding manpower to a late software project makes it later!',
				'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
				'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
				'Premature optimization is the root of all evil.',
				'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
				'Programming without an extremely heave use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
				'The only way to go fast, is to go well.'
		]

		const template_points = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0}

		const [points, setPoints] = useState({ ...template_points })

		const [selected, setSelected] = useState(0)

		const values = Object.values(points)

		const highest = Math.max(...values)

		let index = -1
		for (const key in points) {
			if (points[key] == highest && highest)
				index = key
			if (index != -1)
				break
		}

		const handleClickVote = () => {
			const newPoints = {
				...points,
				[selected]: points[selected] + 1
			}
			setPoints(newPoints)
		}

		const handleClickNext = () => {
			setSelected(Math.floor(Math.random() * 8))
		}

		return (
			<div>
				<Header text="Anecdote of the day" />
				<p>{anecdotes[selected]}</p>
				<p>has {points[selected]} votes</p>
				<button onClick={handleClickVote}>vote</button>
				<button onClick={handleClickNext}>next anecdote</button>
				<Header text="Anecdote with most votes" />
				<MostVotes anecdotes={anecdotes} index={index} points={points[index]}/>
			</div>
		)
}

export default App
