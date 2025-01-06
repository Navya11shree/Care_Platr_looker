// // //LookerConvo.tsx
import React, { useEffect, useState, useContext } from 'react';
import { ExtensionContext } from '@looker/extension-sdk-react';
import { Database, Table2 } from 'lucide-react';
import ChatInterface from './ChatInterface';

interface Field {
    name: string;
    type: string;
}

interface ExploreInfo {
    name: string;
    dimensions: Field[];
    measures: Field[];
}

interface LookerField {
    name?: string;
    type?: string;
    [key: string]: any;
}

interface LookerExploreResponse {
    title?: string;
    fields?: {
        dimensions?: { [key: string]: LookerField };
        measures?: { [key: string]: LookerField };
    };
}

interface Message {
    type: 'user' | 'bot';
    content: string;
    timestamp?: Date;
}

const LookerConvo: React.FC = () => {
    const [exploreInfo, setExploreInfo] = useState<ExploreInfo | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { core40SDK } = useContext(ExtensionContext);

    const cleanFieldName = (name: string): string => {
        const parts = name.split('.');
        return parts.length > 1 ? parts[1] : name;
    };

    useEffect(() => {
        const fetchExploreInfo = async () => {
            try {
                const explore = await core40SDK.ok(
                    core40SDK.lookml_model_explore(
                        'care_platr',
                        'patient_healthcare_records'
                    )
                ) as LookerExploreResponse;

                if (explore) {
                    const dimensions = Object.values(explore.fields?.dimensions || {}).map((dim: LookerField) => ({
                        name: cleanFieldName(dim.name || ''),
                        type: dim.type || ''
                    }));

                    const measures = Object.values(explore.fields?.measures || {}).map((measure: LookerField) => ({
                        name: cleanFieldName(measure.name || ''),
                        type: measure.type || ''
                    }));

                    setExploreInfo({
                        name: explore.title || 'Patient Healthcare Records',
                        dimensions,
                        measures
                    });
                }
            } catch (err) {
                setError('Error fetching explore information');
                console.error(err);
            }
        };

        fetchExploreInfo();
    }, [core40SDK]);

    const handleFieldClick = (fieldName: string, fieldType: 'dimension' | 'measure') => {
        const message = `Tell me about the ${fieldType} "${fieldName}"`;
        setInputMessage(message);
    };

    if (error) {
        return (
            <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    if (!exploreInfo) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="h-screen overflow-hidden">
            <div className="flex gap-6 h-full">
                {/* Left Column - Explore Info */}
                <div className="h-full overflow-hidden flex flex-col flex-shrink-0">
                    <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                        <div className="bg-white rounded-lg shadow-sm p-4 w-fit">
                            <div className="border-b pb-4 sticky top-0 bg-white z-10">
                                <h2 className="text-2xl font-bold text-gray-800 flex items-center whitespace-nowrap">
                                    <Database className="mr-2 text-blue-600" size={24} />
                                    {exploreInfo.name}
                                </h2>
                            </div>

                            <div className="space-y-6 pt-4">
                                {/* Dimensions Section */}
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center whitespace-nowrap">
                                        <Table2 className="mr-2 text-blue-600" size={20} />
                                        Dimensions
                                        <span className="ml-2 text-sm text-gray-500 font-normal">
                                            ({exploreInfo.dimensions.length})
                                        </span>
                                    </h3>
                                    <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                        <div className="w-fit min-w-[200px]">
                                            {exploreInfo.dimensions.map((dim) => (
                                                <div
                                                    key={dim.name}
                                                    className="p-2 hover:bg-white rounded transition-colors duration-150 ease-in-out cursor-pointer whitespace-nowrap"
                                                    onClick={() => handleFieldClick(dim.name, 'dimension')}
                                                >
                                                    <span className="text-gray-700">{dim.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Measures Section */}
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center whitespace-nowrap">
                                        <Table2 className="mr-2 text-blue-600" size={20} />
                                        Measures
                                        <span className="ml-2 text-sm text-gray-500 font-normal">
                                            ({exploreInfo.measures.length})
                                        </span>
                                    </h3>
                                    <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                                        <div className="w-fit min-w-[200px]">
                                            {exploreInfo.measures.map((measure) => (
                                                <div
                                                    key={measure.name}
                                                    className="p-2 hover:bg-white rounded transition-colors duration-150 ease-in-out cursor-pointer whitespace-nowrap"
                                                    onClick={() => handleFieldClick(measure.name, 'measure')}
                                                >
                                                    <span className="text-gray-700">{measure.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Chat Interface*/}
                <div className="overflow-hidden h-full flex-1">
                    <ChatInterface
                        messages={messages}
                        inputMessage={inputMessage}
                        isLoading={isLoading}
                        onSendMessage={(e) => {
                            e.preventDefault();
                            // Your message handling logic will go here
                        }}
                        onInputChange={(e) => setInputMessage(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default LookerConvo;