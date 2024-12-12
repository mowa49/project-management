import React from "react";
import {
  Icon,
  LucideIcon,
  Menu,
  Moon,
  Search,
  SearchCheck,
  Settings,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
const NavBar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 transition-all dark:bg-black">
      {/* search Bar */}
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-8 w-8 dark:text-white" />
          </button>
        )}
        <div className="relative flex h-min w-[200px]">
          <Search className="absolute left-[4px] top-1/2 mr-2 w-5 -translate-y-1/2 cursor-pointer dark:text-white" />
          <input
            className="dark:placeholder-white: w-full rounded border-none bg-slate-100 p-2 pl-8 focus:border-transparent focus:outline-none dark:bg-gray-800 dark:text-white"
            placeholder="search..."
          />
        </div>
      </div>
      {/* {icons} */}
      <div className="flex items-center transition-all">
        <Link
          href="/setting"
          className="h-min w-min rounded p-2 transition-all hover:bg-gray-200"
        >
          <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
          <div className="flex items-center"></div>
        </Link>

        <div className="ml-2 mr-5 hidden min-h-[2rem] w-[0.1rem] bg-gray-200 transition-all md:inline-block">
          <button
            className={
              isDarkMode
                ? `rounded p-2 dark:hover:bg-gray-700`
                : `rounded p-2 hover:bg-gray-100`
            }
            onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          >
            {isDarkMode ? (
              <Sun className="h-6 w-6 cursor-pointer dark:text-white" />
            ) : (
              <Moon className="h-6 w-6 cursor-pointer dark:text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

interface SideBarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SideBarLink = ({
  href,
  Icon: Icon,
  label,
  isCollapsed,
  SideBarLinkProps,
}: SideBarLinkProps) => {
  const pathname = use;
};

export default NavBar;
