export const dataGridClassNames =
  "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-white";

export const dataGridSxStyle = (isDarkMode: boolean) => {
  return {
    "& .MuiDataGrid-columnHeaders": {
      color: `${isDarkMode ? "#e5e7eb" : "black"}`, // Corrected from "colors" to "color"
      '& [role="row"]>*': {
        backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`, // Corrected from "backroundColor" to "backgroundColor"
        borderColor: `${isDarkMode ? "#2d3135" : "black"}`,
      },
    },
    "& .MuiIconButton-root": {
      color: `${isDarkMode ? "#a3a3a3" : "black"}`, // Corrected from "Muilticonbutton-root" to "MuiIconButton-root" and "colors" to "color"
    },
    "& .MuiTablePagination-root": {
      color: `${isDarkMode ? "#a3a3a3" : "black"}`, // Corrected from "colors" to "color"
    },
    "& .MuiTablePagination-selectIcon": {
      color: `${isDarkMode ? "#a3a3a3" : "black"}`, // Corrected from "colors" to "color"
    },
    "& .MuiDataGrid-cell": {
      border: "none",
    },
    "& .MuiDataGrid-row": {
      borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
    },
    "& .MuiDataGrid-withBorderColor": {
      borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`, // Added "1px solid" to match the expected CSS value
    },
  };
};
