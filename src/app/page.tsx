"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIsMobile } from '@/utils/mobile';

export default function Home() {
  const router = useRouter();
  const isMobile = useIsMobile();

  useEffect(() => {
    // Mobile users go to simple version, desktop users go to lockscreen
    if (isMobile) {
      router.push('/simple');
    } else {
      router.push('/lockscreen');
    }
  }, [router, isMobile]);

  return null; // This will show briefly before redirect
}
