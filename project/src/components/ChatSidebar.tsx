import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Plus, 
  Trash2, 
  Search, 
  Calendar,
  User,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useChatHistory } from '../context/ChatHistoryContext';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';
import { formatDistanceToNow } from 'date-fns';

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onLoadChat: (chatId: string) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isOpen,
  onToggle,
  onNewChat,
  onLoadChat,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { chatHistories, currentChatId, deleteChat } = useChatHistory();
  const { authState, logout } = useAuth();
  const { settings } = useSettings();

  const filteredChats = chatHistories.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this conversation?')) {
      deleteChat(chatId);
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onToggle}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed left-0 top-0 h-full w-80 z-50 backdrop-blur-xl border-r ${
          settings.theme === 'dark'
            ? 'bg-gray-900/90 border-gray-700'
            : 'bg-white/90 border-gray-200'
        } lg:relative lg:translate-x-0`}
        initial={{ x: -320 }}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${
              settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Chat History
            </h2>
            <button
              onClick={onToggle}
              className={`p-2 rounded-lg lg:hidden ${
                settings.theme === 'dark'
                  ? 'hover:bg-gray-800 text-gray-400'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* New Chat Button */}
          <motion.button
            onClick={onNewChat}
            className={`w-full p-3 rounded-lg border-2 border-dashed transition-all ${
              settings.theme === 'dark'
                ? 'border-gray-700 hover:border-violet-500 text-gray-400 hover:text-white'
                : 'border-gray-300 hover:border-blue-500 text-gray-600 hover:text-gray-900'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">New Chat</span>
          </motion.button>

          {/* Search */}
          <div className="relative mt-4">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                settings.theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-violet-500/50`}
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-4">
          <AnimatePresence>
            {filteredChats.map((chat, index) => (
              <motion.div
                key={chat.id}
                className={`p-3 rounded-lg mb-2 cursor-pointer transition-all group ${
                  currentChatId === chat.id
                    ? settings.theme === 'dark'
                      ? 'bg-violet-900/50 border border-violet-700'
                      : 'bg-blue-100 border border-blue-300'
                    : settings.theme === 'dark'
                      ? 'hover:bg-gray-800 border border-transparent'
                      : 'hover:bg-gray-100 border border-transparent'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onLoadChat(chat.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1">
                      <MessageSquare className="w-4 h-4 mr-2 text-violet-500" />
                      <h3 className={`text-sm font-medium truncate ${
                        settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {chat.title}
                      </h3>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {formatDistanceToNow(chat.updatedAt, { addSuffix: true })}
                    </div>
                    <p className={`text-xs mt-1 truncate ${
                      settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {chat.messages.length} messages
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDeleteChat(e, chat.id)}
                    className={`opacity-0 group-hover:opacity-100 p-1 rounded transition-all ${
                      settings.theme === 'dark'
                        ? 'hover:bg-red-900/50 text-red-400'
                        : 'hover:bg-red-100 text-red-600'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredChats.length === 0 && (
            <div className={`text-center py-8 ${
              settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">
                {searchQuery ? 'No conversations found' : 'No conversations yet'}
              </p>
              <p className="text-xs mt-1">
                {searchQuery ? 'Try a different search term' : 'Start a new chat to begin'}
              </p>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className={`p-4 border-t ${
          settings.theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                authState.user?.isGuest
                  ? 'bg-gray-600'
                  : 'bg-gradient-to-r from-violet-500 to-purple-500'
              }`}>
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {authState.user?.username}
                </p>
                <p className={`text-xs ${
                  settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {authState.user?.isGuest ? 'Guest User' : 'Registered User'}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className={`p-2 rounded-lg transition-colors ${
                settings.theme === 'dark'
                  ? 'hover:bg-gray-800 text-gray-400'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};