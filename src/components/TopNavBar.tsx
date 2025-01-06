//TopNavBar.tsx
import React, { useState } from 'react';
import { RiNotification4Line } from 'react-icons/ri';
import Avatar from 'react-avatar';
import '../tailwind.css';

const notifications = [
  { id: 1, title: 'Appointment', message: 'Booked' },
  { id: 2, title: 'Consulting', message: 'Done' },
  { id: 3, title: 'Medication', message: 'Time to take' },
  { id: 4, title: 'Vital Signs', message: 'Check required' },
  { id: 5, title: 'Lab Results', message: 'Available' },
];

const TopNavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<{ title: string; message: string } | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="w-full h-16 bg-white flex flex-col relative">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-3xl text-blue-700 font-bold">Care Platr</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center py-2 px-3 rounded-full border-2 border-gray-200 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <RiNotification4Line size={19} className="rounded-full bg-gray-100" />
            <div className="ml-2 font-thin">Notification</div>
          </div>
          <div className="cursor-pointer" onClick={() => setIsProfileOpen(true)}>
            <Avatar src="https://static.vecteezy.com/system/resources/previews/009/734/564/non_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg" size="40" round className="rounded-full border-2 border-gray-200" />
          </div>
        </div>
      </div>
      {isOpen && !selectedNotification && (
        <div className="absolute top-16 right-4 w-64 bg-blue-100 border-2 shadow-md p-4 z-10">
          <div className="font-bold mb-2 text-center">Notification list</div>
          <ul>
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="cursor-pointer hover:bg-blue-400 rounded-full border-2 border-black mb-2 text-center p-1"
                onClick={() => setSelectedNotification(notification)}
              >
                {notification.title}
              </li>
            ))}
          </ul>
          <button onClick={() => setIsOpen(false)} className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-full">
            Close
          </button>
        </div>
      )}
      {selectedNotification && (
        <div className="absolute top-16 right-4 w-64 bg-white shadow-md p-4 z-10">
          <h2 className="font-bold">{selectedNotification.title}</h2>
          <p className="text-gray-600">{selectedNotification.message}</p>
          <button onClick={() => setSelectedNotification(null)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to notifications
          </button>
        </div>
      )}
      {isProfileOpen && (
        <div className="absolute top-16 right-4 w-64 bg-white shadow-md p-4 z-10 border-2">
          <h2 className="font-bold">Profile Details</h2>
          <p className="text-gray-600">Name:NAVYA</p>
          <p className="text-gray-600">Email: NAVYA123@gmail.com</p>
          <button onClick={() => setIsProfileOpen(false)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default TopNavBar;