"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectQuery } from "@/state/api";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  BriefcaseIcon,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  PiIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const Sidebar = (props: Props) => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects, error, isLoading } = useGetProjectQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarClassNames = `fixed flex flex-col h-[100%] justtify-between shadow-xl transitions-all duration-300 z-40 h-full dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed ? "w-0" : "w-64"}`;
  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            Mager
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-700 transition-all hover:text-gray-500 dark:text-gray-100 dark:hover:bg-gray-400" />
            </button>
          )}
        </div>
        {/* team */}
        <div className="dark:bg flex items-center gap-5 border-y-[1.5px] border-gray-500 px-8 py-4 dark:border-gray-800 dark:bg-gray-600 dark:text-white">
          <Image width={40} height={50} alt="logo" src="/logo.png" />
          <div>
            <h3 className="text-md font-bold uppercase tracking-wide dark:bg-black">
              Edro Team
            </h3>
            <div className="mt-2 flex items-start gap-2">
              <LockIcon
                className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-50"
                width={40}
              />
              <p className="text-sm text-gray-500 dark:text-gray-200">
                Private
              </p>
            </div>
          </div>
        </div>
        {/* {Navbar Link} */}
        <nav className="z-30 w-full">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink icon={Briefcase} label="Timeline" href="/timeline" />
          <SidebarLink icon={Search} label="Search" href="/search" />
          <SidebarLink icon={Settings} label="Settings" href="/settings" />
          <SidebarLink icon={User} label="Users" href="/users" />
          <SidebarLink icon={Users} label="Teams" href="/teams" />
        </nav>
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-600"
        >
          Projects
          {showProjects ? <ChevronDown /> : <ChevronUp />}
        </button>
        {/* PROJECT LIST  */}
        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={BriefcaseIcon}
              label={project.name}
              href={`/projects/${project.id}`}
            />
          ))}
        {/* ///////// */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-600"
        >
          Priority
          {showPriority ? <ChevronUp /> : <ChevronDown />}
          {/* PRIORITY LIST  */}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
        {/* /////////////// */}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: StringDecoder;
}

const SidebarLink = ({ href, icon: Icon, label }: SideBarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard ");

  return (
    <Link href={href} className="w-full">
      <div
        className={`w relative flex cursor-pointer items-center justify-start gap-3 px-8 py-3 transition-all hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-700" : ""
        }`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}

        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
