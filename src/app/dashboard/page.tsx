import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Link, Outlet } from 'react-router-dom';
function Header() {
  return (
    <header className="flex bg-background h-16 shrink-0 items-center px-4">
      <div className="md:hidden flex items-center gap-2">
        <SidebarTrigger className="-ml-1.5" />
        <Separator orientation="vertical" className="mr-3.5 h-4" />
      </div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <Link to="/dashboard">home</Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col">
        <div className="hidden md:block sticky top-0 z-10 border-b">
          <Header />
        </div>
        <div className="flex flex-1 flex-col">
          <Outlet />
        </div>
        <div className="md:hidden h-16 shrink-0" />
      </SidebarInset>
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t">
        <Header />
      </div>
    </SidebarProvider>
  );
}
