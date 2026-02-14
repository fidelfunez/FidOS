"use client";

import React from 'react';
import SimpleNav from './SimpleNav';
import SimpleFooter from './SimpleFooter';

interface SimpleLayoutProps {
  children: React.ReactNode;
  activePage?: 'about' | 'projects' | 'experience' | 'contact';
}

const SimpleLayout: React.FC<SimpleLayoutProps> = ({ children, activePage }) => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #3730a3 50%, #0f172a 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {/* Skip to main content - for keyboard/accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Skip to main content
      </a>

      <SimpleNav activePage={activePage} />
      <main id="main-content">{children}</main>
      <SimpleFooter />
    </div>
  );
};

export default SimpleLayout;
