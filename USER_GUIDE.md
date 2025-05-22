# S.E.N.T.I.N.E.L S.Y.X - User Guide

## Overview
This application is a full-screen chatbot powered by DeepSeek AI API, featuring a modern UI with glassmorphism effects. The chatbot provides an interactive interface for users to communicate with an AI assistant, with special features tailored for US Army Veterans.

## Features

### Left Pane
- **New Chat Session**: Start a fresh conversation with the AI
- **Prompts Modal**: Access categorized prompt templates for common questions
- **Chat History**: View past conversations grouped by date, with the ability to rename session titles

### Right Pane
- **DBQs and VACD Links**: Quick access to important veteran resources
- **Functional Buttons**: Save transcripts, reset sessions, and access help
- **AI Performance Chart**: Visual representation of AI response metrics

### Top Bar
- **Share Chat**: Generate shareable links or download chat transcripts
- **Email Chat**: Send the current conversation via email
- **Export to PDF**: Convert the conversation to a downloadable PDF
- **Language Changer**: Switch between multiple interface languages
- **HERO Button**: Quick access to emergency veteran services
- **Light/Dark Mode Toggle**: Switch between light and dark themes

### News Ticker
- Scrolling news feed with the latest updates for US Army Veterans

### User Input Section
- **Voice Button**: Speak your questions instead of typing
- **Internet Access Button**: Enable web search capabilities via Serper API
- **Chat With Document Button**: Upload and interact with document content

### Chat Controls
- **Temperature Control**: Adjust the creativity level of AI responses
- **Chat Tone**: Select different conversation styles (Professional, Casual, etc.)
- **Regenerate Chat**: Refresh the AI's last response
- **Copy Chat**: Copy the entire conversation to clipboard
- **Clear Chat**: Start over with a clean conversation

## Getting Started

1. **API Keys Setup**:
   - When first launching the application, you'll be prompted to enter your DeepSeek AI API key
   - Optionally, you can add a Serper API key to enable internet search capabilities
   - These keys are stored locally in your browser for security

2. **Starting a Conversation**:
   - Click "New Chat" in the left pane or simply type in the input box
   - For voice input, click the microphone icon and speak clearly
   - To search the internet, toggle the globe icon before sending your message
   - To chat about a document, click the document icon and upload your file

3. **Managing Conversations**:
   - Your chat history is automatically saved and organized by date
   - Hover over a chat session to rename or delete it
   - Use the prompt templates for quick access to common questions

4. **Customizing Experience**:
   - Adjust the temperature slider to control response creativity
   - Select different tones to match your preferred conversation style
   - Toggle between light and dark mode based on your preference

## Technical Information

This application is built with:
- React and TypeScript for the frontend
- Tailwind CSS for styling with glassmorphism effects
- Chart.js for performance visualization
- DeepSeek AI API for intelligent responses
- Serper API for internet search capabilities

## Troubleshooting

If you encounter any issues:
1. Verify your API keys are entered correctly
2. Check your internet connection
3. Try refreshing the page
4. Clear browser cache if problems persist

For additional support, use the Help button in the right pane.
