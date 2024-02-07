
const Header = (props) => {
	return <h1>{props.course}</h1>
}

const Part = (props) => {
	return <p>{props.part.name} {props.part.exercises}</p>
}

const Content = ({parts}) => {
	return (
		<>
			{parts.map(part =>
				<Part key={part.id} part={part} />
			)}
		</>
	)
}

const Total = ({parts}) => {
	
	const result = parts.map(parts => parts.exercises).reduce((total, added) => total + added)

	return (
		<>
			<p><b>total of {result} exercises</b></p>
		</>
	)
}

const Course = ({course}) => {
	return (
		<>
			<Header course={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</>
	)
}

const App = () => {
	const course = {
		name: 'Half Stack application development',
		id: 1,
		parts: [
		{
			name: 'Fundamentals of React',
			exercises: 10,
			id: 1
		},
		{
			name: 'Using props to pass data',
			exercises: 7,
			id: 2
		},
		{
			name: 'State of a component',
			exercises: 14,
			id: 3
		}
		]
	}

	return (
		<div>
			<Course course={course} />
		</div>
	)
}

export default App
