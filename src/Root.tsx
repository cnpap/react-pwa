import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
// import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './components/Toast/ToastManager';

// import ThemeProvider from '@/theme/Provider';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

// 创建一个新的 QueryClient 实例
const queryClient = new QueryClient();

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <ToastProvider>
        {/*<RecoilRoot>*/}
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            {/*<ThemeProvider>*/}
            <App />
            {/*</ThemeProvider>*/}
          </HelmetProvider>
        </QueryClientProvider>
        {/*</RecoilRoot>*/}
      </ToastProvider>
    </StrictMode>,
  );
}

export default render;
