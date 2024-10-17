import React, { useState } from 'react';

interface AsideItemProps {
  href?: string;
  icon: React.ReactNode;
  text: string;
  subItems?: React.ReactNode[];
}

function AsideItem({ href, icon, text, subItems }: AsideItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (subItems) {
    return (
      <li>
        <button
          type="button"
          className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {icon}
          <span className="flex-1 ml-3 text-left whitespace-nowrap">{text}</span>
          <svg
            className={`w-6 h-6 ${isOpen ? 'transform rotate-180' : ''}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        {isOpen && <ul className="py-2 space-y-2">{subItems}</ul>}
      </li>
    );
  }

  return (
    <li>
      <a
        href={href}
        className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {icon}
        <span className="ml-3">{text}</span>
      </a>
    </li>
  );
}

export default AsideItem;
