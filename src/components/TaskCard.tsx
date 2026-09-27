import { ISelectedTask, ITask } from "@/types/Task";
import { useDraggable } from "@dnd-kit/react";
import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

interface TaskCardProps {
    task: ITask;
    key?: string;
    setSelectedTask: ({ activity, task }: ISelectedTask) => void;
}

const TaskCard = (props: TaskCardProps) => {
    const { task, key, setSelectedTask } = props;
    const { ref } = useDraggable({
        id: task.id,
    });

    const [showDropdown, setShowdropdown] = useState(false)

    return (
        <div key={key} ref={ref} className="flex justify-between cursor-grab rounded-lg bg-white p-4 shadow-sm hover:shadow-md">
            <div>
                <h3 className="font-medium text-neutral-700">{task.title}</h3>
                <p className="mt-2 text-sm text-neutral-500">{task.description}</p>
            </div>
            <div className="cursor-pointer relative h-fit" onMouseEnter={() => setShowdropdown(true)} onMouseLeave={() => setShowdropdown(false)}>
                <HiDotsHorizontal />
                <div className={`absolute right-0 top-0 p-2 w-48 rounded-lg bg-white shadow-md transition-all duration-200 ${showDropdown ? 'flex flex-col' : 'hidden'}`}>
                    <div className="cursor-pointer p-2 rounded-md hover:bg-neutral-100" onMouseDown={() => setSelectedTask({ activity: 'update', task})}>
                        Update
                    </div>
                    <div className="text-red-500 cursor-pointer p-2 rounded-md hover:bg-neutral-100" onMouseDown={() => setSelectedTask({ activity: 'delete', task})}>
                        Delete
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCard;