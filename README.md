# 🚀 Vibe Code Board with AI

A powerful, AI-powered Kanban board application built with Next.js, TypeScript, Tailwind CSS, and CopilotKit. Manage your projects with the help of an intelligent AI assistant that can understand your workflow and take actions on your behalf.

![Vibe Code Board](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![CopilotKit](https://img.shields.io/badge/CopilotKit-AI%20Powered-00D4AA?style=for-the-badge)

## ✨ Features

### 🎯 **Core Kanban Board**
- **Drag & Drop**: Intuitive task management with visual feedback
- **Status Columns**: To Do, In Progress, Review, Done
- **Priority Levels**: Low, Medium, High with color coding
- **Team Management**: Add, remove, and assign team members
- **Responsive Design**: Works perfectly on all devices

### 🤖 **AI-Powered Assistant**
- **Natural Language**: Chat with AI using everyday language
- **Smart Actions**: AI can create, move, and manage tasks
- **Context Awareness**: AI understands your current project state
- **Dynamic Suggestions**: Intelligent recommendations based on your workflow
- **Real-time Updates**: AI stays in sync with your board changes

### 🚀 **Modern Tech Stack**
- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Type-safe development experience
- **Tailwind CSS**: Utility-first CSS framework
- **CopilotKit**: Advanced AI integration framework
- **React 19**: Latest React with concurrent features

## 🎮 Quick Start

### Option 1: Automated Setup (Recommended)

**macOS/Linux:**
```bash
./QUICKSTART.sh
```

**Windows:**
```cmd
QUICKSTART.bat
```

### Option 2: Manual Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd my-vibes
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your CopilotKit API key**
   - Visit [https://cloud.copilotkit.ai/](https://cloud.copilotkit.ai/)
   - Sign up for a free account
   - Copy your public API key

4. **Create environment file**
   ```bash
   # .env.local
   NEXT_PUBLIC_COPILOT_CLOUD_PUBLIC_API_KEY=your_api_key_here
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

### Opening the AI Assistant
- Press `Ctrl+/` (Windows/Linux) or `Cmd+/` (Mac)
- The AI sidebar will slide in from the right
- Start chatting with natural language

### Example AI Commands
```
"Add a new high-priority task for database optimization"
"Move the landing page task to in-progress"
"Show me a summary of all high-priority tasks"
"Add John Smith to the team"
"Reassign the API documentation task to Sarah"
```

### Managing Your Board
- **Drag & Drop**: Move tasks between columns
- **Click to Edit**: Modify task details inline
- **Team Management**: Add/remove team members
- **Priority Setting**: Set task importance levels

## 📚 Documentation

- **[Developer Walkthrough](DEVELOPER_WALKTHROUGH.md)** - Comprehensive setup and development guide
- **[CopilotKit Features](COPILOTKIT_FEATURES.md)** - Detailed explanation of AI features
- **[API Reference](https://docs.copilotkit.ai/)** - Official CopilotKit documentation

## 🏗️ Project Structure

```
my-vibes/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout with CopilotKit
│   │   └── page.tsx       # Main application
│   └── components/        # Reusable components
├── public/                # Static assets
├── QUICKSTART.sh          # macOS/Linux setup script
├── QUICKSTART.bat         # Windows setup script
├── DEVELOPER_WALKTHROUGH.md # Comprehensive guide
├── COPILOTKIT_FEATURES.md # AI features documentation
└── README.md              # This file
```

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌟 AI Features Deep Dive

### Copilot Actions
- **Task Management**: Create, move, assign, and prioritize tasks
- **Team Management**: Add and remove team members
- **Analytics**: Get insights and summaries of your project

### Copilot Readables
- **Real-time State**: AI always knows your current project status
- **Context Awareness**: Understands relationships between tasks and team members
- **Dynamic Updates**: Automatically stays in sync with your changes

### Copilot Suggestions
- **Smart Recommendations**: AI suggests next actions based on your workflow
- **Context-Aware**: Considers task distribution and team workload
- **Real-time Updates**: Suggestions evolve as your project changes

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Other Platforms
- **Netlify**: Upload build folder
- **Docker**: Use provided Dockerfile
- **Custom Server**: Run `npm run build` and serve the output

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the guides above
- **Issues**: Create an issue in the repository
- **Community**: Join [CopilotKit Discord](https://discord.gg/copilotkit)
- **Email**: Contact the maintainers

## 🙏 Acknowledgments

- [CopilotKit](https://copilotkit.ai/) for the amazing AI integration framework
- [Next.js](https://nextjs.org/) for the powerful React framework
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful utility-first CSS
- [Vercel](https://vercel.com/) for the excellent deployment platform

---

**Made with ❤️ and AI** - Transform your project management with the power of artificial intelligence!

## 🎉 What's Next?

- [ ] **File Attachments**: Upload and manage files with AI
- [ ] **Advanced Analytics**: Charts, reports, and insights
- [ ] **Team Collaboration**: Real-time updates and notifications
- [ ] **Workflow Automation**: Custom rules and triggers
- [ ] **Mobile App**: React Native version
- [ ] **API Integrations**: Connect with GitHub, Slack, and more

**Star this repository** if you find it helpful! ⭐
