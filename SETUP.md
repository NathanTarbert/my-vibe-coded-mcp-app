# CopilotKit Setup Instructions

## 1. Install Required Dependencies

Run the following command to install the missing CopilotKit backend dependencies:

```bash
pnpm add @copilotkit/backend @copilotkit/nextjs
```

## 2. Configure OpenAI API Key

1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Update the `.env.local` file with your actual API key:
   ```
   OPENAI_API_KEY=sk-your_actual_api_key_here
   ```

## 3. Start the Development Server

```bash
pnpm dev
```

## Features

- **Kanban Board**: Simple task management with 4 status columns
- **AI Chat Assistant**: Custom Headless UI chat component powered by CopilotKit
- **Task Management**: Move tasks between columns, view priorities and assignees
- **Responsive Design**: Works on mobile and desktop

## Chat Functionality

The AI assistant can help you with:
- Task management questions
- Project planning
- Team collaboration
- General productivity tips

Click the chat button (bottom right) to start a conversation!
