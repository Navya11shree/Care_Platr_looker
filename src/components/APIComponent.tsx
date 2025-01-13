
//using component that has two buttons - one using the Looker extension SDK and another using the regular fetch API.
//APIComponent.tsx of calling  external api
import React, { useState, useContext } from 'react';
import { ExtensionContext } from '@looker/extension-sdk-react';

const APIComponent: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchMethod, setFetchMethod] = useState<string>('');
  
  // Get the extension context
  const extensionContext = useContext(ExtensionContext);

  // Looker Extension SDK Method
  const fetchDataWithLooker = async () => {
    setError(null);
    setLoading(true);
    setFetchMethod('Looker SDK');
    
    try {
      const response = await extensionContext.extensionSDK.fetchProxy(
        'https://api.the-odds-api.com/v4/sports/?apiKey=e4734219cf243190b45f9be012cd716a',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setData(response.body);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Looker API Request failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // Regular Fetch API Method
  const fetchDataWithFetch = async () => {
    setLoading(true);
    setError(null);
    setFetchMethod('Fetch API');
    
    try {
      const response = await fetch(
        'https://api.the-odds-api.com/v4/sports/?apiKey=e4734219cf243190b45f9be012cd716a'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Fetch API Request failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">API Data</h1>
        <div className="space-x-4">
          <button
            onClick={fetchDataWithLooker}
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-semibold text-white ${
              loading 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading && fetchMethod === 'Looker SDK' ? 'Getting Data...' : 'Get Data (Looker SDK)'}
          </button>
          <button
            onClick={fetchDataWithFetch}
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-semibold text-white ${
              loading 
                ? 'bg-green-300 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading && fetchMethod === 'Fetch API' ? 'Getting Data...' : 'Get Data (Fetch API)'}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          <div className="font-semibold">Error occurred using {fetchMethod}:</div>
          <div>{error}</div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl font-semibold text-gray-600">
            Loading data using {fetchMethod}...
          </div>
        </div>
      )}

      {data && !loading && (
        <div className="bg-gray-50 p-4 rounded-lg overflow-auto">
          <div className="mb-2 text-sm text-gray-600">Data fetched using: {fetchMethod}</div>
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default APIComponent;