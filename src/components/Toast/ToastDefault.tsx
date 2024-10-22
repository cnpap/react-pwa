import React, { useState, useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition =
  | 'top'
  | 'top-left'
  | 'top-right'
  | 'bottom'
  | 'bottom-left'
  | 'bottom-right'
  | 'left'
  | 'right';

export interface ToastProps {
  type: ToastType;
  message: string;
  position: ToastPosition;
  distance: number;
}

function ToastDefault({ type, message, position, distance }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  console.log(`position`, position);
  useEffect(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    const hideTimer = setTimeout(() => setIsVisible(false), 2700);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const toastConfig = {
    success: {
      bgColor: 'bg-green-100 dark:bg-green-800',
      textColor: 'text-green-500 dark:text-green-200',
      icon: (
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      ),
    },
    error: {
      bgColor: 'bg-red-100 dark:bg-red-800',
      textColor: 'text-red-500 dark:text-red-200',
      icon: (
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
      ),
    },
    warning: {
      bgColor: 'bg-orange-100 dark:bg-orange-700',
      textColor: 'text-orange-500 dark:text-orange-200',
      icon: (
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
      ),
    },
    info: {
      bgColor: 'bg-blue-100 dark:bg-blue-800',
      textColor: 'text-blue-500 dark:text-blue-200',
      icon: (
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
      ),
    },
  };

  const { bgColor, textColor, icon } = toastConfig[type];

  const positionClasses = {
    top: `top-[${distance}px] left-1/2 -translate-x-1/2`,
    'top-left': `top-[${distance}px] left-[${distance}px]`,
    'top-right': `top-[${distance}px] right-[${distance}px]`,
    bottom: `bottom-[${distance}px] left-1/2 -translate-x-1/2`,
    'bottom-left': `bottom-[${distance}px] left-[${distance}px]`,
    'bottom-right': `bottom-[${distance}px] right-[${distance}px]`,
    left: `left-[${distance}px] top-1/2 -translate-y-1/2`,
    right: `right-[${distance}px] top-1/2 -translate-y-1/2`,
  };

  const slideInClasses = {
    top: 'translate-y-0 opacity-100',
    'top-left': 'translate-x-0 opacity-100',
    'top-right': 'translate-x-0 opacity-100',
    bottom: 'translate-y-0 opacity-100',
    'bottom-left': 'translate-x-0 opacity-100',
    'bottom-right': 'translate-x-0 opacity-100',
    left: 'translate-x-0 opacity-100',
    right: 'translate-x-0 opacity-100',
  };

  const initialClasses = {
    top: '-translate-y-full',
    'top-left': '-translate-x-full',
    'top-right': 'translate-x-full',
    bottom: 'translate-y-full',
    'bottom-left': '-translate-x-full',
    'bottom-right': 'translate-x-full',
    left: '-translate-x-full',
    right: 'translate-x-full',
  };

  console.log(
    `fixed ${
      positionClasses[position]
    } flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 transition-all duration-300 ease-in-out transform ${
      isVisible ? slideInClasses[position] : initialClasses[position]
    }`,
  );
  return (
    <div
      id={`toast-${type}`}
      className={`fixed ${
        positionClasses[position]
      } flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 transition-all duration-300 ease-in-out transform ${
        isVisible ? slideInClasses[position] : initialClasses[position]
      } z-50`}
      role="alert"
      style={{ top: `${distance}px` }}
    >
      <div
        className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${bgColor} ${textColor} rounded-lg`}
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {icon}
        </svg>
        <span className="sr-only">{type} icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target={`#toast-${type}`}
        aria-label="Close"
      >
        <span className="sr-only">关闭</span>
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
}

export default ToastDefault;
