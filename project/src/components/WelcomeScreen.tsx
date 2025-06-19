import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Heart, Lightbulb, MessageCircle, Zap } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface WelcomeScreenProps {
  onQuickStart: (message: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onQuickStart }) => {
  const { settings } = useSettings();

  const personalityColors = {
    professional: 'from-blue-500 to-cyan-500',
    casual: 'from-purple-500 to-pink-500',
    motivational: 'from-green-500 to-emerald-500',
    funny: 'from-orange-500 to-red-500',
  };

  const quickStartOptions = [
    {
      icon: Code,
      title: "Code Helper",
      description: "Get help with programming in any language",
      message: "I need help with coding. Can you assist me with programming questions?",
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Find solutions to complex problems",
      message: "I have a problem I need help solving. Can you guide me through it?",
    },
    {
      icon: Heart,
      title: "Life Coach",
      description: "Get advice and emotional support",
      message: "I could use some life advice and guidance. Can you help me?",
    },
    {
      icon: Brain,
      title: "Learning Assistant",
      description: "Learn new topics and concepts",
      message: "I want to learn something new. Can you teach me about different topics?",
    },
    {
      icon: Zap,
      title: "Productivity",
      description: "Boost your efficiency and organization",
      message: "Help me be more productive and organized in my daily tasks.",
    },
    {
      icon: MessageCircle,
      title: "Chat & Explore",
      description: "Have a natural conversation",
      message: "Hi! I'd like to have a conversation and see what you can help me with.",
    },
  ];

  const personalityGreetings = {
    professional: "Hello! I'm your professional AI assistant, ready to help with any questions or tasks you have.",
    casual: "Hey there! 👋 I'm your friendly AI buddy, here to chat and help you out with whatever you need!",
    motivational: "Welcome, champion! 🌟 I'm here to empower you and help you achieve your goals. Let's make great things happen!",
    funny: "Well hello there, you magnificent human! 😄 I'm your quirky AI sidekick, ready to help and maybe crack a joke or two!",
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Greeting */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${personalityColors[settings.personality]} shadow-2xl shadow-violet-500/20 mb-6`}
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Brain className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1
            className={`text-4xl md:text-6xl font-bold mb-4 ${
              settings.theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className={`bg-gradient-to-r ${personalityColors[settings.personality]} bg-clip-text text-transparent`}>
              AI Assistant
            </span>
          </motion.h1>
          
          <motion.p
            className={`text-lg md:text-xl mb-8 ${
              settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {personalityGreetings[settings.personality]}
          </motion.p>
        </motion.div>

        {/* Quick Start Options */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {quickStartOptions.map((option, index) => (
            <motion.button
              key={option.title}
              onClick={() => onQuickStart(option.message)}
              className={`p-6 rounded-2xl text-left transition-all backdrop-blur-sm border ${
                settings.theme === 'dark'
                  ? 'bg-gray-800/60 border-gray-700 hover:bg-gray-800/80 text-white'
                  : 'bg-white/60 border-gray-200 hover:bg-white/80 text-gray-900'
              } hover:shadow-xl hover:shadow-violet-500/10`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${personalityColors[settings.personality]} mb-4 shadow-lg`}>
                <option.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
              <p className={`text-sm ${
                settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {option.description}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Features */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { label: "Multi-language Support", value: "20+" },
            { label: "Code Examples", value: "Any Language" },
            { label: "Real-time Response", value: "<1s" },
            { label: "Context Memory", value: "Unlimited" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
            >
              <div className={`text-2xl font-bold mb-2 bg-gradient-to-r ${personalityColors[settings.personality]} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className={`text-sm ${
                settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};