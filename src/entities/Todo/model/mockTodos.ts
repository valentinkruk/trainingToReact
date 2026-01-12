import type { TodoType } from './todoType';

export const mockTodos: TodoType[] = [
	{
		_id: '1',
		title: 'Купить продукты',
		order: 1,
		completed: false,
		description: 'Молоко, хлеб, яйца, фрукты',
		createdAt: '2025-01-05T10:00:00.000Z',
		updatedAt: '2025-01-05T10:00:00.000Z',
	},
	{
		_id: '2',
		title: 'Сделать тренировку',
		order: 2,
		completed: true,
		description: '30 минут кардио и растяжка',
		createdAt: '2025-01-04T18:30:00.000Z',
		updatedAt: '2025-01-04T19:15:00.000Z',
	},
	{
		_id: '3',
		title: 'Прочитать книгу',
		order: 3,
		completed: false,
		description: 'Прочитать 50 страниц художественной литературы',
		createdAt: '2025-01-03T09:00:00.000Z',
		updatedAt: '2025-01-03T09:00:00.000Z',
	},
	{
		_id: '4',
		title: 'Разобрать почту',
		order: 4,
		completed: true,
		description: 'Удалить спам и ответить на важные письма',
		createdAt: '2025-01-02T08:45:00.000Z',
		updatedAt: '2025-01-02T09:10:00.000Z',
	},
	{
		_id: '5',
		title: 'Подготовить отчет',
		order: 5,
		completed: false,
		description: 'Отчет по проекту за текущий месяц',
		createdAt: '2025-01-01T14:20:00.000Z',
		updatedAt: '2025-01-01T14:20:00.000Z',
	},
];
