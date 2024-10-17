import React from 'react';

interface AppsDropdownProps {
  isOpen: boolean;
}

function AppsDropdown({ isOpen }: AppsDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed md:absolute left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-0 w-60 max-h-[calc(100vh-100px)] overflow-y-auto bg-white rounded-lg shadow-lg dark:bg-gray-700 z-50 md:top-full md:mt-2 bottom-16 md:bottom-auto">
      <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        Apps
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        <a
          href="#"
          className="flex flex-col items-center justify-center p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <svg
            className="text-gray-500 w-7 h-7 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Sales</div>
        </a>
        <a
          href="#"
          className="flex flex-col items-center justify-center p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <svg
            className="text-gray-500 w-7 h-7 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
          </svg>
          <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Users</div>
        </a>
        <a
          href="#"
          className="flex flex-col items-center justify-center p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <svg
            className="text-gray-500 w-7 h-7 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Inbox</div>
        </a>
      </div>
    </div>
  );
}

export default AppsDropdown;
