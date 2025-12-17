import React, { useState, useEffect, useRef } from 'react';
import { Sun, Volume2, WifiCog, LogOut } from 'lucide-react';
import { useIsMobile } from '@/utils/mobile';
import Safari from './Safari';
import Mail from './Mail';
import Finder from './Finder';
import IMessage from './iMessage';
import Photos from './Photos';
import FaceTime from './FaceTime';
import Calendar from './Calendar';
import Reminders from './Reminders';
import Music from './Music';
import Notes from './Notes';
import SystemSettings from './SystemSettings';
import AppStore from './AppStore';
import IPhoneMirroring from './iPhoneMirroring';
import Slack from './Slack';
import VSCode from './VSCode';
import Notion from './Notion';
import Launchpad from './Launchpad';
import Weather from './Weather';
import AboutThisMac from './AboutThisMac';
import Brave from './Brave';

const desktopFolders = [
  { name: 'Projects', icon: '/icons-png/projects-folder/projects-folder_page_01.webp' },
  { name: 'Photos', icon: '/icons-png/images-folder_16x16x32,images-folder_32x32x32,images-folder_256x256x32/images-folder_1024x1024x32.webp' },
  { name: 'FidOS', icon: '/icons-png/folder-common.webp' },
];


const projectsList = [
  { name: 'FidOS Dashboard', type: 'Project', date: 'Today', size: '2.3 MB' },
  { name: 'Portfolio Website', type: 'Project', date: 'Yesterday', size: '1.8 MB' },
  { name: 'Mobile App', type: 'Project', date: 'Jul 4', size: '4.1 MB' },
  { name: 'API Backend', type: 'Project', date: 'Jul 2', size: '3.2 MB' },
  { name: 'Design System', type: 'Project', date: 'Jun 28', size: '1.5 MB' },
];

const dockApps = [
  { name: 'Finder', icon: '/icons-png/finder_16x16x32,finder_32x32x32,finder_256x256x32/finder_1024x1024x32.webp' },
  { name: 'Launchpad', icon: '/icons-png/Launchpad_16x16x32,Launchpad_32x32x32,Launchpad_256x256x32/Launchpad_1024x1024x32.webp' },
  { name: 'Safari', icon: '/icons-png/safari/safari_page_01.webp' },
  { name: 'iMessage', icon: '/icons-png/imessage_16x16x32,imessage_32x32x32,imessage_256x256x32/imessage_1024x1024x32.webp' },
  { name: 'Mail', icon: '/icons-png/mail_16x16x32,mail_32x32x32,mail_256x256x32/mail_1024x1024x32.webp' },
  { name: 'Photos', icon: '/icons-png/photos_16x16x32,photos_32x32x32,photos_256x256x32/photos_1024x1024x32.webp' },
  { name: 'FaceTime', icon: '/icons-png/facetime_16x16x32,facetime_32x32x32,facetime_256x256x32/facetime_1024x1024x32.webp' },
  { name: 'Calendar', icon: '/icons-png/calendar_16x16x32,calendar_32x32x32,calendar_256x256x32/calendar_1024x1024x32.webp' },
  { name: 'Reminders', icon: '/icons-png/reminders/reminders_page_01.webp' },
  { name: 'Notes', icon: '/icons-png/notes_16x16x32,notes_32x32x32,notes_256x256x32/notes_1024x1024x32.webp' },
  { name: 'Brave', icon: '/icons-png/brave_16x16x32,brave_32x32x32,brave_256x256x32/brave_1024x1024x32.webp' },
  { name: 'Music', icon: '/icons-png/apple-music_16x16x32,apple-music_32x32x32,apple-music_256x256x32/apple-music_1024x1024x32.webp' },
  { name: 'App Store', icon: '/icons-png/app-store_16x16x32,app-store_32x32x32,app-store_256x256x32/app-store_1024x1024x32.webp' },
  { name: 'System Settings', icon: '/icons-png/system-settings/system-settings_page_01.webp' },
  { name: 'iPhone Mirroring', icon: '/icons-png/screen-mirroring/screen-mirroring_page_01.webp' },
  { name: 'VS Code', icon: '/icons-png/vs-code/vs-code_page_02.webp' },
  { name: 'Slack', icon: '/icons-png/slack/slack_page_01.webp' },
  { name: 'Notion', icon: '/icons-png/notion.webp' },
  { name: 'Trash', icon: '/icons-png/full-bin_16x16x32,full-bin_32x32x32,full-bin_256x256x32/full-bin_1024x1024x32.webp' },
];

// Tooltip for dock icons
const DockTooltip: React.FC<{ label: string; show: boolean }> = ({ label, show }) => (
  <div
    style={{
      position: 'absolute',
      left: '50%',
      bottom: '63px',
      transform: 'translateX(-50%)',
      background: 'rgba(30, 28, 26, 0.97)',
      color: '#fff',
      fontSize: 13,
      fontWeight: 500,
      borderRadius: 14,
      padding: '7px 18px 11px 18px',
      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
      whiteSpace: 'nowrap',
      zIndex: 100,
      opacity: show ? 0.97 : 0,
      pointerEvents: 'none',
      transition: 'opacity 0.22s cubic-bezier(.4,0,.2,1), transform 0.22s cubic-bezier(.4,0,.2,1)',
      transitionDelay: show ? '0.08s' : '0s',
    }}
  >
    {label}
    <span
      style={{
        position: 'absolute',
        left: '50%',
        bottom: -8,
        transform: 'translateX(-50%)',
        width: 0,
        height: 0,
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderTop: '8px solid rgba(30, 28, 26, 0.97)',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.10))',
        zIndex: 101,
      }}
    />
  </div>
);

const baseAppleMenuItems = [
  'About This Mac',
  'System Settings…',
  'Simple View',
  '-',
  'Restart…',
  'Shut Down…',
  '-',
  'Log Out Fidel Fúnez C.'
];

const finderMenuItems = [
  'About Finder',
  '-',
  'Preferences…',
  '-',
  'Empty Trash…',
  '-',
  'Services',
  'Hide Finder',
  'Hide Others',
  'Show All',
  '-',
  'Quit Finder'
];

const wifiMenuItems = [
  'Wi-Fi: On (Fidel\'s WiFi)',
  'Wi-Fi: Off',
  '-',
  'Apt. 2210',
  'Satoshi\'s WiFi',
  'Other Networks…',
  '-',
  'Open Network Preferences…'
];

const batteryMenuItems = [
  'Battery: 80%',
  'Time Remaining: About 6 hours',
  '-',
  'Show Battery Settings',
  '-',
  'Open Energy Saver Preferences…'
];

const userMenuItems = [
  'Fidel Fúnez C.',
  'Account Settings…',
  '-',
  'Restart…',
  'Shut Down…',
  'Log Out Fidel Fúnez C.',
];

