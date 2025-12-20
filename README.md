# GemCLI - Google AI Powered Command Line Interface

> An intelligent CLI powered by Google's Gemini AI with real-time tools and autonomous agent capabilities

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)

## ✨ Features

- 🤖 **Three AI Modes** - Basic chat, tool-enhanced, and autonomous agent
- 🌤️ **Real-time Tools** - Weather, news, web search, and more
- 🎨 **Code Generation** - Generate full web applications from prompts
- 🔐 **Secure Authentication** - Google account integration
- 💬 **Interactive Sessions** - Persistent conversation history
- 🚀 **Fast & Efficient** - Built with TypeScript for performance

## 🎯 Chat Modes

### 1. **Basic Chat Mode**
Simple conversational AI for questions and general assistance.
```bash
gemcli chat
```

### 2. **Tool Chat Mode** 
Enhanced AI with access to real-time data and external tools:
- 🌤️ Current weather conditions
- 📰 Latest news and updates  
- 🔍 Web search capabilities
- 📊 Data analysis tools
- 🌍 Location services

```bash
gemcli tool-chat
```

### 3. **Agent Mode**
Autonomous AI agent that can generate complete applications:
- ✅ Todo applications
- 📝 Note-taking apps
- 🎮 Simple games
- 📊 Dashboard interfaces
- 🎨 Landing pages

```bash
gemcli agent
```

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Authentication](#authentication)
- [Usage Examples](#usage-examples)
- [Configuration](#configuration)
- [API Keys](#api-keys)
- [Development](#development)
- [Contributing](#contributing)

## 🚀 Installation

### NPM
```bash
npm install -g gemcli
```

### From Source
```bash
git clone https://github.com/dndmein-rgb/cli.git
cd cli
npm install
npm run build
npm link
```

## ⚡ Quick Start

1. **Login with Google**
   ```bash
   gemcli login
   ```

2. **Start a conversation**
   ```bash
   # Basic chat
   gemcli chat

   # With real-time tools
   gemcli tool-chat

   # Agent mode for code generation
   gemcli agent
   ```

## 🔐 Authentication

First-time users must authenticate with their Google account:

```bash
gemcli login
```

This will:
1. Open your browser for Google authentication
2. Store credentials securely
3. Enable access to all CLI features

To logout:
```bash
gemcli logout
```

Check authentication status:
```bash
gemcli status
```

## 📖 Usage Examples

### Example 1: Get Current Weather

```bash
$ gemcli tool-chat
> What's the weather like in Tokyo?

🌤️ Current weather in Tokyo:
Temperature: 18°C
Condition: Partly Cloudy
Humidity: 65%
Wind: 12 km/h
```

### Example 2: Generate a Todo App

```bash
$ gemcli agent
> Create a modern todo application with dark mode

🤖 Generating application...
✅ Created: todo-app/
   ├── index.html
   ├── styles.css
   └── app.js

🚀 Your app is ready! Open index.html to view.
```

### Example 3: Research & Analysis

```bash
$ gemcli tool-chat
> Search for the latest developments in quantum computing

🔍 Searching the web...
📊 Found 15 recent articles

Here's a summary of recent quantum computing breakthroughs...
```

### Example 4: Multi-turn Conversation

```bash
$ gemcli chat
> Explain quantum entanglement

AI: Quantum entanglement is a phenomenon where...

> Can you give me a simple analogy?

AI: Think of it like a pair of magic coins...

> How is this used in quantum computing?

AI: In quantum computers, entanglement enables...
```

## ⚙️ Configuration

Create a `.gemcli.config.json` in your project root:

```json
{
  "defaultMode": "tool-chat",
  "model": "gemini-pro",
  "temperature": 0.7,
  "maxTokens": 2048,
  "tools": {
    "weather": true,
    "webSearch": true,
    "news": true,
    "calculator": true
  },
  "agent": {
    "outputDir": "./generated",
    "autoOpen": true,
    "framework": "vanilla"
  }
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultMode` | string | `"chat"` | Default chat mode (chat/tool-chat/agent) |
| `model` | string | `"gemini-pro"` | Gemini model to use |
| `temperature` | number | `0.7` | Creativity level (0-1) |
| `maxTokens` | number | `2048` | Maximum response length |
| `tools.weather` | boolean | `true` | Enable weather tool |
| `tools.webSearch` | boolean | `true` | Enable web search |
| `agent.outputDir` | string | `"./generated"` | Output directory for generated code |

## 🔑 API Keys

Set your Google AI API key:

```bash
# As environment variable
export GOOGLE_AI_API_KEY=your_api_key_here

# Or create .env file
echo "GOOGLE_AI_API_KEY=your_api_key_here" > .env
```

Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🛠️ Available Tools (Tool Chat Mode)

- **Weather** - Get current weather for any location
- **Web Search** - Search the web for information
- **News** - Fetch latest news articles
- **Calculator** - Perform calculations
- **Time/Date** - Get current time in any timezone
- **Currency** - Convert currencies with live rates
- **Translation** - Translate text between languages

## 🤖 Agent Capabilities

The agent mode can generate:

- **Web Applications**
  - Todo lists
  - Note apps
  - Calculators
  - Timers & stopwatches

- **UI Components**
  - Forms
  - Navigation bars
  - Cards & modals
  - Dashboards

- **Games**
  - Tic-tac-toe
  - Memory games
  - Snake
  - Puzzle games

## 🏗️ Architecture

```
cli/
├── client/              # CLI client application
│   ├── commands/        # Command implementations
│   ├── auth/           # Authentication logic
│   ├── chat/           # Chat mode handlers
│   └── utils/          # Utility functions
├── server/             # Backend API server
│   ├── api/            # API endpoints
│   ├── tools/          # Tool integrations
│   ├── agents/         # Agent logic
│   └── middleware/     # Express middleware
└── shared/             # Shared types and utilities
```

## 💻 Development

### Setup Development Environment

```bash
# Clone repository
git clone https://github.com/dndmein-rgb/cli.git
cd cli

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Run in development mode
npm run dev
```

### Available Scripts

```bash
npm run dev          # Start development mode
npm run build        # Build for production
npm test             # Run tests
npm run lint         # Lint code
npm run format       # Format code
```

### Project Structure

```bash
# Start client in watch mode
cd client && npm run dev

# Start server in watch mode  
cd server && npm run dev
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test
npm test -- chat.test.ts
```



## 🙏 Acknowledgments

- Built with [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- Powered by Node.js and TypeScript
- CLI framework by [Commander.js](https://github.com/tj/commander.js)



**Made with ❤️ by [dndmein-rgb](https://github.com/dndmein-rgb)**

⭐ If you find this useful, please star the repository!
