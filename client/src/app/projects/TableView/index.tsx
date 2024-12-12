import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { dataGridClassNames, dataGridSxStyle } from "@/lib/utils";
import { useGetTaskQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TableView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTaskQuery({ projectId: Number(id) });

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      width: 100,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        // <span
        //   className={`inline-flex rounded-full ${params.value === "To Do" ? "bg-green-200 text-green-800" : params.value === "Work In Progress" ? "bg-red-300 text-red-900" : ""} px-3 text-xs font-semibold leading-5`}
        // >
        <span
          className={`inline-flex rounded-full bg-blue-200 px-3 py-1 text-xs font-semibold leading-5 text-blue-800`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "priority",
      headerName: "Priority",
      width: 75,
    },
    {
      field: "tags",
      headerName: "tags",
      width: 130,
    },
    {
      field: "startDate",
      headerName: "startDate",
      width: 130,
    },
    {
      field: "dueDate",
      headerName: "DueDate",
      width: 130,
    },
    {
      field: "author",
      headerName: "Author",
      width: 150,
      renderCell: (params) => params.value.username || "unknown",
    },
    {
      field: "assignee",
      headerName: "assignee",
      width: 150,
      renderCell: (params) => params.value.username || "unAssigned",
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured while fetching tasks</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
      <div className="pt-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="item-center bg-blue-primary flex rounded px-3 py-2 text-white hover:bg-blue-700"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
        <DataGrid
          rows={tasks || []}
          columns={columns}
          className={dataGridClassNames}
          sx={dataGridSxStyle(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default TableView;
