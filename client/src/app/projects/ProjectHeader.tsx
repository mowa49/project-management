import Header from "@/components/Header";
import {
  Filter,
  Grid,
  Grid3X3,
  List,
  PlusSquare,
  Share2,
  Table,
  Timer,
  TimerResetIcon,
} from "lucide-react";
import React, { useState } from "react";
import ModalNewProject from "./ModalNewProject";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  return (
    <div className="px-4 xl:px-6">
      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />
      <div className="pb-6 pt-5 lg:pb-4 lg:pt-8">
        <Header
          name="Product Design development"
          buttonComponent={
            <button
              className="bg-blue-primary flex items-center rounded-md px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewProjectOpen(true)}
            >
              <PlusSquare className="mr-2 h-5 w-5" /> New Board
            </button>
          }
        />
      </div>
      {/* TABS */}
      <div className="dark:border-stroke-dark flex flex-wrap-reverse gap-10 border-2 border-gray-200 md:items-center">
        <div className="flex flex-1 items-center gap-0 md:gap-4">
          <TabButtons
            name="Board"
            icon={<Grid3X3 className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButtons
            name="List"
            icon={<List className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButtons
            name="Timeline"
            icon={<TimerResetIcon className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButtons
            name="Table"
            icon={<Table className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="tet-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="2-5 h-5" />
          </button>
          <button className="tet-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="2-5 h-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="dark:border-dark-secondarry dark:bg-dark-secondarry rounded-md py-1 pl-8 pr-4 focus:outline-none dark:text-white"
            />
            <Grid3X3 className="l-2 absolute top-2 h-4 pl-1 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
};
const TabButtons = ({
  name,
  icon,
  setActiveTab,
  activeTab,
}: TabButtonProps) => {
  const isActive = activeTab === name;
  return (
    <button
      className={`relative flex items-center justify-center gap-4 px-1 py-4 text-gray-500 transition-all after:absolute after:-bottom-[0px] after:h-[2px] after:w-full hover:text-blue-600 sm:px-2 lg:px-4 dark:text-neutral-100 dark:hover:text-white ${isActive ? "bg-blue-50 text-blue-900 after:bg-blue-600 dark:bg-gray-400 dark:text-white" : ""}`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};
export default ProjectHeader;
