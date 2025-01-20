//TopNavBar.tsx
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from 'react-avatar';
import { ExtensionContext } from '@looker/extension-sdk-react';
import NotificationComponent from './NotificationComponent';
import '../tailwind.css';

interface UserDetails {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  display_name: string | null;
}

interface TopNavBarProps {
  setIsAuthenticated: (value: boolean) => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ setIsAuthenticated }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    first_name: null,
    last_name: null,
    email: null,
    display_name: null
  });
  const extensionContext = React.useContext(ExtensionContext);
  const history = useHistory();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const user = await extensionContext.core40SDK.ok(
          extensionContext.core40SDK.me()
        );
        setUserDetails({
          first_name: user.first_name || null,
          last_name: user.last_name || null,
          email: user.email || null,
          display_name: user.display_name || null
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [extensionContext.core40SDK]);

  const getDisplayName = (): string => {
    if (userDetails.display_name) {
      return userDetails.display_name;
    }
    const firstName = userDetails.first_name || '';
    const lastName = userDetails.last_name || '';
    return firstName && lastName ? `${firstName} ${lastName}` : 'User';
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsProfileOpen(false);
    history.push('/login');
  };

  return (
    <div className="w-full h-16 bg-white flex flex-col relative">
      <div className="flex justify-between items-center px-4 py-3">
        <div className="text-3xl text-blue-700 font-bold">Care Platr</div>
        <div className="flex items-center gap-4">
          <NotificationComponent />
          <div className="cursor-pointer" onClick={() => setIsProfileOpen(true)}>
            <Avatar
              name={getDisplayName()}
              size="40"
              round
              className="rounded-full border-2 border-gray-200"
            />
          </div>
        </div>
      </div>

      {/* Profile Popup */}
      {isProfileOpen && (
        <div className="absolute top-16 right-4 w-64 bg-white shadow-md p-4 z-10 border-2">
          <h2 className="font-bold text-lg mb-3">Profile Details</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Name: </span>
              {getDisplayName()}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Email: </span>
              {userDetails.email || 'N/A'}
            </p>
          </div>
          <div className="mt-4 space-y-2">
            <button
              onClick={() => setIsProfileOpen(false)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Close
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNavBar;