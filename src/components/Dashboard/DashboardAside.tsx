import { useState } from 'react';
import AsideItem from './AsideItem';
import AsideSubItem from './AsideSubItem';

interface DashboardAsideProps {
  isOpen: boolean;
}

function DashboardAside({ isOpen }: DashboardAsideProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showProjectList, setShowProjectList] = useState(true);
  const [selectedProject, setSelectedProject] = useState<string>('1');

  // 项目列表数据
  const projectList = [
    { id: '1', name: '我的项目 1', color: 'bg-primary-600' },
    { id: '2', name: '我的项目 2', color: 'bg-teal-400' },
    { id: '3', name: '他人的项目 1', color: 'bg-orange-300' },
    { id: '4', name: '他人的项目 2', color: 'bg-purple-500' },
  ];

  // 成员列表数据（示例）
  const memberList = [
    {
      name: '张三',
      email: 'zhangsan@example.com',
      avatar: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png',
    },
    {
      name: '李四',
      email: 'lisi@example.com',
      avatar: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png',
    },
    {
      name: '王五',
      email: 'wangwu@example.com',
      avatar: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png',
    },
    {
      name: '赵六',
      email: 'zhaoliu@example.com',
      avatar: 'https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png',
    },
  ];

  const PROJECT_ITEM_HEIGHT = 40; // 固定项目项的高度为40px
  const PROJECT_ITEM_GAP = 8; // 项目之间的总间距
  const MAX_VISIBLE_ITEMS = 3.5; // 最大可见项目数（3个半）

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700 md:pt-14 pb-14 md:pb-0 flex flex-col overflow-hidden`}
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div
        className="flex-grow overflow-y-auto px-3 bg-white dark:bg-gray-800 overscroll-contain"
        style={{ overscrollBehavior: 'contain' }}
      >
        <div className="flex justify-between pb-0.5 pt-1 items-center pl-2 mt-5 mb-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
          <h3>项目管理</h3>
        </div>
        <ul className="space-y-2">
          <AsideItem
            href="#"
            icon={
              <svg
                aria-hidden="true"
                className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
              </svg>
            }
            text="概览"
          />
          <AsideItem
            text="页面"
            icon={
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                ></path>
              </svg>
            }
            subItems={[
              <AsideSubItem key="settings" href="#" text="Settings" />,
              <AsideSubItem key="kanban" href="#" text="Kanban" />,
              <AsideSubItem key="calendar" href="#" text="Calendar" />,
            ]}
          />
        </ul>
      </div>

      <div
        className="px-3 border-t border-gray-200 bg-white dark:bg-gray-800 overflow-y-auto overscroll-contain"
        style={{ overscrollBehavior: 'contain' }}
      >
        <div className="w-full mt-5">
          <div
            className="grid max-w-xs grid-cols-2 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600"
            role="group"
          >
            <button
              type="button"
              className={`px-3 py-1.5 font-medium rounded-lg ${
                showProjectList
                  ? 'text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900'
                  : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
              }`}
              onClick={() => setShowProjectList(true)}
            >
              项目列表
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 font-medium rounded-lg ${
                !showProjectList
                  ? 'text-white bg-gray-900 dark:bg-gray-300 dark:text-gray-900'
                  : 'text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
              }`}
              onClick={() => setShowProjectList(false)}
            >
              本项目成员
            </button>
          </div>
        </div>
        <div className="pl-2 my-4 text-sm text-gray-500 dark:text-gray-400 dark:border-gray-700">
          <h3>{showProjectList ? '所有项目' : '项目成员'}</h3>
        </div>
        <div
          className="relative overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg"
          style={{ height: `${MAX_VISIBLE_ITEMS * (PROJECT_ITEM_HEIGHT + PROJECT_ITEM_GAP)}px` }}
        >
          <div
            className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
              showProjectList ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="overflow-y-auto h-full">
              <ul className="pl-2 pb-2 space-y-2 relative">
                <div
                  className="absolute left-0 w-[calc(100%-16px)] ml-[8px] bg-primary-100 dark:bg-primary-900 rounded-lg transition-all duration-300 ease-in-out"
                  style={{
                    height: `${PROJECT_ITEM_HEIGHT}px`,
                    transform: `translateY(${
                      selectedProject
                        ? (parseInt(selectedProject) - 1) * (PROJECT_ITEM_HEIGHT + PROJECT_ITEM_GAP)
                        : 0
                    }px)`,
                    opacity: selectedProject ? 1 : 0,
                  }}
                ></div>
                {projectList.map((project) => (
                  <li key={project.id} style={{ height: `${PROJECT_ITEM_HEIGHT}px` }}>
                    <a
                      href="#"
                      className={`flex w-[calc(100%-8px)] items-center text-base font-medium rounded-lg transition duration-300 px-3 py-2 relative z-10 ${
                        selectedProject === project.id
                          ? 'text-primary-700 dark:text-primary-300'
                          : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <span className={`w-4 h-4 ${project.color} rounded`}></span>
                      <span className="ml-3">{project.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className={`absolute inset-0 transition-transform duration-300 ease-in-out ${
              showProjectList ? 'translate-x-full' : 'translate-x-0'
            }`}
          >
            <div className="overflow-y-auto h-full">
              <ul className="pl-2 space-y-2">
                {memberList.map((member, index) => (
                  <li key={index} style={{ height: `${PROJECT_ITEM_HEIGHT}px` }}>
                    <div className="flex items-center text-base font-medium text-gray-900 rounded-lg dark:text-white px-3 py-2">
                      <span className="w-4 h-4 flex-shrink-0">
                        <img
                          className="w-full scale-150 -translate-x-1 h-full rounded-full object-cover"
                          src={member.avatar}
                          alt={`${member.name} avatar`}
                        />
                      </span>
                      <div className="ml-3 overflow-hidden flex-grow">
                        <span className="text-sm font-medium truncate block">{member.name}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate block">
                          {member.email}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="my-2">
          <a
            href="#"
            className="flex items-center pl-5 text-base font-medium text-gray-900 rounded-lg transition duration-75 dark:text-gray-200 group px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <span className="w-4 h-4 rounded border border-gray-200 dark:border-gray-400 flex items-center justify-center">
              <svg
                className="w-3 h-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            <span className="ml-3 text-gray-500 dark:text-gray-400 hover:underline">
              {showProjectList ? '创建项目' : '邀请成员'}
            </span>
          </a>
        </div>
      </div>

      <div className="flex justify-center p-4 py-2 space-x-4 border-t border-gray-200 w-full bg-white dark:bg-gray-800 z-20">
        <a
          href="#"
          className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
          </svg>
        </a>
        <div className="relative">
          <a
            href="#"
            className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          {showTooltip && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm z-50 whitespace-nowrap">
              Settings page
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default DashboardAside;
