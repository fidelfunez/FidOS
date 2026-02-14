"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface SimpleNavProps {
  activePage?: 'about' | 'projects' | 'experience' | 'contact';
}

const navLinks = [
  { href: '/simple/about', label: 'About' },
  { href: '/simple/projects', label: 'Projects' },
  { href: '/simple/experience', label: 'Experience' },
  { href: '/simple/contact', label: 'Contact' },
];

const SimpleNav: React.FC<SimpleNavProps> = ({ activePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const linkClass = (href: string) => {
    const isActive =
      (activePage === 'about' && href.includes('/about')) ||
      (activePage === 'projects' && href.includes('/projects')) ||
      (activePage === 'experience' && href.includes('/experience')) ||
      (activePage === 'contact' && href.includes('/contact'));
    return isActive
      ? 'text-white hover:text-blue-300 transition-colors'
      : 'text-white/80 hover:text-white transition-colors';
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/simple" className="text-xl font-bold text-white hover:text-white/90 transition-colors">
              Fidel Fúnez C.
            </a>
            {/* Desktop nav */}
            <div className="hidden md:flex space-x-6">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className={linkClass(link.href)}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Try FidOS - hidden on mobile to save space, shown in mobile menu */}
            <a
              href="/dashboard"
              className="hidden md:inline-block px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
            >
              Try FidOS
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-200 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-slate-900/98 border-l border-white/10 shadow-xl transition-transform duration-200 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-24 px-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg ${linkClass(link.href)} text-lg font-medium`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 px-4 rounded-lg bg-white/10 text-white hover:bg-white/20 border border-white/20 mt-4 text-center font-semibold"
            >
              Try FidOS
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleNav;
