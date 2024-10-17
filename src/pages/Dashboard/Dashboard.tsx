import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardAside from '@/components/Dashboard/DashboardAside';
import DashboardAsideRight from '@/components/Dashboard/DashboardAsideRight';
import DashboardMain from '@/components/Dashboard/DashboardMain';
import DashboardNav from '@/components/Dashboard/DashboardNav';
import { supabase } from '@/utils/supabase';
import { useMount } from 'ahooks';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useMount(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        navigate('/');
      }
    };

    checkSession();
  });

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
