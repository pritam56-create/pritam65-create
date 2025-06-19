import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { useSettings } from '../context/SettingsContext';

const { width } = Dimensions.get('window');

export const Header: React.FC = () => {
  const { settings, updateTheme, updatePersonality, toggleVoice, toggleSound } = useSettings();
  const [showSettings, setShowSettings] = useState(false);
  const settingsHeight = useSharedValue(0);

  const personalityColors = {
    professional: ['#3B82F6', '#06B6D4'],
    casual: ['#8B5CF6', '#EC4899'],
    motivational: ['#10B981', '#059669'],
    funny: ['#F59E0B', '#EF4444'],
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    settingsHeight.value = withSpring(showSettings ? 0 : 120);
  };

  const settingsAnimatedStyle = useAnimatedStyle(() => ({
    height: settingsHeight.value,
    opacity: withTiming(showSettings ? 1 : 0),
  }));

  return (
    <View style={styles.container}>
      <BlurView style={styles.header} blurType="dark" blurAmount={20}>
        <View style={styles.headerContent}>
          <View style={styles.brandContainer}>
            <LinearGradient
              colors={personalityColors[settings.personality]}
              style={styles.iconContainer}
            >
              <Text style={styles.iconText}>AI</Text>
            </LinearGradient>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>AI Assistant</Text>
              <Text style={styles.subtitle}>{settings.personality} Mode</Text>
            </View>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.controlButton, settings.voiceEnabled && styles.activeButton]}
              onPress={toggleVoice}
            >
              <Text style={styles.controlIcon}>🎤</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, settings.soundEnabled && styles.activeButton]}
              onPress={toggleSound}
            >
              <Text style={styles.controlIcon}>🔊</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => updateTheme(settings.theme === 'dark' ? 'light' : 'dark')}
            >
              <Text style={styles.controlIcon}>{settings.theme === 'dark' ? '☀️' : '🌙'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, showSettings && styles.activeButton]}
              onPress={toggleSettings}
            >
              <Text style={styles.controlIcon}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Animated.View style={[styles.settingsPanel, settingsAnimatedStyle]}>
          <Text style={styles.settingsTitle}>Personality Mode:</Text>
          <View style={styles.personalityButtons}>
            {Object.keys(personalityColors).map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.personalityButton,
                  settings.personality === mode && styles.activePersonality,
                ]}
                onPress={() => updatePersonality(mode as any)}
              >
                <LinearGradient
                  colors={
                    settings.personality === mode
                      ? personalityColors[mode as keyof typeof personalityColors]
                      : ['#374151', '#4B5563']
                  }
                  style={styles.personalityGradient}
                >
                  <Text style={styles.personalityText}>{mode}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight || 44,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    textTransform: 'capitalize',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  activeButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
  },
  controlIcon: {
    fontSize: 16,
  },
  settingsPanel: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  settingsTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  personalityButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  personalityButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  personalityGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  personalityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  activePersonality: {
    transform: [{ scale: 1.05 }],
  },
});