import SpinWind from '@/components/Spin/SpinWind';
import Page from '@/app/dashboard/page';
import { useAccountInfo } from '@/hooks/useAccountInfo';

function Dashboard() {
  const info = useAccountInfo();

  if (!info) {
    return <SpinWind />;
  }

  return <Page />;
}

export default Dashboard;
