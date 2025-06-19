import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, UserPlus, Mail, Lock, Bot } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSettings } from '../context/SettingsContext';

export const LoginScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginAsGuest } = useAuth();
  const { settings } = useSettings();

  const personalityColors = {
    professional: 'from-blue-500 to-cyan-500',
    casual: 'from-purple-500 to-pink-500',
    motivational: 'from-green-500 to-emerald-500',
    funny: 'from-orange-500 to-red-500',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    try {
      await login(username, isLogin ? password : undefined);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
  };

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
      settings.theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100'
    }`}>
      <motion.div
        className={`w-full max-w-md p-8 rounded-2xl backdrop-blur-xl shadow-2xl border ${
          settings.theme === 'dark'
            ? 'bg-gray-900/80 border-gray-700'
            : 'bg-white/80 border-gray-200'
        }`}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${personalityColors[settings.personality]} shadow-2xl mb-4`}>
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${
            settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome to AI Assistant
          </h1>
          <p className={`text-sm ${
            settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Your intelligent companion for productivity and creativity
          </p>
        </motion.div>

        {/* Login/Register Toggle */}
        <motion.div
          className="flex mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 px-4 rounded-l-lg transition-all ${
              isLogin
                ? `bg-gradient-to-r ${personalityColors[settings.personality]} text-white`
                : settings.theme === 'dark'
                  ? 'bg-gray-800 text-gray-400 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 px-4 rounded-r-lg transition-all ${
              !isLogin
                ? `bg-gradient-to-r ${personalityColors[settings.personality]} text-white`
                : settings.theme === 'dark'
                  ? 'bg-gray-800 text-gray-400 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900'
            }`}
          >
            Register
          </button>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative">
            <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                settings.theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-violet-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
              required
            />
          </div>

          <AnimatePresence>
            {isLogin && (
              <motion.div
                className="relative"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-colors ${
                    settings.theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-violet-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={isLoading || !username.trim()}
            className={`w-full py-3 rounded-lg font-semibold transition-all ${
              isLoading || !username.trim()
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : `bg-gradient-to-r ${personalityColors[settings.personality]} text-white hover:shadow-lg hover:shadow-violet-500/25`
            }`}
            whileHover={!isLoading && username.trim() ? { scale: 1.02 } : {}}
            whileTap={!isLoading && username.trim() ? { scale: 0.98 } : {}}
          >
            {isLoading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
          </motion.button>
        </motion.form>

        {/* Guest Login */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className={`text-sm mb-3 ${
            settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Or continue as guest
          </p>
          <button
            onClick={handleGuestLogin}
            className={`px-6 py-2 rounded-lg border transition-all ${
              settings.theme === 'dark'
                ? 'border-gray-700 text-gray-300 hover:bg-gray-800'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Continue as Guest
          </button>
          <p className={`text-xs mt-2 ${
            settings.theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Guest sessions are not saved
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          className="mt-8 grid grid-cols-2 gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[
            { label: 'Smart AI', icon: '🧠' },
            { label: 'Code Help', icon: '💻' },
            { label: 'File Upload', icon: '📄' },
            { label: 'Chat History', icon: '💬' },
          ].map((feature, index) => (
            <div key={feature.label} className={`p-3 rounded-lg ${
              settings.theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'
            }`}>
              <div className="text-2xl mb-1">{feature.icon}</div>
              <div className={`text-xs ${
                settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {feature.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};