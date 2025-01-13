// NotificationComponent.tsx
import React, { useState } from 'react';
import { RiNotification4Line } from 'react-icons/ri';

interface Notification {
  id: number;
  title: string;
  message: string;
}

const notifications: Notification[] = [
  { id: 1, title: 'Appointment', message: 'Booked' },
  { id: 2, title: 'Consulting', message: 'Done' },
  { id: 3, title: 'Medication', message: 'Time to take' },
  { id: 4, title: 'Vital Signs', message: 'Check required' },
  { id: 5, title: 'Lab Results', message: 'Available' },
];

const NotificationComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  return (
    <div className="relative">
      <div 
        className="flex items-center py-2 px-3 rounded-full border-2 border-gray-200 cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <RiNotification4Line size={19} className="rounded-full bg-gray-100" />
        <div className="ml-2 font-thin">Notification</div>
      </div>

      {/* Notification List */}
      {isOpen && !selectedNotification && (
        <div className="absolute top-12 right-0 w-64 bg-blue-100 border-2 shadow-md p-4 z-10">
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
          <button 
            onClick={() => setIsOpen(false)} 
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded w-full"
          >
            Close
          </button>
        </div>
      )}

      {/* Selected Notification Detail */}
      {selectedNotification && (
        <div className="absolute top-12 right-0 w-64 bg-white shadow-md p-4 z-10">
          <h2 className="font-bold">{selectedNotification.title}</h2>
          <p className="text-gray-600">{selectedNotification.message}</p>
          <button 
            onClick={() => setSelectedNotification(null)} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back to notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;