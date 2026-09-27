import { IColumn, ISelectedTask, ITask } from "@/types/Task";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/react";

interface ColumnProps {
    column: IColumn;
    tasks: ITask[];
    key?: string;
    setSelectedTask: ({ activity, task }: ISelectedTask) => void;
}
const Column = (props: ColumnProps) => {
    const { column, tasks, key, setSelectedTask } = props;    
    const { ref, isDropTarget } = useDroppable({
        id: column.id,
    });

    return (
        <div key={key} ref={ref} className={`flex flex-1 w-80 flex-col rounded-lg bg-neutral-100 p-4 ${isDropTarget? 'bg-neutral-200 outline outline-blue-500 outline-dashed' : ''}`}>
            <h2 className="mb-4 font-semibold text-neutral-700">{column.title}</h2>
            <div className="flex flex-col flex-1 gap-4">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} setSelectedTask={setSelectedTask}/>
                ))}
            </div>
        </div>
    )
}

export default Column;