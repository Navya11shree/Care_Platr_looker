//explorecomponent.tsx

import React, { useEffect, useState, useContext } from 'react';
import { ExtensionContext } from '@looker/extension-sdk-react';

interface ExploreComponentProps {
  exploreId: string; // Pass the explore ID or name here
}

const ExploreComponent: React.FC<ExploreComponentProps> = ({ exploreId }) => {
  const [error, setError] = useState<string | null>(null);
  const [exploreUrl, setExploreUrl] = useState<string | null>(null);
  const { extensionSDK } = useContext(ExtensionContext);

  useEffect(() => {
    if (exploreId) {
      // Construct the URL for embedding the explore
      const embedUrl = `${extensionSDK.lookerHostData?.hostUrl}/embed/explore/${exploreId}`;
      setExploreUrl(embedUrl);
    }
  }, [extensionSDK, exploreId]);

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="flex flex-col h-screen w-screen">
      {exploreUrl ? (
        <iframe
          src={exploreUrl}
          className="border-none"
          title="Looker Explore Embed"
          allowFullScreen
          style={{ height: '95vh', width: '88vw' }} // Adjust size as per your layout
        />
      ) : (
        <div>Loading Explore...</div>
      )}
    </div>
  );
};

export default ExploreComponent;
