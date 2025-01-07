import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface MessagePageProps {
  title: string;
  message: string;
  linkText?: string;
  linkTo?: string;
}

const MessagePage: React.FC<MessagePageProps> = ({ title, message, linkText, linkTo }) => {
  return (
    <div className="text-center p-8 md:bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm md:rounded-md md:shadow-sm md:border border-gray-200 dark:border-gray-700 max-w-md mx-auto">
      <div className="mb-6 flex justify-center">
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
          <CheckCircleIcon className="h-12 w-12 text-green-600 dark:text-green-400" />
        </div>
      </div>
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{title}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">{message}</p>
      {linkText && linkTo && (
        <Link
          to={linkTo}
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
};

export default MessagePage;
