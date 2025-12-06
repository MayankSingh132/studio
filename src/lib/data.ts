export type Log = {
  id: string;
  timestamp: string;
  user: string;
  ip: string;
  event: string;
  status: 'Success' | 'Failed' | 'Suspicious' | 'Info';
  details: string;
};

export const recentLogsData: Log[] = [
  { id: '1', timestamp: '2024-07-29 10:05:14', user: 'admin', ip: '192.168.1.10', event: 'Login Attempt', status: 'Success', details: 'User successfully logged in.' },
  { id: '2', timestamp: '2024-07-29 10:04:30', user: 'j.doe', ip: '10.0.5.22', event: 'MFA Challenge', status: 'Failed', details: 'Incorrect OTP provided.' },
  { id: '3', timestamp: '2024-07-29 10:02:01', user: 's.smith', ip: '203.0.113.45', event: 'Login Attempt', status: 'Suspicious', details: 'Unusual login location: Russia.' },
  { id: '4', timestamp: '2024-07-29 09:55:48', user: 'm.jones', ip: '172.16.0.5', event: 'Password Change', status: 'Success', details: 'User changed their password.' },
  { id: '5', timestamp: '2024-07-29 09:51:23', user: 'guest', ip: '198.51.100.2', event: 'Login Attempt', status: 'Failed', details: 'Invalid username or password.' },
];

export type Session = {
    id: string;
    user: string;
    ip: string;
    location: string;
    device: string;
    os: string;
    browser: string;
    lastSeen: string;
    isActive: boolean;
};

export const activeSessionsData: Session[] = [
    { id: '1', user: 'admin', ip: '192.168.1.10', location: 'New York, USA', device: 'Desktop', os: 'macOS', browser: 'Chrome', lastSeen: '2 minutes ago', isActive: true },
    { id: '2', user: 'j.doe', ip: '10.0.5.22', location: 'London, UK', device: 'Mobile', os: 'Android', browser: 'Firefox', lastSeen: '15 minutes ago', isActive: true },
    { id: '3', user: 's.smith', ip: '172.17.0.1', location: 'San Francisco, USA', device: 'Desktop', os: 'Windows', browser: 'Edge', lastSeen: '1 hour ago', isActive: true },
    { id: '4', user: 'm.jones', ip: '172.16.0.5', location: 'Tokyo, Japan', device: 'Tablet', os: 'iOS', browser: 'Safari', lastSeen: '4 hours ago', isActive: true },
]
