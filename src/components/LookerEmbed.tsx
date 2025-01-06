//LookerEmbed.tsx
import React, { useEffect, useState, useContext } from 'react';
import { ExtensionContext } from '@looker/extension-sdk-react';
import { FaFolder } from 'react-icons/fa';

interface EmbedProps {
  folderId: string;
}

const LookerEmbed: React.FC<EmbedProps> = ({ folderId }) => {
  const [folderContents, setFolderContents] = useState<any[]>([]);
  const [selectedContent, setSelectedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [folderName, setFolderName] = useState<string | null>(null);
  const { core40SDK, extensionSDK } = useContext(ExtensionContext);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const folder = await core40SDK.ok(core40SDK.folder(folderId));
        const [dashboards, looks] = await Promise.all([
          core40SDK.ok(core40SDK.folder_dashboards(folderId)),
          core40SDK.ok(core40SDK.folder_looks(folderId)),
        ]);

        setFolderName(folder.name);
        setFolderContents([
          { type: 'dashboard', items: dashboards },
          { type: 'look', items: looks }
        ]);

        // Automatically load "Dashboard 1" if available
        const dashboard1 = dashboards.find((dashboard: any) => dashboard.title === 'dashboard1');
        if (dashboard1) {
          setSelectedContent(`dashboards/${dashboard1.id}`);
        }
      } catch {
        setError('Failed to fetch folder contents. Please try again.');
      }
    };

    core40SDK && fetchContents();
  }, [core40SDK, folderId]);

  const handleContentClick = (id: string, type: 'dashboard' | 'look') => {
    setSelectedContent(`${type === 'dashboard' ? 'dashboards' : 'looks'}/${id}`);
  };

  const handleClose = () => {
    setSelectedContent(null);
  };

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="flex h-screen w-screen">
      {/* List on the left */}
      <div className="w-50 p-4 border-r border-gray-300 overflow-y-auto">
        {folderName && (
          <div className="flex items-center mb-4">
            <FaFolder className="text-4xl mr-2" />
            <h2 className="font-bold text-3xl">{folderName}</h2>
          </div>
        )}

        {folderContents.map(({ type, items }) => (
          <div key={type} className="mb-4">
            <h2 className="font-bold text-2xl mb-2">
              {type === 'dashboard' ? 'Dashboards' : 'Looks'}
            </h2>
            {items.length > 0 ? (
              items.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => handleContentClick(item.id, type)}
                  className={`mb-2 cursor-pointer text-xl hover:text-blue-600 ${
                    selectedContent === `${type}s/${item.id}` ? 'text-blue-600 font-bold' : ''
                  }`}
                >
                  {item.title}
                </div>
              ))
            ) : (
              <div>No {type}s available.</div>
            )}
          </div>
        ))}
      </div>

      {/* Iframe and Close button on the right */}
      {selectedContent && (
        <div className="flex flex-col flex-1 p-4">
          <iframe
            src={`${extensionSDK.lookerHostData?.hostUrl}/embed/${selectedContent}`}
            className="border-none"
            title="Looker Embed"
            allowFullScreen
            style={{ height: '85vh', width: '75vw' }} // Adjusted size: height 85% of viewport height, width 75% of viewport width
          />
          <button
            onClick={handleClose}
            className="fixed bottom-4 right-4 py-2 px-4 text-lg bg-blue-600 text-white border-none cursor-pointer text-center rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default LookerEmbed;
