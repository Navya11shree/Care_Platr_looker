//looker api for all dashboards in folder in TABLE  FORMAT
import React, { useState, useContext, useEffect } from 'react';
import { ExtensionContext } from '@looker/extension-sdk-react';
import { IDashboard } from '@looker/sdk';

interface DashboardData {
  admission_type: string;
  age: number;
  billing_amount: number;
  blood_type: string;
  date_of_admission: string;
  date_of_discharge: string;
  doctor: string;
  gender: string;
  hospital: string;
  insurance_provider: string;
  medical_condition: string;
  medication_name: string;
  room_number: string;
  test_results: string;
}

interface DashboardListItem {
  id: string;
  title: string;
  folder?: {
    id: string;
    name: string;
  };
}

const LookerAPIComponent: React.FC = () => {
  const [dashboards, setDashboards] = useState<DashboardListItem[]>([]);
  const [selectedDashboard, setSelectedDashboard] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showTable, setShowTable] = useState<boolean>(false);

  const { core40SDK, extensionSDK } = useContext(ExtensionContext);
  const folderId = "113";

  useEffect(() => {
    fetchDashboardsList();
  }, []);

  const fetchDashboardsList = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const folder = await core40SDK.ok(
        core40SDK.folder(folderId)
      );
      
      const dashboardsResponse = await core40SDK.ok(
        core40SDK.folder_dashboards(folderId)
      );

      const mappedDashboards: DashboardListItem[] = dashboardsResponse
        .filter((dashboard): dashboard is IDashboard & { id: string } => 
          dashboard.id !== undefined && dashboard.title !== undefined
        )
        .map(dashboard => ({
          id: dashboard.id,
          title: dashboard.title || 'Untitled Dashboard',
          folder: folder ? {
            id: folder.id || '',
            name: folder.name || ''
          } : undefined
        }));

      setDashboards(mappedDashboards);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboards list');
      console.error('Error fetching dashboards:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDashboardData = async (dashboardId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const dashboard = await core40SDK.ok(core40SDK.dashboard(dashboardId));
      const dashboardElements = await core40SDK.ok(
        core40SDK.dashboard_dashboard_elements(dashboardId)
      );

      const queries = dashboardElements?.map(element => element.query);

      if (!queries || queries.length === 0) {
        throw new Error('No queries found in dashboard');
      }

      const firstQueryWithId = queries[0];
      if (!firstQueryWithId?.id) {
        throw new Error('No valid query ID found');
      }

      const queryResult = await core40SDK.ok(
        core40SDK.run_query({
          query_id: firstQueryWithId.id,
          result_format: 'json'
        })
      );

      setDashboardData(queryResult as unknown as DashboardData[]);
      setShowTable(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
      console.error('Error fetching dashboard data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDashboardSelect = (dashboardId: string) => {
    setSelectedDashboard(dashboardId);
    setShowTable(false);
    setDashboardData(null);
  };

  const renderDashboardsList = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {dashboards.map((dashboard) => (
        <button
          key={dashboard.id}
          onClick={() => handleDashboardSelect(dashboard.id)}
          className="p-4 bg-white border rounded-lg shadow hover:shadow-md transition-shadow text-left"
        >
          <h3 className="font-semibold text-lg mb-2">{dashboard.title}</h3>
          <p className="text-sm text-gray-600">ID: {dashboard.id}</p>
          {dashboard.folder && (
            <p className="text-sm text-gray-500">Folder: {dashboard.folder.name}</p>
          )}
        </button>
      ))}
    </div>
  );

  const renderDataTable = () => {
    if (!dashboardData || dashboardData.length === 0) return null;

    const columns = Object.keys(dashboardData[0]);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dashboardData.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {columns.map((column) => (
                  <td key={`${rowIndex}-${column}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCellValue(row[column as keyof DashboardData])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const formatCellValue = (value: any): string => {
    if (typeof value === 'number') {
      if (value % 1 === 0) return value.toString();
      return value.toFixed(2);
    }
    if (value === null || value === undefined) return '-';
    return value.toString();
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Looker Dashboards</h1>

      {/* Show dashboards list when no dashboard is selected */}
      {!selectedDashboard && renderDashboardsList()}

      {/* Selected dashboard view */}
      {selectedDashboard && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setSelectedDashboard(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Back to Dashboards List
            </button>
            <button
              onClick={() => fetchDashboardData(selectedDashboard)}
              disabled={isLoading}
              className={`px-6 py-2 rounded-lg font-semibold text-white ${
                isLoading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? 'Loading...' : 'View Table Data'}
            </button>
          </div>

          {!showTable && (
            <iframe
              src={`${extensionSDK.lookerHostData?.hostUrl}/embed/dashboards/${selectedDashboard}`}
              className="w-full h-[80vh] border-none"
              title="Selected Dashboard"
            />
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg">
          Error: {error}
        </div>
      )}

      {/* Table Data Display */}
      {showTable && dashboardData && (
        <div className="mt-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Dashboard Data</h2>
            <button
              onClick={() => setShowTable(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Back to Dashboard
            </button>
          </div>
          {renderDataTable()}
        </div>
      )}
    </div>
  );
};

export default LookerAPIComponent;