import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();

  return () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/auth/login');
  };
}
