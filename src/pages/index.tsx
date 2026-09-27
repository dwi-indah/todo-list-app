import Button from "@/components/Button";
import Column from "@/components/Column";
import ModalConfirm from "@/components/ModalConfirm";
import ModalTask from "@/components/ModalTask";
import { COLUMNS } from "@/constants/Task.constants";
import { ITask } from "@/types/Task";
import { DragDropProvider, DragEndEvent } from '@dnd-kit/react';
import { describe } from "node:test";
import { useEffect, useState, SubmitEvent } from "react";

const App = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<{
    activity: string;
    task: ITask;
  } | null > (null)

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateTask = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newTask: ITask = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      status: 'TODO',
    }

    setTasks((prevTasks) => [...prevTasks, newTask]);

    event.currentTarget.reset();
    setShowModal(false);
  }

  const handleUpdateTask = (event:SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const updatedTask: ITask = {
      id: selectedTask?.task?.id as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      status: selectedTask?.task?.status as ITask['status'],
    };

    setTasks((prevTask) => 
      prevTask.map((task) => task.id === updatedTask.id ? updatedTask : task)
    )

    event.currentTarget.reset();
    setSelectedTask(null)
  }

  const handleDeleteTask = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== selectedTask?.task.id))
    setSelectedTask(null)
  }

  const handleDragEnd = ( event: DragEndEvent) => {
    const { source, target } = event.operation;
    if(!target) return;

    const taskId = source?.id as string;
    const newStatus = target.id as ITask['status'];

    setTasks((prevTasks) => 
      prevTasks.map((task) => 
        task.id === taskId ?
        { ...task,
          status: newStatus ,
        } : task,
      )
    )

  }
  return (
    <main className="min-h-screen p-4 flex flex-col">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-700">
          Task Management
        </h1>
        <Button onClick={() => setShowModal(true)}>Add Task</Button>
      </div>
      <div className="flex gap-8 flex-1">
        <DragDropProvider onDragEnd={handleDragEnd}>
        {COLUMNS.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={tasks.filter((task) => task.status === column.id)}
            setSelectedTask={setSelectedTask}
          />
        ))}
        </DragDropProvider>
      </div>
      {showModal && <ModalTask onCancel={() => setShowModal(false)} onSubmit={handleCreateTask}/>}

      {selectedTask?.activity === 'update' && (
        <ModalTask onSubmit={handleUpdateTask} onCancel={() => setSelectedTask(null)} selectedTask={selectedTask.task} type="Update" />
      )}

      {selectedTask?.activity === 'delete' && (
        <ModalConfirm 
        onConfirm={handleDeleteTask} 
        onCancel={() => setSelectedTask(null)} 
        title="Delete Task"
        message="Are you sure want to delete this task"
        type="Delete" />
      )}
    </main>
  );
}

export default App;