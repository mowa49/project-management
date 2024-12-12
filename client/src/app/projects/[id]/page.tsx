"use client";
import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";
import BoardView from "../BoardView";
import List from "../ListView";
import TimeLine from "../TimeLine";
import TableView from "../TableView";
import ModalNewTask from "@/components/ModalNewTask";

type Props = {
  params: { id: string };
};

const Project = ({ params }: Props) => {
  const { id } = React.use(params);
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  {
    return (
      <div>
        {/* <ModalNewTask isOpen={isOpen} onClose={onCLose} /> */}
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "Board" && (
          <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab === "List" && (
          <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab === "Timeline" && (
          <TimeLine id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {activeTab === "Table" && (
          <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
      </div>
    );
  }
};

export default Project;
