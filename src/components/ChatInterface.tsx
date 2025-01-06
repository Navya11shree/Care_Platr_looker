// //ChatInterface.tsx
// import React from 'react';
// import { Send, User, Bot } from 'lucide-react';

// interface Message {
//     type: 'user' | 'bot';
//     content: string;
//     timestamp?: Date;
// }

// interface ChatInterfaceProps {
//     messages: Message[];
//     inputMessage: string;
//     isLoading: boolean;
//     onSendMessage: (e: React.FormEvent) => void;
//     onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

// const ChatInterface: React.FC<ChatInterfaceProps> = ({
//     messages,
//     inputMessage,
//     isLoading,
//     onSendMessage,
//     onInputChange,
// }) => {
//     return (
//         <div className="flex flex-col min-h-[200px] max-h-[600px] bg-white rounded-lg border border-gray-200">
//             <div className="p-3 border-b border-gray-200">
//                 <h2 className="text-2xl font-bold text-center text-gray-800">LookerConvoAI</h2>
//             </div>

//             <div className="flex-1 overflow-y-auto p-3 space-y-3">
//                 {messages.map((message, index) => (
//                     <div
//                         key={index}
//                         className={`flex items-start gap-2 ${message.type === 'user' ? 'flex-row-reverse' : ''
//                             }`}
//                     >
//                         <div className={`w-6 h-6 rounded-full flex items-center justify-center 
//               ${message.type === 'user' ? 'bg-blue-600' : 'bg-gray-600'}`}>
//                             {message.type === 'user' ?
//                                 <User className="w-4 h-4 text-white" /> :
//                                 <Bot className="w-4 h-4 text-white" />
//                             }
//                         </div>
//                         <div
//                             className={`max-w-[80%] p-2 rounded-lg ${message.type === 'user'
//                                     ? 'bg-blue-600 text-white'
//                                     : 'bg-gray-100 text-gray-800'
//                                 }`}
//                         >
//                             {message.content}
//                             {message.timestamp && (
//                                 <div className={`text-xs mt-1 ${message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
//                                     }`}>
//                                     {message.timestamp.toLocaleTimeString()}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//                 {isLoading && (
//                     <div className="flex items-center space-x-2">
//                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
//                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
//                         <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
//                     </div>
//                 )}
//             </div>

//             <form onSubmit={onSendMessage} className="p-3 border-t border-gray-200">
//                 <div className="flex gap-2">
//                     <input
//                         type="text"
//                         value={inputMessage}
//                         onChange={onInputChange}
//                         placeholder="Type your message..."
//                         className="flex-1 p-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//                         disabled={isLoading}
//                     />
//                     <button
//                         type="submit"
//                         className={`p-1.5 bg-blue-600 text-white rounded-lg transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
//                             }`}
//                         disabled={isLoading}
//                     >
//                         <Send className="w-4 h-4" />
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default ChatInterface;


import React from 'react';
import { Send, User, Bot } from 'lucide-react';

interface Message {
    type: 'user' | 'bot';
    content: string;
    timestamp?: Date;
}

interface ChatInterfaceProps {
    messages: Message[];
    inputMessage: string;
    isLoading: boolean;
    onSendMessage: (e: React.FormEvent) => void;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
    messages,
    inputMessage,
    isLoading,
    onSendMessage,
    onInputChange,
}) => {
    return (
        <div className="flex flex-col min-h-[500px] max-h-[800px] bg-white rounded-lg border-4 border-gray-300 shadow-xl">
            {/* Header */}
            <div className="p-4 border-b-4 border-gray-300 bg-gray-50">
                <h2 className="text-2xl font-bold text-center text-gray-800">LookerConvoAI</h2>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex items-start gap-3 ${
                            message.type === 'user' ? 'flex-row-reverse' : ''
                        }`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 
                            ${message.type === 'user' 
                                ? 'bg-blue-600 border-blue-700' 
                                : 'bg-gray-700 border-gray-800'}`}>
                            {message.type === 'user' ?
                                <User className="w-5 h-5 text-white" /> :
                                <Bot className="w-5 h-5 text-white" />
                            }
                        </div>
                        <div
                            className={`max-w-[75%] p-3 rounded-lg border-3 shadow-lg ${
                                message.type === 'user'
                                    ? 'bg-blue-600 text-white border-blue-700 rounded-tr-none ring-2 ring-blue-400'
                                    : 'bg-white text-gray-800 border-gray-300 rounded-tl-none ring-2 ring-gray-200'
                            }`}
                        >
                            <div className="text-sm font-medium">{message.content}</div>
                            {message.timestamp && (
                                <div className={`text-xs mt-2 ${
                                    message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                                }`}>
                                    {message.timestamp.toLocaleTimeString()}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-center space-x-2 p-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce shadow-lg border border-blue-700" />
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce shadow-lg border border-blue-700" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce shadow-lg border border-blue-700" style={{ animationDelay: '0.4s' }} />
                    </div>
                )}
            </div>

            {/* Input Form */}
            <div className="p-4 border-t-4 border-gray-300 bg-gray-50">
                <form onSubmit={onSendMessage} className="flex gap-3">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={onInputChange}
                        placeholder="Type your message..."
                        className="flex-1 p-2.5 text-sm border-3 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all shadow-lg"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className={`px-4 py-2.5 bg-blue-600 text-white rounded-lg transition-all shadow-lg border-2 border-blue-700
                            ${isLoading 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:bg-blue-700 hover:shadow-xl active:transform active:scale-95'
                            }`}
                        disabled={isLoading}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;