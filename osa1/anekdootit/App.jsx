import { useState } from 'react'

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
				<p>{anecdotes[selected]}</p>
				<p>has {points[selected]} votes</p>
				<button onClick={handleClickVote}>vote</button>
				<button onClick={handleClickNext}>next anecdote</button>
			</div>
		)
}

export default App
