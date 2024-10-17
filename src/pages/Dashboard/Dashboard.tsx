import React, { useState } from 'react';
import DashboardAside from '@/components/Dashboard/DashboardAside';
import DashboardAsideRight from '@/components/Dashboard/DashboardAsideRight';
import DashboardMain from '@/components/Dashboard/DashboardMain';
import DashboardNav from '@/components/Dashboard/DashboardNav';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <DashboardNav toggleSidebar={toggleSidebar} />
      <DashboardAside isOpen={isSidebarOpen} />
      <DashboardMain />
      <DashboardAsideRight />
    </div>
  );
}

export default Dashboard;
