'use client'
import NavBar from '@/components/user/Navbar'; // Assuming Navbar is located here
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface LayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: LayoutProps) => {
    const pathname = usePathname();

    const showNavbar = !pathname?.includes('/login') && !pathname?.includes('/signup');

      return (
    <div>
      {showNavbar && <NavBar />} 
      <main>{children}</main> 
    </div>
  );
};

export default UserLayout;
