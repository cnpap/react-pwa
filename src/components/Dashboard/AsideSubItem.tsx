import React from 'react';

interface AsideSubItemProps {
  href: string;
  text: string;
}

function AsideSubItem({ href, text }: AsideSubItemProps) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        {text}
      </a>
    </li>
  );
}

export default AsideSubItem;
