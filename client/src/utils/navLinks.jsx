import React from 'react';
import { FaSuitcase } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { IoIosStats } from 'react-icons/io';
import { FaFileWaveform } from 'react-icons/fa6';

// Utility navigation links on dashboard
const links = [
  {
    text: 'add job',
    path: '.', // path can also be '/dashboard'
    icon: <FaFileWaveform />,
  },
  {
    text: 'all jobs',
    path: 'jobs',
    icon: <FaSuitcase />,
  },
  {
    text: 'stats',
    path: 'stats',
    icon: <IoIosStats />,
  },
  {
    text: 'profile',
    path: 'profile',
    icon: <FaUser />,
  },
  {
    text: 'admin',
    path: 'admin',
    icon: <MdAdminPanelSettings />,
  },
];

export default links;
