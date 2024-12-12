"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import StoreProvider, { useAppSelector } from "./redux";
import Sidebar from "@/components/Sidebar";

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  console.log(isSidebarCollapsed);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="w-ful flex min-h-screen bg-gray-50">
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50 dark:bg-gray-900 ${isSidebarCollapsed ? "" : "blur md:filter-none lg:pl-64"} duration-600 mr-0 transition-all`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashBoardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashBoardLayout>{children}</DashBoardLayout>
    </StoreProvider>
  );
};

export default DashBoardWrapper;