// Mock website content components
const AppleWebsite: React.FC = () => (
  <div style={{ padding: '20px', color: '#fff', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif' }}>
    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
      <div style={{ fontSize: '48px', fontWeight: '600', marginBottom: '16px' }}>🍎</div>
      <div style={{ fontSize: '32px', fontWeight: '600', marginBottom: '8px' }}>Apple</div>
      <div style={{ fontSize: '18px', color: '#aaa', marginBottom: '32px' }}>Think Different.</div>
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px' }}>
        <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>iPhone 15 Pro</div>
        <div style={{ color: '#aaa', marginBottom: '16px' }}>Titanium. So strong. So light. So Pro.</div>
        <button style={{ background: '#007AFF', border: 'none', borderRadius: '8px', padding: '8px 16px', color: '#fff', cursor: 'pointer' }}>
          Buy
        </button>
      </div>
      
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px' }}>
        <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>MacBook Air</div>
        <div style={{ color: '#aaa', marginBottom: '16px' }}>Supercharged by M2</div>
        <button style={{ background: '#007AFF', border: 'none', borderRadius: '8px', padding: '8px 16px', color: '#fff', cursor: 'pointer' }}>
          Buy
        </button>
      </div>
      
      <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px' }}>
        <div style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>iPad</div>
        <div style={{ color: '#aaa', marginBottom: '16px' }}>Lovable. Drawable. Magical.</div>
        <button style={{ background: '#007AFF', border: 'none', borderRadius: '8px', padding: '8px 16px', color: '#fff', cursor: 'pointer' }}>
          Buy
        </button>
      </div>
    </div>
    
    <div style={{ textAlign: 'center', color: '#aaa', fontSize: '14px' }}>
      Copyright © 2024 Apple Inc. All rights reserved.
    </div>
  </div>
);

const GoogleWebsite: React.FC = () => (
  <div style={{ padding: '40px', color: '#fff', fontFamily: 'Arial,sans-serif', textAlign: 'center' }}>
    <div style={{ fontSize: '72px', fontWeight: '400', marginBottom: '32px', letterSpacing: '-2px' }}>
      <span style={{ color: '#4285F4' }}>G</span>
      <span style={{ color: '#EA4335' }}>o</span>
      <span style={{ color: '#FBBC05' }}>o</span>
      <span style={{ color: '#4285F4' }}>g</span>
      <span style={{ color: '#34A853' }}>l</span>
      <span style={{ color: '#EA4335' }}>e</span>
    </div>
    
    <div style={{ maxWidth: '500px', margin: '0 auto 32px auto' }}>
      <div style={{ 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '24px', 
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{ fontSize: '16px', color: '#aaa', flex: 1, textAlign: 'left' }}>
          Search Google or type a URL
        </div>
        <div style={{ fontSize: '20px', color: '#aaa' }}>🔍</div>
      </div>
    </div>
    
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
      <button style={{ 
        background: 'rgba(255,255,255,0.1)', 
        border: '1px solid rgba(255,255,255,0.2)', 
        borderRadius: '4px', 
        padding: '8px 16px', 
        color: '#fff', 
        cursor: 'pointer' 
      }}>
        Google Search
      </button>
      <button style={{ 
        background: 'rgba(255,255,255,0.1)', 
        border: '1px solid rgba(255,255,255,0.2)', 
        borderRadius: '4px', 
        padding: '8px 16px', 
        color: '#fff', 
        cursor: 'pointer' 
      }}>
        I'm Feeling Lucky
      </button>
    </div>
    
    <div style={{ fontSize: '14px', color: '#aaa' }}>
      Google offered in: <span style={{ color: '#4285F4', cursor: 'pointer' }}>English</span>
    </div>
  </div>
);


// Mock Calendar data - Generate events for current month
const generateMockEvents = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  return [
    {
      id: '1',
      title: 'Team Standup',
      date: new Date(currentYear, currentMonth, 15).toISOString().split('T')[0],
      time: '09:00',
      duration: 30,
      type: 'work',
      location: 'Zoom Meeting',
      description: 'Daily team standup meeting'
    },
    {
      id: '2',
      title: 'Lunch with Sarah',
      date: new Date(currentYear, currentMonth, 15).toISOString().split('T')[0],
      time: '12:30',
      duration: 60,
      type: 'personal',
      location: 'Downtown Cafe',
      description: 'Catch up over lunch'
    },
    {
      id: '3',
      title: 'Project Review',
      date: new Date(currentYear, currentMonth, 15).toISOString().split('T')[0],
      time: '14:00',
      duration: 90,
      type: 'work',
      location: 'Conference Room A',
      description: 'Q1 project milestone review'
    },
    {
      id: '4',
      title: 'Gym Session',
      date: new Date(currentYear, currentMonth, 16).toISOString().split('T')[0],
      time: '07:00',
      duration: 60,
      type: 'personal',
      location: 'Fitness Center',
      description: 'Morning workout'
    },
    {
      id: '5',
      title: 'Client Meeting',
      date: new Date(currentYear, currentMonth, 16).toISOString().split('T')[0],
      time: '10:00',
      duration: 120,
      type: 'work',
      location: 'Client Office',
      description: 'New project discussion'
    },
    {
      id: '6',
      title: 'Dentist Appointment',
      date: new Date(currentYear, currentMonth, 17).toISOString().split('T')[0],
      time: '15:30',
      duration: 45,
      type: 'health',
      location: 'Dr. Smith Office',
      description: 'Regular checkup'
    },
    {
      id: '7',
      title: 'Movie Night',
      date: new Date(currentYear, currentMonth, 17).toISOString().split('T')[0],
      time: '19:00',
      duration: 180,
      type: 'personal',
      location: 'Cinema',
      description: 'Watch the new Marvel movie'
    },
    {
      id: '8',
      title: 'Birthday Party',
      date: new Date(currentYear, currentMonth, 18).toISOString().split('T')[0],
      time: '18:00',
      duration: 240,
      type: 'family',
      location: 'Home',
      description: 'Mike\'s birthday celebration'
    },
    {
      id: '9',
      title: 'Code Review',
      date: new Date(currentYear, currentMonth, 19).toISOString().split('T')[0],
      time: '11:00',
      duration: 60,
      type: 'work',
      location: 'Slack',
      description: 'Review pull request #123'
    },
    {
      id: '10',
      title: 'Weekend Trip',
      date: new Date(currentYear, currentMonth, 20).toISOString().split('T')[0],
      time: '08:00',
      duration: 1440,
      type: 'personal',
      location: 'Mountain Resort',
      description: 'Weekend getaway'
    },
    {
      id: '11',
      title: 'Morning Coffee',
      date: new Date(currentYear, currentMonth, today.getDate()).toISOString().split('T')[0],
      time: '08:30',
      duration: 30,
      type: 'personal',
      location: 'Local Coffee Shop',
      description: 'Start the day right'
    },
    {
      id: '12',
      title: 'Product Demo',
      date: new Date(currentYear, currentMonth, today.getDate() + 1).toISOString().split('T')[0],
      time: '13:00',
      duration: 60,
      type: 'work',
      location: 'Conference Room B',
      description: 'Demo new features to stakeholders'
    }
  ];
};

const mockEvents = generateMockEvents();

const calendarCategories = [
  { id: 'work', name: 'Work', color: '#007AFF' },
  { id: 'personal', name: 'Personal', color: '#34C759' },
  { id: 'family', name: 'Family', color: '#FF9500' },
  { id: 'health', name: 'Health', color: '#FF3B30' }
];


// Mock Music data
const mockMusicAlbums = [
  {
    id: '1',
    title: 'Midnights',
    artist: 'Taylor Swift',
    year: 2022,
    genre: 'Pop',
    cover: '🎵',
    tracks: [
      { id: '1-1', title: 'Lavender Haze', duration: '3:22', artist: 'Taylor Swift' },
      { id: '1-2', title: 'Maroon', duration: '3:38', artist: 'Taylor Swift' },
      { id: '1-3', title: 'Anti-Hero', duration: '3:20', artist: 'Taylor Swift' },
      { id: '1-4', title: 'Snow On The Beach', duration: '4:16', artist: 'Taylor Swift' },
      { id: '1-5', title: 'You\'re On Your Own, Kid', duration: '3:14', artist: 'Taylor Swift' }
    ]
  },
  {
    id: '2',
    title: 'The Dark Side of the Moon',
    artist: 'Pink Floyd',
    year: 1973,
    genre: 'Rock',
    cover: '🌙',
    tracks: [
      { id: '2-1', title: 'Speak to Me', duration: '1:30', artist: 'Pink Floyd' },
      { id: '2-2', title: 'Breathe (In the Air)', duration: '2:43', artist: 'Pink Floyd' },
      { id: '2-3', title: 'On the Run', duration: '3:36', artist: 'Pink Floyd' },
      { id: '2-4', title: 'Time', duration: '6:53', artist: 'Pink Floyd' },
      { id: '2-5', title: 'The Great Gig in the Sky', duration: '4:36', artist: 'Pink Floyd' }
    ]
  },
  {
    id: '3',
    title: 'Random Access Memories',
    artist: 'Daft Punk',
    year: 2013,
    genre: 'Electronic',
    cover: '🤖',
    tracks: [
      { id: '3-1', title: 'Give Life Back to Music', duration: '4:35', artist: 'Daft Punk' },
      { id: '3-2', title: 'The Game of Love', duration: '3:21', artist: 'Daft Punk' },
      { id: '3-3', title: 'Giorgio by Moroder', duration: '9:04', artist: 'Daft Punk' },
      { id: '3-4', title: 'Within', duration: '3:48', artist: 'Daft Punk' },
      { id: '3-5', title: 'Instant Crush', duration: '5:37', artist: 'Daft Punk' }
    ]
  },
  {
    id: '4',
    title: 'Abbey Road',
    artist: 'The Beatles',
    year: 1969,
    genre: 'Rock',
    cover: '🚶‍♂️',
    tracks: [
      { id: '4-1', title: 'Come Together', duration: '4:20', artist: 'The Beatles' },
      { id: '4-2', title: 'Something', duration: '3:03', artist: 'The Beatles' },
      { id: '4-3', title: 'Maxwell\'s Silver Hammer', duration: '3:27', artist: 'The Beatles' },
      { id: '4-4', title: 'Oh! Darling', duration: '3:26', artist: 'The Beatles' },
      { id: '4-5', title: 'Octopus\'s Garden', duration: '2:51', artist: 'The Beatles' }
    ]
  },
  {
    id: '5',
    title: 'Blonde',
    artist: 'Frank Ocean',
    year: 2016,
    genre: 'R&B',
    cover: '🌊',
    tracks: [
      { id: '5-1', title: 'Nikes', duration: '5:14', artist: 'Frank Ocean' },
      { id: '5-2', title: 'Ivy', duration: '4:09', artist: 'Frank Ocean' },
      { id: '5-3', title: 'Pink + White', duration: '3:04', artist: 'Frank Ocean' },
      { id: '5-4', title: 'Be Yourself', duration: '1:26', artist: 'Frank Ocean' },
      { id: '5-5', title: 'Solo', duration: '4:17', artist: 'Frank Ocean' }
    ]
  },
  {
    id: '6',
    title: 'In The Aeroplane Over The Sea',
    artist: 'Neutral Milk Hotel',
    year: 1998,
    genre: 'Indie',
    cover: '✈️',
    tracks: [
      { id: '6-1', title: 'King of Carrot Flowers Pt. One', duration: '2:00', artist: 'Neutral Milk Hotel' },
      { id: '6-2', title: 'King of Carrot Flowers Pts. Two & Three', duration: '3:06', artist: 'Neutral Milk Hotel' },
      { id: '6-3', title: 'In The Aeroplane Over The Sea', duration: '3:22', artist: 'Neutral Milk Hotel' },
      { id: '6-4', title: 'Two-Headed Boy', duration: '4:26', artist: 'Neutral Milk Hotel' },
      { id: '6-5', title: 'The Fool', duration: '4:54', artist: 'Neutral Milk Hotel' }
    ]
  }
];

const mockPlaylists = [
  {
    id: '1',
    name: 'Favorites',
    description: 'My favorite tracks',
    cover: '❤️',
    tracks: ['1-3', '2-4', '3-5', '4-1', '5-2']
  },
  {
    id: '2',
    name: 'Chill Vibes',
    description: 'Perfect for relaxing',
    cover: '😌',
    tracks: ['5-1', '5-3', '6-1', '6-3']
  },
  {
    id: '3',
    name: 'Workout Mix',
    description: 'High energy tracks',
    cover: '💪',
    tracks: ['1-1', '1-2', '3-1', '3-3']
  },
  {
    id: '4',
    name: 'Classic Rock',
    description: 'Timeless rock music',
    cover: '🎸',
    tracks: ['2-1', '2-2', '2-3', '4-1', '4-2']
  }
];

const YouTubeWebsite: React.FC = () => (
  <div style={{ padding: '20px', color: '#fff', fontFamily: 'Roboto,Arial,sans-serif' }}>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#FF0000', marginRight: '8px' }}>▶️</div>
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>YouTube</div>
    </div>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
      {[
        { title: 'How to Build a macOS-Style Dashboard', views: '2.1M views', time: '3 days ago', thumbnail: '🎥' },
        { title: 'React Performance Optimization Tips', views: '856K views', time: '1 week ago', thumbnail: '🎥' },
        { title: 'The Future of Web Development', views: '1.4M views', time: '2 weeks ago', thumbnail: '🎥' },
        { title: 'TypeScript Best Practices 2024', views: '623K views', time: '3 weeks ago', thumbnail: '🎥' },
        { title: 'Building Interactive Portfolios', views: '1.8M views', time: '1 month ago', thumbnail: '🎥' },
        { title: 'Next.js 15 New Features', views: '945K views', time: '1 month ago', thumbnail: '🎥' }
      ].map((video, index) => (
        <div key={index} style={{ cursor: 'pointer' }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            borderRadius: '8px', 
            height: '160px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '48px',
            marginBottom: '8px'
          }}>
            {video.thumbnail}
          </div>
          <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px', lineHeight: '1.3' }}>
            {video.title}
          </div>
          <div style={{ fontSize: '12px', color: '#aaa' }}>
            {video.views} • {video.time}
          </div>
        </div>
      ))}
    </div>
  </div>
);


const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Filter menu items based on device (client-side only)
  const filteredAppleMenuItems = typeof window !== 'undefined' 
    ? baseAppleMenuItems.filter(item => {
        if (isMobile && item === 'Simple View') return false;
        return true;
      })
    : baseAppleMenuItems;
  
  // Helper functions for file system navigation




  // Calendar helper functions
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return mockEvents.filter(event => event.date === dateString);
  };

  const getEventsForDateRange = (startDate: Date, endDate: Date) => {
    return mockEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= lastDay || days.length < 42) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  // Reminders helper functions


  // Music helper functions
  const getTrackById = (trackId: string) => {
    for (const album of mockMusicAlbums) {
      const track = album.tracks.find(t => t.id === trackId);
      if (track) return { ...track, album: album.title, albumArtist: album.artist };
    }
    return null;
  };

  const getPlaylistTracks = (playlist: any) => {
    return playlist.tracks.map((trackId: string) => getTrackById(trackId)).filter(Boolean);
  };

  const playTrack = (track: any) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setMusicView('now-playing');
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const getFilteredAlbums = () => {
    if (!searchQuery) return mockMusicAlbums;
    const query = searchQuery.toLowerCase();
    return mockMusicAlbums.filter(album => 
      album.title.toLowerCase().includes(query) ||
      album.artist.toLowerCase().includes(query) ||
      album.genre.toLowerCase().includes(query)
    );
  };

  // Messages helper functions
  const sendMessage = () => {
    if (!newMessageText.trim() || !selectedConversation) return;
    
    const newMessage: Message = {
      id: Date.now(),
      sender: 'Me',
      text: newMessageText.trim(),
      time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
      isMe: true
    };
    
    setConversations(prev => ({
      ...prev,
      [selectedConversation]: {
        ...prev[selectedConversation],
        messages: [...prev[selectedConversation].messages, newMessage]
      }
    }));
    setNewMessageText('');
    
    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        'That sounds great! 😊',
        'I see what you mean',
        'Thanks for letting me know!',
        'Got it 👍',
        'Interesting!',
        'I\'ll get back to you soon',
        'Perfect!',
        'Sounds good to me'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const responseMessage: Message = {
        id: Date.now() + 1,
        sender: selectedConversation,
        text: randomResponse,
        time: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }),
        isMe: false
      };
      
      setConversations(prev => ({
        ...prev,
        [selectedConversation]: {
          ...prev[selectedConversation],
          messages: [...prev[selectedConversation].messages, responseMessage]
        }
      }));
    }, 2000 + Math.random() * 3000);
  };

  const handleMessageKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Real-time clock state
  const [time, setTime] = useState(() => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  });
  const [date, setDate] = useState(() => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  });
  const [appleMenuOpen, setAppleMenuOpen] = useState(false);
  const [finderMenuOpen, setFinderMenuOpen] = useState(false);
  const [wifiMenuOpen, setWifiMenuOpen] = useState(false);
  const [batteryMenuOpen, setBatteryMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [brightnessSliderOpen, setBrightnessSliderOpen] = useState(false);
  const [volumeSliderOpen, setVolumeSliderOpen] = useState(false);
  const [exitMenuOpen, setExitMenuOpen] = useState(false);
  const [brightness, setBrightness] = useState(70);
  const [volume, setVolume] = useState(60);
  const [isDraggingBrightness, setIsDraggingBrightness] = useState(false);
  const [isDraggingVolume, setIsDraggingVolume] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [itemPositions, setItemPositions] = useState({
    weather: { x: 4, y: 32 },
    Projects: { x: 9, y: 222 },
    Photos: { x: 9, y: 312 },
    FidOS: { x: 9, y: 402 }
  });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dockPressedIndex, setDockPressedIndex] = useState<number | null>(null);
  const [systemBarHover, setSystemBarHover] = useState<string | null>(null);
  const [systemBarPressed, setSystemBarPressed] = useState<string | null>(null);
  const [isTrashEmpty, setIsTrashEmpty] = useState(false);
  const [trashMenuOpen, setTrashMenuOpen] = useState(false);
  const [trashMenuPosition, setTrashMenuPosition] = useState({ x: 0, y: 0 });
  const trashMenuRef = useRef<HTMLDivElement>(null);
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);
  const [openDockApp, setOpenDockApp] = useState<string | null>(null);
  const [dockAppWindowPosition, setDockAppWindowPosition] = useState({ x: 100, y: 100 });
  const [isDraggingDockWindow, setIsDraggingDockWindow] = useState(false);
  const [dockWindowDragStart, setDockWindowDragStart] = useState({ x: 0, y: 0 });
  const [finderInitialFolder, setFinderInitialFolder] = useState<string | null>(null);
  const [systemSettingsOpen, setSystemSettingsOpen] = useState(false);
  const [systemSettingsSection, setSystemSettingsSection] = useState('general');

  // Function to center windows on screen
  const centerWindow = (appName?: string) => {
    let windowWidth = 900; // Default size for most windows
    let windowHeight = 650; // Default size for most windows
    
    // Handle special cases for different window sizes
    if (appName === 'Finder') {
      windowWidth = 800;
      windowHeight = 600;
    } else if (appName === 'VS Code' || appName === 'Notion') {
      windowWidth = 1000;
      windowHeight = 700;
    } else if (appName === 'Launchpad') {
      // Launchpad is full screen, so no centering needed
      return { x: 0, y: 0 };
    }
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    const x = Math.max(0, (screenWidth - windowWidth) / 2);
    const y = Math.max(0, (screenHeight - windowHeight) / 2);
    
    return { x, y };
  };
  

  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [showWelcomeTooltip, setShowWelcomeTooltip] = useState(true);
  const [composeOpen, setComposeOpen] = useState(false);
  const [calendarView, setCalendarView] = useState<'month' | 'week' | 'day'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [musicView, setMusicView] = useState<'library' | 'playlists' | 'search' | 'now-playing'>('library');
  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessageText, setNewMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Message type definitions
  type Message = {
    id: number;
    sender: string;
    time: string;
    isMe: boolean;
  } & (
    | { type?: undefined; text: string; duration?: undefined }
    | { type: 'voice'; text?: undefined; duration: string }
  );

  // Mock conversations data
  const mockConversations: Record<string, { messages: Message[] }> = {
    'Mama': {
      messages: [
        { id: 1, sender: 'Mama', text: 'Gordo que haces papi?', time: '2:30 PM', isMe: false },
        { id: 2, sender: 'Me', text: 'Mama, nada ma workeando. Ya casi termino el proycto', time: '2:32 PM', isMe: true },
        { id: 3, sender: 'Mama', text: 'Bendito Dios papi que bueno. Y ya comiste?', time: '2:35 PM', isMe: false },
        { id: 4, sender: 'Me', text: 'Sí ma, justo almorzando estoy', time: '2:36 PM', isMe: true },
        { id: 5, sender: 'Mama', text: 'Oki papi, provecho love you', time: '2:38 PM', isMe: false },
        { id: 6, sender: 'Me', text: 'LY too ma 😘', time: '2:40 PM', isMe: true }
      ]
    },
    'Papá': {
      messages: [
        { id: 1, sender: 'Papá', text: 'Son. Good Afternoon', time: '1:15 PM', isMe: false },
        { id: 2, sender: 'Me', text: 'Papa, good afternoon. Como estas pa?', time: '1:17 PM', isMe: true },
        { id: 3, sender: 'Papá', type: 'voice', duration: '1:12', time: '1:20 PM', isMe: false },
        { id: 4, sender: 'Me', text: 'Jajaja thank you pa 🙏🏽 Glad you liked it, ILY sir', time: '1:22 PM', isMe: true },
        { id: 5, sender: 'Papá', text: '💙💙 👊🏼', time: '1:25 PM', isMe: false }
      ]
    },
    'Dani🤍🌙': {
      messages: [
        { id: 1, sender: 'Dani🤍🌙', text: 'mi guapo🥺 ya le contesto mi amor estoy en meeting', time: '3:45 PM', isMe: false },
        { id: 2, sender: 'Me', text: 'mi amorsote 🥰 tranqui jaja, estoy editando el dashboard', time: '3:47 PM', isMe: true },
        { id: 3, sender: 'Dani🤍🌙', text: 'aaaaaa enseñeme 🥺🥺 yo quiero verlo', time: '3:50 PM', isMe: false },
        { id: 4, sender: 'Me', text: 'pereme ombe jajaj tenga juicio, todavia le falta', time: '3:52 PM', isMe: true },
        { id: 5, sender: 'Dani🤍🌙', text: 'jajaja ta bien mi amol ti amo!!', time: '3:55 PM', isMe: false },
        { id: 6, sender: 'Me', text: 'ti amooo más mi amor🤍', time: '3:56 PM', isMe: true }
      ]
    }
  };

  const [conversations, setConversations] = useState(mockConversations);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (selectedConversation) {
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  }, [selectedConversation, conversations]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }));
      setDate(now.toLocaleDateString('en-US', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-hide welcome tooltip after 30 seconds
  useEffect(() => {
    if (showWelcomeTooltip) {
      const timer = setTimeout(() => {
        setShowWelcomeTooltip(false);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeTooltip]);


  // Mouse move handlers for sliders and desktop dragging
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingBrightness && brightnessSliderOpen) {
        const slider = document.querySelector('.brightness-slider-dropdown .slider-track') as HTMLElement;
        if (slider) {
          const rect = slider.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
          setBrightness(Math.round(percentage));
        }
      }
      if (isDraggingVolume && volumeSliderOpen) {
        const slider = document.querySelector('.volume-slider-dropdown .slider-track') as HTMLElement;
        if (slider) {
          const rect = slider.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
          setVolume(Math.round(percentage));
        }
      }
      if (draggedItem) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        setDragOffset({ x: deltaX, y: deltaY });
        // Update the actual position in real-time for smoother experience
        setItemPositions(prev => ({
          ...prev,
          [draggedItem]: {
            x: prev[draggedItem as keyof typeof prev].x + deltaX,
            y: prev[draggedItem as keyof typeof prev].y + deltaY
          }
        }));
        setDragStart({ x: e.clientX, y: e.clientY });
        setDragOffset({ x: 0, y: 0 });
      }

      if (isDraggingDockWindow) {
        const deltaX = e.clientX - dockWindowDragStart.x;
        const deltaY = e.clientY - dockWindowDragStart.y;
        setDockAppWindowPosition(prev => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY
        }));
        setDockWindowDragStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      setIsDraggingBrightness(false);
      setIsDraggingVolume(false);
      setDragOffset({ x: 0, y: 0 });
      setDraggedItem(null);
      setIsDraggingDockWindow(false);
    };

    if (isDraggingBrightness || isDraggingVolume || draggedItem || isDraggingDockWindow) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingBrightness, isDraggingVolume, brightnessSliderOpen, volumeSliderOpen, draggedItem, dragStart, isDraggingDockWindow, dockWindowDragStart]);



  useEffect(() => {
    // Close menus on click outside
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.apple-menu-trigger, .apple-menu-dropdown')) {
        setAppleMenuOpen(false);
      }
      if (!(e.target as HTMLElement).closest('.finder-menu-trigger, .finder-menu-dropdown')) {
        setFinderMenuOpen(false);
      }
      if (!(e.target as HTMLElement).closest('.wifi-menu-trigger, .wifi-menu-dropdown')) {
        setWifiMenuOpen(false);
      }
      if (!(e.target as HTMLElement).closest('.battery-menu-trigger, .battery-menu-dropdown')) {
        setBatteryMenuOpen(false);
      }
      if (!(e.target as HTMLElement).closest('.user-menu-trigger, .user-menu-dropdown')) {
        setUserMenuOpen(false);
      }
      if (!(e.target as HTMLElement).closest('.brightness-menu-trigger, .brightness-slider-dropdown')) {
        setBrightnessSliderOpen(false);
      }
      if (!(e.target as HTMLElement).closest('.volume-menu-trigger, .volume-slider-dropdown')) {
        setVolumeSliderOpen(false);
      }
      if (!(e.target as HTMLElement).closest('.exit-menu-trigger, .exit-menu-dropdown')) {
        setExitMenuOpen(false);
      }
    };
    if (appleMenuOpen || finderMenuOpen || wifiMenuOpen || batteryMenuOpen || userMenuOpen || brightnessSliderOpen || volumeSliderOpen || exitMenuOpen) {
      window.addEventListener('mousedown', handleClick);
    }
    return () => window.removeEventListener('mousedown', handleClick);
  }, [appleMenuOpen, finderMenuOpen, wifiMenuOpen, batteryMenuOpen, userMenuOpen, brightnessSliderOpen, volumeSliderOpen, exitMenuOpen]);

  

  useEffect(() => {
    if (openDockApp) {
      const width = 800;
      const height = 600;
      const x = Math.max(0, Math.round((window.innerWidth - width) / 2));
      const y = Math.max(0, Math.round((window.innerHeight - height) / 2));
      setDockAppWindowPosition({ x, y });
    }
  }, [openDockApp]);

  // Reset Trash to full on refresh
  useEffect(() => {
    setIsTrashEmpty(false);
  }, []);

  // Hide trash context menu on click outside
  useEffect(() => {
    if (!trashMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        trashMenuRef.current &&
        !trashMenuRef.current.contains(e.target as Node)
      ) {
        setTrashMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [trashMenuOpen]);

  // System state management
  const [systemState, setSystemState] = useState<'normal' | 'restarting' | 'shutting-down' | 'waking-up'>('normal');
  const [restartProgress, setRestartProgress] = useState(0);
  const [shutdownProgress, setShutdownProgress] = useState(0);
  const [wakeUpProgress, setWakeUpProgress] = useState(0);
  const [restartMessage, setRestartMessage] = useState('');
  const [shutdownMessage, setShutdownMessage] = useState('');
  const [wakeUpMessage, setWakeUpMessage] = useState('');
  const [aboutThisMacOpen, setAboutThisMacOpen] = useState(false);

  // Restart messages for variety
  const restartMessages = [
    "Updating system preferences...",
    "Saving your work...",
    "Cleaning up temporary files...",
    "Preparing for restart...",
    "Almost there...",
    "Finalizing restart sequence..."
  ];

  // Shutdown messages for variety
  const shutdownMessages = [
    "Saving your work...",
    "Closing applications...",
    "Shutting down services...",
    "Preparing for sleep...",
    "Almost ready to sleep...",
    "Final preparations..."
  ];

  // Handle restart
  const handleRestart = () => {
    setSystemState('restarting');
    setRestartProgress(0);
    setRestartMessage(restartMessages[0]);
    
    let progress = 0;
    let messageIndex = 0;
    
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5; // Random progress between 5-20%
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // After restart completes, route to lockscreen
        setTimeout(() => {
          window.location.href = '/lockscreen';
        }, 1000);
      } else {
        // Update message every 20% progress
        if (progress > (messageIndex + 1) * 16.67) {
          messageIndex = Math.min(messageIndex + 1, restartMessages.length - 1);
          setRestartMessage(restartMessages[messageIndex]);
        }
      }
      
      setRestartProgress(progress);
    }, 200);
  };

  // Handle shutdown
  const handleShutdown = () => {
    setSystemState('shutting-down');
    setShutdownProgress(0);
    setShutdownMessage(shutdownMessages[0]);
    
    let progress = 0;
    let messageIndex = 0;
    
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 3; // Random progress between 3-15%
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // After shutdown completes, stay in shutdown state
        setTimeout(() => {
          setShutdownMessage("Shhh computer's sleeping 🤫");
        }, 500);
      } else {
        // Update message every 16.67% progress
        if (progress > (messageIndex + 1) * 16.67) {
          messageIndex = Math.min(messageIndex + 1, shutdownMessages.length - 1);
          setShutdownMessage(shutdownMessages[messageIndex]);
        }
      }
      
      setShutdownProgress(progress);
    }, 300);
  };

  // Wake up messages for variety
  const wakeUpMessages = [
    "Initializing system...",
    "Loading core services...",
    "Starting user interface...",
    "Preparing desktop...",
    "Almost ready...",
    "Welcome back!"
  ];

  // Handle turn on
  const handleTurnOn = () => {
    setSystemState('waking-up');
    setWakeUpProgress(0);
    setWakeUpMessage(wakeUpMessages[0]);
    
    let progress = 0;
    let messageIndex = 0;
    
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 7; // Random progress between 7-25%
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // After wake up completes, route to lockscreen
        setTimeout(() => {
          window.location.href = '/lockscreen';
        }, 800);
      } else {
        // Update message every 16.67% progress
        if (progress > (messageIndex + 1) * 16.67) {
          messageIndex = Math.min(messageIndex + 1, wakeUpMessages.length - 1);
          setWakeUpMessage(wakeUpMessages[messageIndex]);
        }
      }
      
      setWakeUpProgress(progress);
    }, 150);
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundImage: 'url(/wallpaper.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Global Dropdown Animation Keyframes */}
      <style>{`
        @keyframes dropdownFadeIn {
          0% { opacity: 0; transform: translateY(8px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes welcomeTooltipFadeIn {
          0% { 
            opacity: 0; 
            transform: translateY(-8px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
      `}</style>
      {/* Restart Screen */}
      {systemState === 'restarting' && (
        <div 
          className="fixed inset-0 flex flex-col items-center justify-center z-[999999]"
          style={{ 
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
          }}
        >
          <div className="text-center">
            <div className="mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              </div>
              <div className="text-white text-2xl font-semibold mb-2">Restarting...</div>
              <div className="text-gray-400 text-sm mb-6">{restartMessage}</div>
            </div>
            
            {/* Progress bar */}
            <div className="w-80 h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${restartProgress}%` }}
              />
            </div>
            
            <div className="text-gray-500 text-xs">
              {Math.round(restartProgress)}% complete
            </div>
          </div>
        </div>
      )}

      {/* Shutdown Screen */}
      {systemState === 'shutting-down' && (
        <div 
          className="fixed inset-0 flex flex-col items-center justify-center z-[999999]"
          style={{ 
            background: shutdownProgress < 100 
              ? 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
              : '#000000',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
          }}
        >
          <div className="text-center">
            {shutdownProgress < 100 ? (
              <>
                <div className="mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="text-white text-2xl font-semibold mb-2">Shutting Down...</div>
                  <div className="text-gray-400 text-sm mb-6">{shutdownMessage}</div>
                </div>
                
                {/* Progress bar */}
                <div className="w-80 h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${shutdownProgress}%` }}
                  />
                </div>
                
                <div className="text-gray-500 text-xs">
                  {Math.round(shutdownProgress)}% complete
                </div>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <div className="text-white text-2xl font-semibold mb-2">Computer Off</div>
                  <div className="text-gray-400 text-sm mb-6">{shutdownMessage}</div>
                </div>
                
                {/* Turn On Button */}
                <button
                  onClick={handleTurnOn}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-sm"
                  style={{
                    background: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
                    boxShadow: '0 4px 16px rgba(0, 122, 255, 0.3)',
                  }}
                >
                  Turn On
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Wake Up Screen */}
      {systemState === 'waking-up' && (
        <div 
          className="fixed inset-0 flex flex-col items-center justify-center z-[999999]"
          style={{ 
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
          }}
        >
          <div className="text-center">
            <div className="mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <svg className="w-8 h-8 text-white animate-pulse" fill="none" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="text-white text-2xl font-semibold mb-2">Starting Up...</div>
              <div className="text-gray-300 text-sm mb-6">{wakeUpMessage}</div>
            </div>
            
            {/* Progress bar */}
            <div className="w-80 h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${wakeUpProgress}%` }}
              />
            </div>
            
            <div className="text-gray-400 text-xs">
              {Math.round(wakeUpProgress)}% complete
            </div>
          </div>
        </div>
      )}

      {/* System Bar */}
      <div className="absolute top-0 left-0 w-full h-10 flex items-center px-4" style={{ background: 'rgba(20, 22, 34, 0.48)', backdropFilter: 'blur(18px) saturate(1.5)', zIndex: 10 }}>
        {/* Apple logo, Finder, menu, system icons, clock, avatar, etc. Placeholder for now */}
        <span
          className="font-bold text-white mr-4 apple-menu-trigger"
          style={{ fontSize: 13, textShadow: '0 2.5px 8px rgba(0,0,0,0.28)', letterSpacing: '0.04em', cursor: 'pointer', position: 'relative' }}
          onClick={() => setAppleMenuOpen(v => !v)}
        >
          
        </span>
        <span
          className="font-bold text-white mr-4 finder-menu-trigger"
          style={{ fontSize: 13, textShadow: '0 2.5px 8px rgba(0,0,0,0.28)', letterSpacing: '0.04em', cursor: 'pointer', position: 'relative' }}
          onClick={() => setFinderMenuOpen(v => !v)}
        >
          Finder
        </span>
        {/* ...menu items... */}
        <div className="flex-1" />
        {/* System icons */}
        <span 
          className="mx-2 text-white opacity-80 brightness-menu-trigger" 
          style={{ 
            textShadow: '0 2.5px 8px rgba(0,0,0,0.28)', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.16s cubic-bezier(.4,0,.2,1), box-shadow 0.16s cubic-bezier(.4,0,.2,1)',
            transform: systemBarPressed === 'brightness' ? 'scale(0.93)' : systemBarHover === 'brightness' ? 'scale(1.11)' : 'scale(1)',
            boxShadow: systemBarHover === 'brightness' || systemBarPressed === 'brightness' ? '0 4px 16px 0 rgba(0,0,0,0.18)' : 'none',
          }}
          onClick={() => setBrightnessSliderOpen(v => !v)}
          onMouseEnter={() => setSystemBarHover('brightness')}
          onMouseLeave={() => setSystemBarHover(null)}
          onMouseDown={() => setSystemBarPressed('brightness')}
          onMouseUp={() => setSystemBarPressed(null)}
          onMouseOut={() => setSystemBarPressed(null)}
        >
          <Sun size={16} />
        </span>
        <span 
          className="mx-2 text-white opacity-80 volume-menu-trigger" 
          style={{ 
            textShadow: '0 2.5px 8px rgba(0,0,0,0.28)', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.16s cubic-bezier(.4,0,.2,1), box-shadow 0.16s cubic-bezier(.4,0,.2,1)',
            transform: systemBarPressed === 'volume' ? 'scale(0.93)' : systemBarHover === 'volume' ? 'scale(1.11)' : 'scale(1)',
            boxShadow: systemBarHover === 'volume' || systemBarPressed === 'volume' ? '0 4px 16px 0 rgba(0,0,0,0.18)' : 'none',
          }}
          onClick={() => setVolumeSliderOpen(v => !v)}
          onMouseEnter={() => setSystemBarHover('volume')}
          onMouseLeave={() => setSystemBarHover(null)}
          onMouseDown={() => setSystemBarPressed('volume')}
          onMouseUp={() => setSystemBarPressed(null)}
          onMouseOut={() => setSystemBarPressed(null)}
        >
          <Volume2 size={16} />
        </span>
        <span 
          className="mx-2 text-white opacity-80 battery-menu-trigger" 
          style={{
            textShadow: '0 2.5px 8px rgba(0,0,0,0.28)',
            cursor: 'pointer',
            transition: 'transform 0.16s cubic-bezier(.4,0,.2,1), box-shadow 0.16s cubic-bezier(.4,0,.2,1)',
            transform: systemBarPressed === 'battery' ? 'scale(0.93)' : systemBarHover === 'battery' ? 'scale(1.11)' : 'scale(1)',
            boxShadow: systemBarHover === 'battery' || systemBarPressed === 'battery' ? '0 4px 16px 0 rgba(0,0,0,0.18)' : 'none',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => setBatteryMenuOpen(v => !v)}
          onMouseEnter={() => setSystemBarHover('battery')}
          onMouseLeave={() => setSystemBarHover(null)}
          onMouseDown={() => setSystemBarPressed('battery')}
          onMouseUp={() => setSystemBarPressed(null)}
          onMouseOut={() => setSystemBarPressed(null)}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" style={{ filter: 'drop-shadow(0 1.5px 4px rgba(0,0,0,0.18))' }}>
            <rect x="1" y="4" width="18" height="8" rx="3" stroke="#f4f4f5" strokeWidth="1.4"/>
            <path d="M20.2 7a1 1 0 0 1 2 1 1 1 0 0 1-2 1z" fill="#f4f4f5"/>
            <rect x="3.2" y="5.7" width="10.5" height="4.6" rx="1.2" fill="white"/>
          </svg>
        </span>
        <span 
          className="mx-2 text-white opacity-80 wifi-menu-trigger" 
          style={{
            textShadow: '0 2.5px 8px rgba(0,0,0,0.28)',
            cursor: 'pointer',
            transition: 'transform 0.16s cubic-bezier(.4,0,.2,1), box-shadow 0.16s cubic-bezier(.4,0,.2,1)',
            transform: systemBarPressed === 'wifi' ? 'scale(0.93)' : systemBarHover === 'wifi' ? 'scale(1.11)' : 'scale(1)',
            boxShadow: systemBarHover === 'wifi' || systemBarPressed === 'wifi' ? '0 4px 16px 0 rgba(0,0,0,0.18)' : 'none',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => setWifiMenuOpen(v => !v)}
          onMouseEnter={() => setSystemBarHover('wifi')}
          onMouseLeave={() => setSystemBarHover(null)}
          onMouseDown={() => setSystemBarPressed('wifi')}
          onMouseUp={() => setSystemBarPressed(null)}
          onMouseOut={() => setSystemBarPressed(null)}
        >
          <WifiCog size={16} />
        </span>
        <span 
          className="mx-2 text-white opacity-80 exit-menu-trigger"
          style={{
            textShadow: '0 2.5px 8px rgba(0,0,0,0.28)',
            cursor: 'pointer',
            transition: 'transform 0.16s cubic-bezier(.4,0,.2,1), box-shadow 0.16s cubic-bezier(.4,0,.2,1)',
            transform: systemBarPressed === 'exit' ? 'scale(0.93)' : systemBarHover === 'exit' ? 'scale(1.11)' : 'scale(1)',
            boxShadow: systemBarHover === 'exit' || systemBarPressed === 'exit' ? '0 4px 16px 0 rgba(0,0,0,0.18)' : 'none',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => setExitMenuOpen(v => !v)}
          onMouseEnter={() => setSystemBarHover('exit')}
          onMouseLeave={() => setSystemBarHover(null)}
          onMouseDown={() => setSystemBarPressed('exit')}
          onMouseUp={() => setSystemBarPressed(null)}
          onMouseOut={() => setSystemBarPressed(null)}
        >
          <LogOut size={16} />
        </span>
        <span className="ml-4 text-white opacity-90" style={{ fontWeight: 700, fontSize: 13, textShadow: '0 2.5px 8px rgba(0,0,0,0.28)' }}>{date}</span>
        <span className="ml-2 text-white opacity-90" style={{ fontWeight: 700, fontSize: 13, textShadow: '0 2.5px 8px rgba(0,0,0,0.28)' }}>{time}</span>
        <img 
          src="/avatar.webp" 
          alt="avatar" 
          className="ml-3 w-7 h-7 rounded-full object-cover border border-white/40 user-menu-trigger" 
          style={{
            cursor: 'pointer',
            transition: 'transform 0.16s cubic-bezier(.4,0,.2,1), box-shadow 0.16s cubic-bezier(.4,0,.2,1)',
            transform: systemBarPressed === 'user' ? 'scale(0.93)' : systemBarHover === 'user' ? 'scale(1.11)' : 'scale(1)',
            boxShadow: systemBarHover === 'user' || systemBarPressed === 'user'
              ? '0 4px 16px 0 rgba(0,0,0,0.18)'
              : '0 2.5px 8px rgba(0,0,0,0.28)',
          }}
          onClick={() => setUserMenuOpen(v => !v)}
          onMouseEnter={() => setSystemBarHover('user')}
          onMouseLeave={() => setSystemBarHover(null)}
          onMouseDown={() => setSystemBarPressed('user')}
          onMouseUp={() => setSystemBarPressed(null)}
          onMouseOut={() => setSystemBarPressed(null)}
        />
      </div>
      
      {/* Welcome Tooltip */}
      {showWelcomeTooltip && (
        <div
          style={{
            position: 'fixed',
            right: '5px',
            top: '50px',
            background: 'rgba(30, 28, 26, 0.98)',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '18px',
            fontSize: '13px',
            fontWeight: '500',
            maxWidth: '280px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            zIndex: 1000,
            animation: 'welcomeTooltipFadeIn 0.4s cubic-bezier(.4,0,.2,1)',
            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
            lineHeight: '1.4',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            transition: 'transform 0.2s cubic-bezier(.4,0,.2,1)',
          }}
          onClick={() => setShowWelcomeTooltip(false)}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={{ marginBottom: '4px', fontWeight: '600' }}>Welcome to my digital portfolio! 👋</div>
          <div>Feel free to poke around: Open apps, explore projects, drag & drop, even empty the trash 😅 Everything's fair game. Have fun! - Fidel</div>

          {/* Speech bubble arrow pointing to avatar */}
          <div
            style={{
              position: 'absolute',
              right: '16px',
              top: '-7px',
              width: '0',
              height: '0',
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderBottom: '8px solid rgba(30, 28, 26, 0.98)',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
          />
        </div>
      )}
      
      {/* Apple Menu Dropdown - Positioned at root level */}
      {appleMenuOpen && (
        <div
          className="apple-menu-dropdown"
          style={{
            position: 'fixed',
            left: 16,
            top: 44,
            minWidth: 180,
            background: 'rgba(30, 28, 26, 0.98)',
            borderRadius: 14,
            boxShadow: '0 12px 40px 0 rgba(0,0,0,0.28)',
            padding: '6px 0',
            zIndex: 999999,
            color: '#fff',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
            userSelect: 'none',
            animation: 'dropdownFadeIn 0.22s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {filteredAppleMenuItems.map((item, i) =>
            item === '-' ? (
              <div key={i} style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '5px 0' }} />
            ) : (
              <div
                key={item}
                style={{
                  padding: '5px 16px 5px 16px',
                  cursor: 'pointer',
                  transition: 'background 0.13s',
                }}
                onMouseDown={e => e.preventDefault()}
                onClick={() => {
                  setAppleMenuOpen(false);
                  if (item === 'About This Mac') {
                    setAboutThisMacOpen(true);
                    setDockAppWindowPosition(centerWindow('About This Mac'));
                  } else if (item === 'Simple View') {
                    window.location.href = '/simple';
                  } else if (item === 'System Settings…') {
                    setOpenDockApp('System Settings');
                    setSystemSettingsSection('general');
                    setDockAppWindowPosition(centerWindow('System Settings'));
                  } else if (item === 'Restart…') {
                    handleRestart();
                  } else if (item === 'Shut Down…') {
                    handleShutdown();
                  } else if (item === 'Log Out Fidel Fúnez C.') {
                    window.location.href = '/lockscreen';
                  }
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {item}
              </div>
            )
          )}
        </div>
      )}
      
      {/* Finder Menu Dropdown - Positioned at root level */}
      {finderMenuOpen && (
        <div
          className="finder-menu-dropdown"
          style={{
            position: 'fixed',
            left: 60,
            top: 44,
            minWidth: 180,
            background: 'rgba(30, 28, 26, 0.98)',
            borderRadius: 14,
            boxShadow: '0 12px 40px 0 rgba(0,0,0,0.28)',
            padding: '6px 0',
            zIndex: 999999,
            color: '#fff',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
            userSelect: 'none',
            animation: 'dropdownFadeIn 0.22s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {finderMenuItems.map((item, i) =>
            item === '-' ? (
              <div key={i} style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '5px 0' }} />
            ) : (
              <div
                key={item}
                style={{
                  padding: '5px 16px 5px 16px',
                  cursor: 'pointer',
                  transition: 'background 0.13s',
                }}
                onMouseDown={e => e.preventDefault()}
                onClick={() => setFinderMenuOpen(false)}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {item}
              </div>
            )
          )}
        </div>
      )}
      
      {/* WiFi Menu Dropdown */}
      {wifiMenuOpen && (
        <div
          className="wifi-menu-dropdown"
          style={{
            position: 'fixed',
            right: 160,
            top: 44,
            minWidth: 200,
            background: 'rgba(30, 28, 26, 0.98)',
            borderRadius: 14,
            boxShadow: '0 12px 40px 0 rgba(0,0,0,0.28)',
            padding: '6px 0',
            zIndex: 999999,
            color: '#fff',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
            userSelect: 'none',
            animation: 'dropdownFadeIn 0.22s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {wifiMenuItems.map((item, i) =>
            item === '-' ? (
              <div key={i} style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '5px 0' }} />
            ) : (
              <div
                key={item}
                style={{
                  padding: '5px 16px 5px 16px',
                  cursor: 'pointer',
                  transition: 'background 0.13s',
                }}
                onMouseDown={e => e.preventDefault()}
                onClick={() => {
                  setWifiMenuOpen(false);
                  if (item === 'Other Networks…' || item === 'Open Network Preferences…') {
                    // Open System Settings with Network section selected
                    setSystemSettingsOpen(true);
                    setSystemSettingsSection('network');
                    setDockAppWindowPosition(centerWindow('System Settings'));
                  }
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {item}
              </div>
            )
          )}
        </div>
      )}
      
      {/* Battery Menu Dropdown */}
      {batteryMenuOpen && (
        <div
          className="battery-menu-dropdown"
          style={{
            position: 'fixed',
            right: 200,
            top: 44,
            minWidth: 220,
            background: 'rgba(30, 28, 26, 0.98)',
            borderRadius: 14,
            boxShadow: '0 12px 40px 0 rgba(0,0,0,0.28)',
            padding: '6px 0',
            zIndex: 999999,
            color: '#fff',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
            userSelect: 'none',
            animation: 'dropdownFadeIn 0.22s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {batteryMenuItems.map((item, i) =>
            item === '-' ? (
              <div key={i} style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '5px 0' }} />
            ) : (
              <div
                key={item}
                style={{
                  padding: '5px 16px 5px 16px',
                  cursor: 'pointer',
                  transition: 'background 0.13s',
                }}
                onMouseDown={e => e.preventDefault()}
                onClick={() => {
                  setBatteryMenuOpen(false);
                  if (item === 'Show Battery Settings' || item === 'Open Energy Saver Preferences…') {
                    // Open System Settings with Battery section selected
                    setSystemSettingsOpen(true);
                    setSystemSettingsSection('battery');
                    setDockAppWindowPosition(centerWindow('System Settings'));
                  }
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {item}
              </div>
            )
          )}
        </div>
      )}
      
      {/* User Menu Dropdown */}
      {userMenuOpen && (
        <div
          className="user-menu-dropdown"
          style={{
            position: 'fixed',
            right: 16,
            top: 44,
            minWidth: 200,
            background: 'rgba(30, 28, 26, 0.98)',
            borderRadius: 14,
            boxShadow: '0 12px 40px 0 rgba(0,0,0,0.28)',
            padding: '6px 0',
            zIndex: 999999,
            color: '#fff',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
            userSelect: 'none',
            animation: 'dropdownFadeIn 0.22s cubic-bezier(.4,0,.2,1)',
          }}
        >
          {userMenuItems.map((item, i) =>
            item === '-' ? (
              <div key={i} style={{ height: 1, background: 'rgba(255,255,255,0.10)', margin: '5px 0' }} />
            ) : (
              <div
                key={item}
                style={{
                  padding: '5px 16px 5px 16px',
                  cursor: 'pointer',
                  transition: 'background 0.13s',
                }}
                onMouseDown={e => e.preventDefault()}
                onClick={() => {
                  setUserMenuOpen(false);
                  if (item === 'Account Settings…') {
                    setOpenDockApp('System Settings');
                    setSystemSettingsSection('account');
                    setDockAppWindowPosition(centerWindow('System Settings'));
                  } else if (item === 'Restart…') {
                    handleRestart();
                  } else if (item === 'Shut Down…') {
                    handleShutdown();
                  } else if (item === 'Log Out Fidel Fúnez C.') {
                    window.location.href = '/lockscreen';
                  }
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {item}
              </div>
            )
          )}
        </div>
      )}
      
      {/* Exit Menu Dropdown */}
      {exitMenuOpen && (
        <div
          className="exit-menu-dropdown"
          style={{
            position: 'fixed',
            right: 120,
            top: 44,
            minWidth: 200,
            background: 'rgba(30, 28, 26, 0.98)',
            borderRadius: 14,
            boxShadow: '0 12px 40px 0 rgba(0,0,0,0.28)',
            padding: '12px',
            zIndex: 999999,
            color: '#fff',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
            userSelect: 'none',
            animation: 'dropdownFadeIn 0.22s cubic-bezier(.4,0,.2,1)',
          }}
        >
          <div style={{ marginBottom: '8px', fontSize: 12, opacity: 0.9, lineHeight: '1.3', textAlign: 'center' }}>
            Switch to Simple View
          </div>
          <button
            style={{
              background: 'linear-gradient(135deg, #007AFF, #5AC8FA)',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 12px',
              color: '#fff',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0,122,255,0.3)',
              width: '100%',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,122,255,0.4)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #0056CC, #4A9FE6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,122,255,0.3)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #007AFF, #5AC8FA)';
            }}
            onClick={() => {
              setExitMenuOpen(false);
              window.location.href = '/simple';
            }}
          >
            Simple View
          </button>
        </div>
      )}
      
      {/* Brightness Slider Dropdown */}
      {brightnessSliderOpen && (
        <div
          className="brightness-slider-dropdown"
          style={{
            position: 'fixed',
            right: 280,
            top: 44,
            width: 280,
            background: 'rgba(30, 28, 26, 0.98)',
            borderRadius: 14,
            boxShadow: '0 12px 40px 0 rgba(0,0,0,0.28)',
            padding: '16px',
            zIndex: 999999,
            color: '#fff',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
            userSelect: 'none',
            animation: 'dropdownFadeIn 0.22s cubic-bezier(.4,0,.2,1)',
          }}
        >
          <div style={{ marginBottom: '12px', fontSize: 12, opacity: 0.8 }}>Display Brightness</div>
          <div 
            className="slider-track"
            style={{ position: 'relative', height: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', cursor: 'pointer' }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
              setBrightness(Math.round(percentage));
            }}
            onMouseDown={(e) => {
              setIsDraggingBrightness(true);
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
              setBrightness(Math.round(percentage));
            }}
          >
            <div style={{ 
              position: 'absolute', 
              left: 0, 
              top: 0, 
              height: '100%', 
              width: `${brightness}%`, 
              background: 'linear-gradient(90deg, #FF3B30, #FF9500)', 
              borderRadius: '10px',
              transition: 'width 0.1s ease'
            }} />
            <div style={{ 
              position: 'absolute', 
              left: `calc(${brightness}% - 8px)`, 
              top: '2px', 
              width: '16px', 
              height: '16px', 
              background: '#fff', 
              borderRadius: '50%', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'left 0.1s ease'
            }} />
          </div>
          <div style={{ marginTop: '8px', fontSize: 11, opacity: 0.6 }}>{brightness}%</div>
        </div>
      )}
      
      {/* Volume Slider Dropdown */}
      {volumeSliderOpen && (
        <div
          className="volume-slider-dropdown"
          style={{
            position: 'fixed',
            right: 240,
            top: 44,
            width: 280,
            background: 'rgba(30, 28, 26, 0.98)',
            borderRadius: 14,
            boxShadow: '0 12px 40px 0 rgba(0,0,0,0.28)',
            padding: '16px',
            zIndex: 999999,
            color: '#fff',
            fontSize: 13,
            fontWeight: 500,
            fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
            userSelect: 'none',
            animation: 'dropdownFadeIn 0.22s cubic-bezier(.4,0,.2,1)',
          }}
        >
          <div style={{ marginBottom: '12px', fontSize: 12, opacity: 0.8 }}>Sound</div>
          <div 
            className="slider-track"
            style={{ position: 'relative', height: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', cursor: 'pointer' }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
              setVolume(Math.round(percentage));
            }}
            onMouseDown={(e) => {
              setIsDraggingVolume(true);
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
              setVolume(Math.round(percentage));
            }}
          >
            <div style={{ 
              position: 'absolute', 
              left: 0, 
              top: 0, 
              height: '100%', 
              width: `${volume}%`, 
              background: 'linear-gradient(90deg, #007AFF, #5AC8FA)', 
              borderRadius: '10px',
              transition: 'width 0.1s ease'
            }} />
            <div style={{ 
              position: 'absolute', 
              left: `calc(${volume}% - 8px)`, 
              top: '2px', 
              width: '16px', 
              height: '16px', 
              background: '#fff', 
              borderRadius: '50%', 
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              transition: 'left 0.1s ease'
            }} />
          </div>
          <div style={{ marginTop: '8px', fontSize: 11, opacity: 0.6 }}>{volume}%</div>
        </div>
      )}
      
      {/* Desktop Folders */}
      {desktopFolders.map(folder => (
        <React.Fragment key={folder.name}>
          <img 
            src={folder.icon} 
            alt={folder.name} 
            className="w-16 h-16 group-hover:scale-105 transition-transform absolute z-10 cursor-grab select-none"
            style={{
              left: `${(itemPositions[folder.name as keyof typeof itemPositions]?.x || 6) + (draggedItem === folder.name ? dragOffset.x : 0)}px`,
              top: `${(itemPositions[folder.name as keyof typeof itemPositions]?.y || 224) + (draggedItem === folder.name ? dragOffset.y : 0)}px`,
              transform: draggedItem === folder.name ? 'scale(1.08)' : 'scale(1)',
              boxShadow: draggedItem === folder.name 
                ? '0 8px 32px 0 rgba(0,0,0,0.32), 0 2px 8px 0 rgba(0,0,0,0.18)'
                : '0 2px 8px 0 rgba(0,0,0,0.18)',
              transition: 'transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1)',
              background: 'none',
              border: 'none',
              margin: 0,
              padding: 0,
              display: 'block',
              outline: 'none',
              userSelect: 'none',
              pointerEvents: 'auto',
            }}
            draggable={false}
            onDragStart={e => e.preventDefault()}
            onMouseDown={e => {
              e.preventDefault();
              setDraggedItem(folder.name);
              setDragStart({ x: e.clientX, y: e.clientY });
            }}
            onDoubleClick={() => {
              // Open Finder when double-clicking on desktop folders
              setFinderInitialFolder(folder.name);
              setOpenDockApp('Finder');
              setDockAppWindowPosition(centerWindow('Finder'));
            }}

          />
          <span
            className="text-white text-xs font-semibold text-shadow text-center select-none"
            style={{
              position: 'absolute',
              left: `${(itemPositions[folder.name as keyof typeof itemPositions]?.x || 6) + (draggedItem === folder.name ? dragOffset.x : 0)}px`,
              top: `${((itemPositions[folder.name as keyof typeof itemPositions]?.y || 224) + (draggedItem === folder.name ? dragOffset.y : 0)) + 64}px`,
              width: '64px',
              textAlign: 'center',
              textShadow: '0 1px 6px rgba(0,0,0,0.18)',
              margin: 0,
              padding: 0,
              pointerEvents: 'auto',
              userSelect: 'none',
                  cursor: 'pointer',
                      }}
                      onDoubleClick={() => {
              // Open Finder when double-clicking on folder labels
              setFinderInitialFolder(folder.name);
              setOpenDockApp('Finder');
              setDockAppWindowPosition(centerWindow('Finder'));
            }}
          >
            {folder.name}
                    </span>
                  </React.Fragment>
                ))}
      
      

             {/* Safari Window */}
       {openDockApp === 'Safari' && (
  <Safari
    isOpen={openDockApp === 'Safari'}
    onClose={() => setOpenDockApp(null)}
    windowPosition={dockAppWindowPosition}
    setWindowPosition={setDockAppWindowPosition}
    setIsDragging={setIsDraggingDockWindow}
    setDragStart={setDockWindowDragStart}
  />
       )}

             {/* Mail Window */}
       {openDockApp === 'Mail' && (
     <Mail
       isOpen={openDockApp === 'Mail'}
       onClose={() => setOpenDockApp(null)}
       windowPosition={dockAppWindowPosition}
       setWindowPosition={setDockAppWindowPosition}
       setIsDragging={setIsDraggingDockWindow}
       setDragStart={setDockWindowDragStart}
     />
       )}

       {/* Photos Window */}
       {openDockApp === 'Photos' && (
         <Photos
           isOpen={openDockApp === 'Photos'}
           onClose={() => setOpenDockApp(null)}
           windowPosition={dockAppWindowPosition}
           setWindowPosition={setDockAppWindowPosition}
           setIsDragging={setIsDraggingDockWindow}
           setDragStart={setDockWindowDragStart}
         />
       )}

       {/* Calendar Window */}
       {openDockApp === 'Calendar' && (
         <Calendar
           isOpen={openDockApp === 'Calendar'}
           onClose={() => setOpenDockApp(null)}
           windowPosition={dockAppWindowPosition}
           setIsDragging={setIsDraggingDockWindow}
           setDragStart={setDockWindowDragStart}
         />
       )}

       {/* System Settings Window */}
       <SystemSettings
         isOpen={openDockApp === 'System Settings' || systemSettingsOpen}
         onClose={() => {
           setOpenDockApp(null);
           setSystemSettingsOpen(false);
         }}
         windowPosition={dockAppWindowPosition}
         setIsDragging={setIsDraggingDockWindow}
         setDragStart={setDockWindowDragStart}
         initialSection={systemSettingsSection}
       />

       {/* Finder Window */}
       {openDockApp === 'Finder' && (
         <Finder
           isOpen={openDockApp === 'Finder'}
           onClose={() => {
             setOpenDockApp(null);
             setFinderInitialFolder(null);
           }}
           windowPosition={dockAppWindowPosition}
           setWindowPosition={setDockAppWindowPosition}
           setIsDragging={setIsDraggingDockWindow}
           setDragStart={setDockWindowDragStart}
           initialFolder={finderInitialFolder || undefined}
         />
       )}

       {/* iMessage Window */}
       {openDockApp === 'iMessage' && (
         <IMessage
           isOpen={openDockApp === 'iMessage'}
           onClose={() => setOpenDockApp(null)}
           windowPosition={dockAppWindowPosition}
           setWindowPosition={setDockAppWindowPosition}
           setIsDragging={setIsDraggingDockWindow}
           setDragStart={setDockWindowDragStart}
         />
       )}

       {/* FaceTime Window */}
       {openDockApp === 'FaceTime' && (
         <FaceTime
           isOpen={openDockApp === 'FaceTime'}
           onClose={() => setOpenDockApp(null)}
           windowPosition={dockAppWindowPosition}
           setIsDragging={setIsDraggingDockWindow}
           setDragStart={setDockWindowDragStart}
         />
       )}

       {/* Reminders Window */}
       <Reminders
         isOpen={openDockApp === 'Reminders'}
         onClose={() => setOpenDockApp(null)}
         windowPosition={dockAppWindowPosition}
         setIsDragging={setIsDraggingDockWindow}
         setDragStart={setDockWindowDragStart}
       />

       {/* Music Window */}
       <Music
         isOpen={openDockApp === 'Music'}
         onClose={() => setOpenDockApp(null)}
         windowPosition={dockAppWindowPosition}
         setIsDragging={setIsDraggingDockWindow}
         setDragStart={setDockWindowDragStart}
       />

       {/* App Store Window */}
       <AppStore
         isOpen={openDockApp === 'App Store'}
         onClose={() => setOpenDockApp(null)}
         windowPosition={dockAppWindowPosition}
         setIsDragging={setIsDraggingDockWindow}
         setDragStart={setDockWindowDragStart}
       />

       {/* iPhone Mirroring Window */}
       <IPhoneMirroring
         isOpen={openDockApp === 'iPhone Mirroring'}
         onClose={() => setOpenDockApp(null)}
         windowPosition={dockAppWindowPosition}
         setIsDragging={setIsDraggingDockWindow}
         setDragStart={setDockWindowDragStart}
       />

       {/* Slack Window */}
       <Slack
         isOpen={openDockApp === 'Slack'}
         onClose={() => setOpenDockApp(null)}
         windowPosition={dockAppWindowPosition}
         setIsDragging={setIsDraggingDockWindow}
         setDragStart={setDockWindowDragStart}
       />

       {/* Notes Window */}
       <Notes
         isOpen={openDockApp === 'Notes'}
         onClose={() => setOpenDockApp(null)}
         windowPosition={dockAppWindowPosition}
         setIsDragging={setIsDraggingDockWindow}
         setDragStart={setDockWindowDragStart}
       />

       {/* VS Code Window */}
       <VSCode
         isOpen={openDockApp === 'VS Code'}
         onClose={() => setOpenDockApp(null)}
         windowPosition={dockAppWindowPosition}
         setIsDragging={setIsDraggingDockWindow}
         setDragStart={setDockWindowDragStart}
       />

       {/* Notion Window */}
       <Notion
         isOpen={openDockApp === 'Notion'}
         onClose={() => setOpenDockApp(null)}
         windowPosition={dockAppWindowPosition}
         setIsDragging={setIsDraggingDockWindow}
         setDragStart={setDockWindowDragStart}
       />

       {/* Launchpad Window */}
       <Launchpad
         isOpen={openDockApp === 'Launchpad'}
         onClose={() => setOpenDockApp(null)}
         windowPosition={dockAppWindowPosition}
         setIsDragging={setIsDraggingDockWindow}
         setDragStart={setDockWindowDragStart}
       />

       {/* Weather Window */}
       <Weather
         isOpen={openDockApp === 'Weather'}
         onClose={() => setOpenDockApp(null)}
         windowPosition={dockAppWindowPosition}
         setWindowPosition={setDockAppWindowPosition}
         setIsDragging={setIsDraggingDockWindow}
         setDragStart={setDockWindowDragStart}
       />

       {/* About This Mac Window */}
       <AboutThisMac
         isOpen={aboutThisMacOpen}
         onClose={() => setAboutThisMacOpen(false)}
         windowPosition={dockAppWindowPosition}
         setIsDragging={setIsDraggingDockWindow}
         setDragStart={setDockWindowDragStart}
       />
       
       {/* Dock */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex items-end gap-1 px-10 py-2 rounded-2xl" style={{ minWidth: 820, background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(16px)', boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)', zIndex: 20 }}>
        {dockApps.map((app, i) => {
          const isAfterIPhoneMirroring = app.name === 'iPhone Mirroring';
          const isAfterNotion = app.name === 'Notion';
          const isPressed = dockPressedIndex === i;
          const [hover, setHover] = useState(false);
          // Special handling for Trash
          const isTrash = app.name === 'Trash';
          let iconSrc = app.icon;
          if (isTrash) {
            iconSrc = isTrashEmpty
              ? '/icons-png/empty-bin_16x16x32,empty-bin_32x32x32,empty-bin_256x256x32/empty-bin_1024x1024x32.webp'
              : '/icons-png/full-bin_16x16x32,full-bin_32x32x32,full-bin_256x256x32/full-bin_1024x1024x32.webp';
          }
          return (
            <React.Fragment key={app.name}>
              <div
                className="flex flex-col items-center justify-center cursor-pointer group"
                style={{ width: 56, height: 64, position: 'relative' }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onMouseDown={e => setDockPressedIndex(i)}
                onMouseUp={e => setDockPressedIndex(null)}
                onMouseOut={e => setDockPressedIndex(null)}
                onClick={() => {
                  if (app.name !== 'Trash') {
                    setOpenDockApp(app.name);
                    setDockAppWindowPosition(centerWindow(app.name));
                  }
                }}
              >
                {!isTrash && <DockTooltip label={app.name} show={hover} />}
                <img
                  src={iconSrc}
                  alt={app.name}
                  className="w-12 h-12 rounded-2xl object-contain"
                  style={{
                    display: 'block',
                    margin: '0 auto',
                    transition: 'transform 0.18s cubic-bezier(.4,0,.2,1), box-shadow 0.18s cubic-bezier(.4,0,.2,1)',
                    transform:
                      isPressed
                        ? 'scale(0.96)'
                        : hover
                        ? 'scale(1.13)'
                        : 'scale(1)',
                    boxShadow:
                      hover || isPressed
                        ? '0 8px 32px 0 rgba(0,0,0,0.28), 0 2px 8px 0 rgba(0,0,0,0.18)'
                        : '0 2px 8px 0 rgba(0,0,0,0.18)',
                    pointerEvents: 'auto',
                  }}
                />
                {/* Trash message bubble with button */}
                {isTrash && hover && (
                  <div
                    style={{
                      position: 'absolute',
                      top: -60,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(30, 28, 26, 0.97)',
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 500,
                      borderRadius: 12,
                      padding: '8px 12px 10px 12px',
                      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.18)',
                      whiteSpace: 'nowrap',
                      zIndex: 101,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      minWidth: 100,
                    }}
                  >
                    <div style={{ marginBottom: '6px', fontSize: 11, fontWeight: 600, color: '#fff' }}>
                      Trash
                    </div>
                    <button
                      style={{
                        background: isTrashEmpty ? 'rgba(120,120,130,0.18)' : 'rgba(255,59,48,0.9)',
                        border: 'none',
                        borderRadius: 6,
                        padding: '3px 8px',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 500,
                        cursor: isTrashEmpty ? 'not-allowed' : 'pointer',
                        opacity: isTrashEmpty ? 0.5 : 1,
                        boxShadow: '0 1px 4px rgba(255,59,48,0.2)',
                        transition: 'all 0.18s',
                      }}
                      disabled={isTrashEmpty}
                      onClick={() => setIsTrashEmpty(true)}
                    >
                      Empty
                    </button>
                  </div>
                )}
              </div>
              {isAfterIPhoneMirroring || isAfterNotion ? (
                <div
                  style={{
                    width: 2,
                    height: 48,
                    background: 'rgba(255,255,255,0.72)',
                    borderRadius: 2,
                    margin: '0 8px',
                    alignSelf: 'center',
                    boxShadow: '0 0 8px 2px rgba(255,255,255,0.18)',
                  }}
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </div>

      {/* Weather Widget Screenshot */}
      <img
        src="/icons-png/weather-widget.webp"
        alt="Weather Widget"
        className="w-40 h-48 rounded-2xl object-contain object-center absolute z-20 cursor-grab select-none"
        style={{
          left: `${itemPositions.weather.x + (draggedItem === 'weather' ? dragOffset.x : 0)}px`,
          top: `${itemPositions.weather.y + (draggedItem === 'weather' ? dragOffset.y : 0)}px`,
          background: 'none',
          objectFit: 'contain',
          border: 'none',
          margin: 0,
          padding: 0,
          display: 'block',
          outline: 'none',
          userSelect: 'none',
          pointerEvents: 'auto',
          boxSizing: 'border-box',
        }}
        draggable={false}
        onMouseDown={e => {
          e.preventDefault();
          setDraggedItem('weather');
          setDragStart({ x: e.clientX, y: e.clientY });
        }}
                 onDoubleClick={() => {
          // Open Weather app when double-clicking the weather widget
          setOpenDockApp('Weather');
          setDockAppWindowPosition(centerWindow('Weather'));
        }}
        tabIndex={-1}
        onFocus={e => e.target.blur()}
      />

      {/* Brave Window */}
      {openDockApp === 'Brave' && (
        <Brave onClose={() => setOpenDockApp(null)} />
      )}
    </div>
  );
};

export default Dashboard; 