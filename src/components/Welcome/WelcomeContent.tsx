import React from 'react';

const WelcomeContent: React.FC = () => {
  return (
    <div className="flex items-center justify-center px-4 py-6 bg-primary-600 w-full">
      <div className="max-w-md xl:max-w-xl">
        <a href="#" className="flex items-center mb-4 text-2xl font-semibold text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Flowbite
        </a>
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-white xl:text-5xl">
          探索世界领先的设计作品集。
        </h1>
        <p className="mb-4 font-light text-primary-200 lg:mb-8">
          全球数百万设计师和机构在 Flowbite 上展示他们的作品集 -
          这里是世界上最优秀的设计和创意专业人士的家园。
        </p>
        <div className="flex items-center divide-x divide-primary-500">
          <div className="flex pr-3 -space-x-4 sm:pr-5">
            <img
              className="w-10 h-10 border-2 border-white rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
              alt="bonnie avatar"
            />
            <img
              className="w-10 h-10 border-2 border-white rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
              alt="jese avatar"
            />
            <img
              className="w-10 h-10 border-2 border-white rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
              alt="roberta avatar"
            />
            <img
              className="w-10 h-10 border-2 border-white rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png"
              alt="thomas avatar"
            />
          </div>
          <a href="#" className="pl-3 text-white sm:pl-5 dark:text-white">
            <span className="text-sm text-primary-200">
              超过 <span className="font-medium text-white">15.7k</span> 位满意的客户
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WelcomeContent;
