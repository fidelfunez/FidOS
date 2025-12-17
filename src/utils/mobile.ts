"use client";

/**
 * Hook to detect if user is on a mobile device
 * Returns true for mobile devices, false for desktop
 */
export function useIsMobile(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check user agent for mobile devices
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  
  // Also check screen width as fallback
  const isMobileByWidth = window.innerWidth < 768;
  
  return mobileRegex.test(userAgent) || isMobileByWidth;
}

/**
 * Check if device is mobile (server-side safe)
 */
export function isMobileDevice(userAgent?: string): boolean {
  if (!userAgent && typeof window !== 'undefined') {
    userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  }
  
  if (!userAgent) return false;
  
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  return mobileRegex.test(userAgent);
}

