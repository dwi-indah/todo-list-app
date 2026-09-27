import { IColumn, ITask } from "@/types/Task";

const COLUMNS: IColumn[] = [
    {
        id: 'TODO',
        title: 'To Do'
    },
    {
        id: 'IN_PROGRESS',
        title: 'In Progress'
    },
    {
        id: 'DONE',
        title: 'Done'
    }
]

const INITIAL_TASKS: ITask[] = [
    {
        id: '1',
        title: 'Research React',
        description: 'Learn about React and its ecosystem.',
        status: 'TODO'
    },
    {
        id: '2',
        title: 'Set up project structure',
        description: 'Create a basic project structure for the application.',
        status: 'IN_PROGRESS'
    },
    {
        id: '3',
        title: 'Implement task management features',
        description: 'Develop features for adding, editing, and deleting tasks.',
        status: 'DONE'
    }
]

export { COLUMNS, INITIAL_TASKS };