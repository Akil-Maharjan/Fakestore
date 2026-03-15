'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { NAV_LINKS } from '@/constants/HeaderConstants';
import { LogIn, ShoppingCart } from 'lucide-react';
import { isLoggedIn, removeToken } from '@/lib/auth';
import { useCart } from '@/components/cart/CartContext';

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { getItemCount } = useCart();
  const [, setForceUpdate] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleAuthChange = () => {
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('auth-change', handleAuthChange);

    const timeoutId = setTimeout(() => setMounted(true), 0);

    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
      clearTimeout(timeoutId);
    };
  }, []);

  const isAuthenticated = mounted ? isLoggedIn() : false;

  // Handle anchor scrolling when page loads with hash
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.substring(1);
      
      // Try multiple times to ensure the element is available
      const scrollToElement = (attempts = 0) => {
        const element = document.getElementById(hash);
        if (element) {
          // Ensure we're at the top first, then scroll smoothly
          window.scrollTo({ top: 0, behavior: 'auto' });
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 50);
        } else if (attempts < 5) {
          // Retry after a short delay
          setTimeout(() => scrollToElement(attempts + 1), 200);
        }
      };
      
      // Initial attempt after a short delay
      setTimeout(() => scrollToElement(), 100);
    }
  }, [pathname]);

  const handleLogout = () => {
    removeToken();
    window.dispatchEvent(new CustomEvent('auth-change'));
    router.push('/login');
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      
      // If we're not on the home page, navigate to home first
      if (pathname !== '/') {
        router.push(`/${href}`);
        return;
      }
      
      // If we're already on the home page, just scroll
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className="bg-(--primary-background) max-w-[2000px] mx-auto  border-b border-(--primary-border) shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="shrink-0">
              <Link href="/" className="flex items-center">
                <h3 className="text-2xl font-bold text-blue-600">
                  FakeStore
                </h3>
              </Link>
            </div>

            {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`flex items-center  gap-2 px-3 py-2 rounded-md text-sm md:text-lg font-medium transition-colors duration-200 ${
                  pathname === link.href 
                    ? 'text-white bg-blue-500' 
                    : 'text-black hover:text-white hover:bg-blue-500'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

            {/* Cart Icon and login */}
            <div className="hidden font-poppins  md:flex gap-2 items-center">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="relative cursor-pointer flex gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="relative cursor-pointer flex gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Login
                    <LogIn className="h-6 w-6" />
                  </Link>
                )}
              <Link
                href="/cart"
                className="relative p-2 text-(--primary-text) hover:text-blue-600 transition-colors duration-200"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {isAuthenticated ? getItemCount() : 0}
                </span>
              </Link>
            </div>

            {/* Mobile Cart Icon and login */}
            <div className="md:hidden font-poppins flex gap-2 items-center">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="relative flex gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="relative flex gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Login
                    <LogIn className="h-6 w-6" />
                  </Link>
                )}
              <Link
                href="/cart"
                className="relative p-2 text-(--primary-text) hover:text-blue-600 transition-colors duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {isAuthenticated ? getItemCount() : 0}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-(--primary-background) border-t border-(--primary-border) z-40">
        <div className="flex items-stretch h-full">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`flex flex-col items-center p-2 justify-center gap-1 text-xs font-medium transition-colors duration-200 border-r border-gray-200 last:border-r-0 flex-1 h-full ${
                pathname === link.href 
                  ? 'text-white bg-blue-500' 
                  : 'text-(--primary-text) hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              {link.icon}
              <span className="text-xs">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;