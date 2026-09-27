import { SubmitEvent } from "react";
import Button from "./Button";
import { ITask } from "@/types/Task";

    interface ModalTaskProps {
        type?: 'Add' | 'Update';
        selectedTask?: ITask;
        onCancel: () => void;
        onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
    }

    const ModalTask = (props: ModalTaskProps) => {
    const { selectedTask, onCancel, onSubmit, type = 'Add' } = props;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg text-neutral-700 font-bold">{type} Task</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <label htmlFor="title" className="flex flex-col gap-1">
                        <span className="font-semibold text-neutral-600">Title</span>
                        <input
                            type="text"
                            placeholder="Insert Task Title"
                            className="rounded-lg border border-neutral-300 p-2"
                            name="title"
                            id="title"
                            required
                            defaultValue={selectedTask?.title}
                        />
                    </label>
                    <label htmlFor="description" className="flex flex-col gap-1">
                        <span className="font-semibold text-neutral-600">Description</span>
                        <textarea 
                            placeholder="Insert Task Description"
                            className="rounded-lg resize-none border border-neutral-300 p-2"
                            name="description"
                            id="description"
                            required
                            defaultValue={selectedTask?.description}
                        />
                    </label>
                    <div className="flex w-full items-center justify-end gap-2">
                        <Button type="button" onClick={onCancel} className="bg-neutral-300 text-neutral-700 hover:bg-neutral-400">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600">
                            {type} Task
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default ModalTask;