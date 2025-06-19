import React, { useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useChat } from '../context/ChatContext';
import { useSettings } from '../context/SettingsContext';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { WelcomeScreen } from './WelcomeScreen';
import { generateAIResponse } from '../utils/aiService';

const { height } = Dimensions.get('window');

export const ChatInterface: React.FC = () => {
  const { state, addMessage, setTyping } = useChat();
  const { settings } = useSettings();
  const flatListRef = useRef<FlatList>(null);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(1, { duration: 1000 });
  }, []);

  useEffect(() => {
    if (state.messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [state.messages, state.isTyping]);

  const handleSendMessage = async (content: string) => {
    addMessage({ content, sender: 'user' });
    setTyping(true);
    
    try {
      const aiResponse = await generateAIResponse(content, settings.personality, state.context);
      addMessage({ content: aiResponse, sender: 'assistant' });
    } catch (error) {
      addMessage({ 
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.", 
        sender: 'assistant' 
      });
    } finally {
      setTyping(false);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const renderMessage = ({ item, index }: { item: any; index: number }) => (
    <ChatMessage message={item} index={index} />
  );

  const renderFooter = () => {
    if (state.isTyping) {
      return <TypingIndicator />;
    }
    return null;
  };

  if (state.messages.length === 0) {
    return <WelcomeScreen onQuickStart={handleSendMessage} />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <Animated.View style={[styles.chatContainer, animatedStyle]}>
        <FlatList
          ref={flatListRef}
          data={state.messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderFooter}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        <ChatInput onSendMessage={handleSendMessage} disabled={state.isTyping} />
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesList: {
    paddingVertical: 20,
    flexGrow: 1,
  },
});