# AI Assistant - Cross-Platform Application

A sophisticated AI assistant application available for Web, Desktop (Windows, macOS, Linux), and Mobile (iOS, Android) platforms.

## Features

- **Natural Conversation**: Context-aware AI responses with personality modes
- **Multi-Platform**: Web, Desktop (Electron/Tauri), and Mobile (React Native)
- **Beautiful UI**: Modern design with animations and particle effects
- **Voice Support**: Speech-to-text and text-to-speech capabilities
- **Theme Support**: Dark/Light mode with smooth transitions
- **Personality Modes**: Professional, Casual, Motivational, and Funny
- **Code Examples**: Support for multiple programming languages
- **Conversation Export**: Save conversations (Desktop only)

## Platform-Specific Features

### Web Application
- Runs in any modern browser
- Progressive Web App (PWA) capabilities
- Real-time animations with Framer Motion

### Desktop Application
- **Electron Version**: Cross-platform with native OS integration
- **Tauri Version**: Lightweight Rust-based alternative
- Native window controls and system integration
- Global shortcuts (Ctrl/Cmd + Shift + A)
- Conversation export functionality
- Always-on-top mode

### Mobile Application
- **React Native**: Native iOS and Android apps
- Touch-optimized interface
- Haptic feedback
- Voice recognition
- Background blur effects
- Gesture navigation

## Installation & Setup

### Web Development
```bash
npm install
npm run dev
```

### Desktop Development

#### Electron
```bash
npm install
npm run electron:dev
```

#### Tauri
```bash
npm install
npm run tauri:dev
```

### Mobile Development
```bash
# Install mobile dependencies
npm run mobile:install

# Run on Android
npm run mobile:android

# Run on iOS
npm run mobile:ios
```

## Building for Production

### Web
```bash
npm run build
```

### Desktop

#### Electron
```bash
npm run electron:build
```

#### Tauri
```bash
npm run tauri:build
```

### Mobile
```bash
# Android
npm run build:android

# iOS
npm run build:ios
```

## Architecture

### Core Components
- **ChatInterface**: Main conversation interface
- **Header**: Navigation and controls
- **ChatMessage**: Individual message rendering
- **ChatInput**: Message input with voice support
- **WelcomeScreen**: Initial user experience
- **ParticleBackground**: Animated background effects

### Context Management
- **ChatContext**: Manages conversation state and history
- **SettingsContext**: Handles user preferences and themes

### Platform Adaptations
- **Web**: Standard React with Framer Motion
- **Desktop**: Electron/Tauri with native OS features
- **Mobile**: React Native with platform-specific components

## Customization

### Adding New Personality Modes
1. Update `PersonalityMode` type in `src/types/index.ts`
2. Add personality configuration in components
3. Update AI response logic in `src/utils/aiService.ts`

### Theming
- Modify `personalityColors` in components
- Update Tailwind configuration for new color schemes
- Adjust gradient definitions

### AI Integration
- Replace mock responses in `src/utils/aiService.ts`
- Integrate with OpenAI, Claude, or other LLM APIs
- Add API key management

## Performance Optimizations

- **Web**: Code splitting and lazy loading
- **Desktop**: Efficient window management and memory usage
- **Mobile**: Optimized animations and gesture handling
- **Universal**: Context memoization and component optimization

## Security Considerations

- API key protection (environment variables)
- Content sanitization for AI responses
- Secure storage for conversation history
- Platform-specific security measures

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across platforms
5. Submit a pull request

## License

MIT License - see LICENSE file for details