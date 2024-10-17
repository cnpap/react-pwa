import React from 'react';

interface NotificationDropdownProps {
  isOpen: boolean;
}

function NotificationDropdown({ isOpen }: NotificationDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed md:absolute left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-0 w-80 max-h-[calc(100vh-100px)] overflow-y-auto bg-white rounded-lg shadow-lg dark:bg-gray-700 z-50 md:top-full md:mt-2 bottom-16 md:bottom-auto">
      <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        Notifications
      </div>
      <div>
        <a href="#" className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600">
          <div className="flex-shrink-0">
            <img
              className="rounded-full w-11 h-11"
              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
              alt="Bonnie Green avatar"
            />
            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-700">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
              </svg>
            </div>
          </div>
          <div className="w-full pl-3">
            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
              New message from{' '}
              <span className="font-semibold text-gray-900 dark:text-white">Bonnie Green</span>:
              &quot;Hey, what&apos;s up? All set for the presentation?&quot;
            </div>
            <div className="text-xs font-medium text-primary-600 dark:text-primary-500">
              a few moments ago
            </div>
          </div>
        </a>
        {/* 可以添加更多通知项 */}
      </div>
      <a
        href="#"
        className="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:underline"
      >
        <div className="inline-flex items-center ">
          <svg
            className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          View all
        </div>
      </a>
    </div>
  );
}

export default NotificationDropdown;
