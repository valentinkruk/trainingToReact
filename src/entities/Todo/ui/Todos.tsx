import { Card, CardActions, Checkbox, Stack, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import type { TodoType } from '../model/todoType';
import { mockTodos } from '../model/mockTodos';
import { useState } from 'react';

type TodoProps = {
	todo: TodoType;
	setTodo: (todo: TodoType) => void;
};

// Создали саму карточку, дизайн её
const Todo = ({ todo, setTodo }: TodoProps) => {
	// const {todo} = props

	const handleCheckClick = () => {
		setTodo({ ...todo, completed: !todo.completed });
	};
	return (
		<Card variant="outlined" sx={{ maxWidth: 200 }}>
			<CardContent>
				<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
					{todo.title}
				</Typography>
				<Typography variant="body2">{todo.description}</Typography>
			</CardContent>
			<CardActions>
				<Checkbox checked={todo.completed} onClick={handleCheckClick} />
			</CardActions>
		</Card>
	);
};

const Todos = () => {
	// если в mockTodos указан тип(в нашем случе указан), то не обязательно указывать дженерик <TodoType[]>, т.к. ts уже и так знает что это не один, а несколько массивов
	const [todos, setTodos] = useState<TodoType[]>(mockTodos);
	// Разобрать!!!
	const setTodo = (todo: TodoType) => {
		const updateTodos = todos.map((t) => {
			if (t._id === todo._id) {
				return todo;
			}
			return t;
		});
		setTodos(updateTodos);
	};
	return (
		<Stack flexWrap={'wrap'} spacing={2} direction={'row'}>
			{todos.map((todo) => {
				// <Todo/> так происходит вызов функции
				return <Todo todo={todo} key={todo._id} setTodo={setTodo} />;
			})}
		</Stack>
	);
};

export default Todos;
