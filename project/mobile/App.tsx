import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { ChatProvider } from './src/context/ChatContext';
import { SettingsProvider } from './src/context/SettingsContext';
import { Header } from './src/components/Header';
import { ChatInterface } from './src/components/ChatInterface';
import { WelcomeScreen } from './src/components/WelcomeScreen';
import { ParticleBackground } from './src/components/ParticleBackground';

const { width, height } = Dimensions.get('window');

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.loadingContainer}
      >
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        {/* Loading animation would go here */}
      </LinearGradient>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SettingsProvider>
        <ChatProvider>
          <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
          <LinearGradient
            colors={['#1a1a2e', '#16213e', '#0f3460']}
            style={styles.container}
          >
            <ParticleBackground />
            <SafeAreaView style={styles.safeArea}>
              <Header />
              <ChatInterface />
            </SafeAreaView>
          </LinearGradient>
        </ChatProvider>
      </SettingsProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
});

export default App;