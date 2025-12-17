"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Dashboard from '../../components/Dashboard';
import { useIsMobile } from '@/utils/mobile';
 
export default function DashboardPage() {
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Redirect mobile users to simple version
    if (isMobile) {
      router.push('/simple');
    }
  }, [router, isMobile]);

  // Don't render desktop version on mobile
  if (isMobile) {
    return null;
  }

  return <Dashboard />;
} 