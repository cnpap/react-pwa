import { ROUTE_AUTH_LOGIN } from '@/constant/route';
import { PropsWithChildren } from 'react';

function RegisterOnboardingLayout(props: PropsWithChildren) {
  return (
    <section className="bg-white dark:bg-gray-900 lg:py-0">
      <div className="lg:flex">
        <div className="hidden w-full max-w-md justify-center items-center p-6 lg:h-screen lg:flex bg-primary-600">
          <div className="block p-6 text-white rounded-lg bg-primary-500">
            <a
              href={ROUTE_AUTH_LOGIN}
              className="float-end flex items-center hover:underline hover:scale-105 transition-transform duration-200"
            >
              <svg
                className="mr-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              返回登录
            </a>
            <h2 className="mb-4 text-2xl font-semibold">功能提供差异</h2>
            <p className="mb-4 font-light text-primary-100 sm:text-lg">
              为防止滥用，账号启用需 10 元首冲。该费用可用于消费 ai token。
              <br />
              如有任何问题，请添加作者微信，推送到开发群。
            </p>
            <img src="https://s3.opss.dev/wxq.jpg" alt="qrcode" className="mb-4 rounded-md" />
          </div>
        </div>
        <div className="flex items-center h-screen overflow-auto mx-auto md:w-[44rem] px-4 md:px-8 xl:px-0">
          <div className="w-full">
            <div className="flex items-center justify-between mb-8 space-x-4">
              <a href="#" className="flex items-center text-2xl font-semibold lg:hidden">
                <img
                  alt={''}
                  className="w-8 h-8 mr-2"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                />
                <span className="text-gray-900 dark:text-white">Flowbite</span>
              </a>
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterOnboardingLayout;
