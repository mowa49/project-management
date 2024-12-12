import Modal from "@/components/Modal";
import { useCreateTaskMutation } from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewTask = ({ isOpen, onClose }: Props) => {
  const [createTask] = useCreateTaskMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAutherUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");

  const handleSubmit = async () => {
    if (!title || !startDate || !dueDate) return;

    const formatedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formatedDueDate = formatISO(new Date(dueDate), {
      representation: "complete",
    });
    await createTask({
      title: title,
      description,
      startDate: formatedStartDate,
      dueDate: formatedDueDate,
      tags,
    });
  };

  const isFormValid = () => {
    return TaskName && description && startDate && endDate;
  };

  const inputStyle =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyle}
          placeholder="Task Name"
          value={TaskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <textarea
          className={inputStyle}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyle}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyle}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className={`bg-blue-primary focus-offset-2 mt-4 flex w-full justify-center rounded-md border-transparent px-4 py-2 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Creating" : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
