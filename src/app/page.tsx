'use client';

import { useState, useCallback } from 'react';
import { CopilotSidebar } from '@copilotkit/react-ui';
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
import { useCopilotChatSuggestions } from '@copilotkit/react-ui';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'review' | 'done';
}

const initialTeamMembers = ['Nathan Tarbert', 'Sarah Chen', 'Mike Rodriguez', 'Emily Johnson'];

const dummyData: Task[] = [
  {
    id: '1',
    title: 'Design new landing page',
    description: 'Create wireframes and mockups for the new landing page design',
    assignee: 'Nathan Tarbert',
    priority: 'high',
    status: 'todo'
  },
  {
    id: '2',
    title: 'Implement user authentication',
    description: 'Set up login, registration, and password reset functionality',
    assignee: 'Sarah Chen',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all endpoints with examples and response formats',
    assignee: 'Mike Rodriguez',
    priority: 'medium',
    status: 'review'
  },
  {
    id: '4',
    title: 'Fix mobile responsive issues',
    description: 'Resolve layout problems on mobile devices',
    assignee: 'Emily Johnson',
    priority: 'medium',
    status: 'done'
  },
  {
    id: '5',
    title: 'Database optimization',
    description: 'Optimize database queries and add proper indexing',
    assignee: 'Nathan Tarbert',
    priority: 'low',
    status: 'todo'
  },
  {
    id: '6',
    title: 'Unit test coverage',
    description: 'Increase test coverage to 90% for critical modules',
    assignee: 'Sarah Chen',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: '7',
    title: 'Deploy to staging',
    description: 'Set up staging environment and deploy latest changes',
    assignee: 'Mike Rodriguez',
    priority: 'high',
    status: 'review'
  },
  {
    id: '8',
    title: 'Code review feedback',
    description: 'Address feedback from recent code review',
    assignee: 'Emily Johnson',
    priority: 'low',
    status: 'done'
  }
];

const statusColumns = [
  { id: 'todo', title: 'To Do', color: 'bg-gray-50', borderColor: 'border-gray-200' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50', borderColor: 'border-blue-200' },
  { id: 'review', title: 'Review', color: 'bg-yellow-50', borderColor: 'border-yellow-200' },
  { id: 'done', title: 'Done', color: 'bg-green-50', borderColor: 'border-green-200' }
];

const priorityColors = {
  low: 'bg-gray-100 text-gray-700 border-gray-200',
  medium: 'bg-amber-100 text-amber-800 border-amber-200',
  high: 'bg-red-100 text-red-800 border-red-200'
};

// Get unique employees for the header
const employees = [...new Set(dummyData.map(task => task.assignee))];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(dummyData);
  const [teamMembers, setTeamMembers] = useState<string[]>(initialTeamMembers);
  const [newMemberName, setNewMemberName] = useState('');
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  // ===== COPILOTKIT FEATURES =====
  
  // 1. COPILOT READABLES - Make app state available to the AI
  useCopilotReadable({
    description: "Current list of tasks in the Kanban board",
    value: tasks,
  });

  useCopilotReadable({
    description: "Current team members",
    value: teamMembers,
  });

  useCopilotReadable({
    description: "Available task statuses",
    value: statusColumns.map(col => ({ id: col.id, title: col.title })),
  });

  useCopilotReadable({
    description: "Available priority levels",
    value: Object.keys(priorityColors),
  });

  // 2. COPILOT ACTIONS - Allow AI to perform actions
  useCopilotAction({
    name: "addTask",
    description: "Add a new task to the Kanban board",
    parameters: [
      {
        name: "title",
        type: "string",
        description: "The title of the task",
        required: true,
      },
      {
        name: "description",
        type: "string",
        description: "The description of the task",
        required: true,
      },
      {
        name: "assignee",
        type: "string",
        description: "The team member assigned to the task",
        required: true,
      },
      {
        name: "priority",
        type: "string",
        description: "The priority level (low, medium, high)",
        required: true,
        enum: ["low", "medium", "high"],
      },
      {
        name: "status",
        type: "string",
        description: "The initial status of the task",
        required: true,
        enum: ["todo", "in-progress", "review", "done"],
      },
    ],
    handler: async ({ title, description, assignee, priority, status }) => {
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        description,
        assignee,
        priority: priority as 'low' | 'medium' | 'high',
        status: status as 'todo' | 'in-progress' | 'review' | 'done',
      };
      setTasks(prev => [...prev, newTask]);
      return `Task "${title}" has been added successfully!`;
    },
  });

  useCopilotAction({
    name: "moveTask",
    description: "Move a task to a different status column",
    parameters: [
      {
        name: "taskId",
        type: "string",
        description: "The ID of the task to move",
        required: true,
      },
      {
        name: "newStatus",
        type: "string",
        description: "The new status to move the task to",
        required: true,
        enum: ["todo", "in-progress", "review", "done"],
      },
    ],
    handler: async ({ taskId, newStatus }) => {
      const task = tasks.find(t => t.id === taskId);
      if (!task) {
        throw new Error(`Task with ID ${taskId} not found`);
      }
      moveTask(taskId, newStatus as Task['status']);
      return `Task "${task.title}" has been moved to ${newStatus}`;
    },
  });

  useCopilotAction({
    name: "assignTask",
    description: "Assign a task to a different team member",
    parameters: [
      {
        name: "taskId",
        type: "string",
        description: "The ID of the task to reassign",
        required: true,
      },
      {
        name: "newAssignee",
        type: "string",
        description: "The new team member to assign the task to",
        required: true,
      },
    ],
    handler: async ({ taskId, newAssignee }) => {
      const task = tasks.find(t => t.id === taskId);
      if (!task) {
        throw new Error(`Task with ID ${taskId} not found`);
      }
      if (!teamMembers.includes(newAssignee)) {
        throw new Error(`Team member "${newAssignee}" not found`);
      }
      assignTask(taskId, newAssignee);
      return `Task "${task.title}" has been reassigned to ${newAssignee}`;
    },
  });

  useCopilotAction({
    name: "addTeamMember",
    description: "Add a new team member to the team",
    parameters: [
      {
        name: "memberName",
        type: "string",
        description: "The name of the new team member",
        required: true,
      },
    ],
    handler: async ({ memberName }) => {
      if (teamMembers.includes(memberName)) {
        throw new Error(`Team member "${memberName}" already exists`);
      }
      setTeamMembers(prev => [...prev, memberName]);
      return `Team member "${memberName}" has been added successfully!`;
    },
  });

  useCopilotAction({
    name: "removeTeamMember",
    description: "Remove a team member from the team (only if they have no assigned tasks)",
    parameters: [
      {
        name: "memberName",
        type: "string",
        description: "The name of the team member to remove",
        required: true,
      },
    ],
    handler: async ({ memberName }) => {
      const hasAssignedTasks = tasks.some(task => task.assignee === memberName);
      if (hasAssignedTasks) {
        throw new Error(`Cannot remove team member "${memberName}" because they have assigned tasks. Please reassign their tasks first.`);
      }
      setTeamMembers(prev => prev.filter(member => member !== memberName));
      return `Team member "${memberName}" has been removed successfully!`;
    },
  });

  useCopilotAction({
    name: "getTaskSummary",
    description: "Get a summary of tasks by status, priority, or assignee",
    parameters: [
      {
        name: "filterType",
        type: "string",
        description: "The type of filter to apply (status, priority, assignee, or all)",
        required: true,
        enum: ["status", "priority", "assignee", "all"],
      },
      {
        name: "filterValue",
        type: "string",
        description: "The specific value to filter by (optional for 'all')",
        required: false,
      },
    ],
    handler: async ({ filterType, filterValue }) => {
      let filteredTasks = tasks;
      
      if (filterType === "status" && filterValue) {
        filteredTasks = tasks.filter(task => task.status === filterValue);
      } else if (filterType === "priority" && filterValue) {
        filteredTasks = tasks.filter(task => task.priority === filterValue);
      } else if (filterType === "assignee" && filterValue) {
        filteredTasks = tasks.filter(task => task.assignee === filterValue);
      }
      
      const summary = {
        total: filteredTasks.length,
        byStatus: Object.fromEntries(
          statusColumns.map(col => [col.id, filteredTasks.filter(task => task.status === col.id).length])
        ),
        byPriority: Object.fromEntries(
          Object.keys(priorityColors).map(priority => [priority, filteredTasks.filter(task => task.priority === priority).length])
        ),
        byAssignee: Object.fromEntries(
          teamMembers.map(member => [member, filteredTasks.filter(task => task.assignee === member).length])
        ),
      };
      
      return summary;
    },
  });

  // 3. COPILOT SUGGESTIONS - Generate dynamic suggestions based on app state
  useCopilotChatSuggestions(
    {
      instructions: "Based on the current state of the Kanban board, suggest relevant actions the user might want to take. Consider task distribution, team workload, and common project management actions.",
      minSuggestions: 2,
      maxSuggestions: 4,
    },
    [tasks, teamMembers], // Dependencies to monitor for changes
  );

  // ===== END COPILOTKIT FEATURES =====

  const moveTask = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const assignTask = (taskId: string, newAssignee: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, assignee: newAssignee } : task
      )
    );
  };

  const addTeamMember = () => {
    if (newMemberName.trim() && !teamMembers.includes(newMemberName.trim())) {
      setTeamMembers(prev => [...prev, newMemberName.trim()]);
      setNewMemberName('');
    }
  };

  const removeTeamMember = (memberName: string) => {
    // Only allow removal if no tasks are assigned to this member
    const hasAssignedTasks = tasks.some(task => task.assignee === memberName);
    if (hasAssignedTasks) {
      alert('Cannot remove team member with assigned tasks. Please reassign their tasks first.');
      return;
    }
    setTeamMembers(prev => prev.filter(member => member !== memberName));
  };

  const handleDragStart = useCallback((e: React.DragEvent, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetStatus: Task['status']) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== targetStatus) {
      moveTask(draggedTask.id, targetStatus);
    }
    setDraggedTask(null);
  }, [draggedTask]);

  const handleDragEnd = useCallback(() => {
    setDraggedTask(null);
  }, []);

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <main>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
           Vibe Coded Board
          </h1>
          
          {/* AI Assistant Instructions */}
          <div className="mb-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">AI</span>
                </div>
                <h3 className="text-lg font-semibold text-blue-900">AI Assistant Available</h3>
              </div>
              <p className="text-blue-800 mb-3">
                Press <kbd className="px-2 py-1 bg-white border border-blue-300 rounded text-sm font-mono">Ctrl+/</kbd> or <kbd className="px-2 py-1 bg-white border border-blue-300 rounded text-sm font-mono">Cmd+/</kbd> to open the AI assistant. 
                I can help you manage tasks, add team members, and provide project insights!
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm text-blue-700">
                <span className="px-3 py-1 bg-blue-100 rounded-full">✨ Add tasks</span>
                <span className="px-3 py-1 bg-blue-100 rounded-full">🔄 Move tasks</span>
                <span className="px-3 py-1 bg-blue-100 rounded-full">👥 Manage team</span>
                <span className="px-3 py-1 bg-blue-100 rounded-full">📊 Get insights</span>
              </div>
            </div>
          </div>
          
          {/* Team Members Management */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Team Members</h2>
            
            {/* Add new team member */}
            <div className="flex justify-center mb-4">
              <div className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="Enter new team member name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => e.key === 'Enter' && addTeamMember()}
                />
                <button
                  onClick={addTeamMember}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Display team members */}
            <div className="flex flex-wrap justify-center gap-4">
              {teamMembers.map(member => (
                <div
                  key={member}
                  className="px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center gap-2 group min-w-[120px]"
                >
                  <span className="text-gray-800 font-medium text-center">{member}</span>
                  <button
                    onClick={() => removeTeamMember(member)}
                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full border border-gray-300 flex items-center justify-center text-sm font-bold"
                    title="Remove team member"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statusColumns.map(column => (
              <div 
                key={column.id} 
                className={`${column.color} rounded-xl p-6 border ${column.borderColor} min-h-[20rem]`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id as Task['status'])}
              >
                <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  {column.title}
                </h2>
                
                <div className="space-y-4">
                  {getTasksByStatus(column.id as Task['status']).map(task => (
                                          <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        onDragEnd={handleDragEnd}
                        className={`bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing min-h-[12rem] flex flex-col ${
                          draggedTask?.id === task.id ? 'opacity-50 scale-95' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-gray-900 text-base leading-tight pr-2">
                            {task.title}
                          </h3>
                          <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${priorityColors[task.priority]} flex-shrink-0`}>
                            {task.priority}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
                          {task.description}
                        </p>
                        
                        <div className="flex flex-col gap-2 mt-auto">
                          {/* Assignee dropdown */}
                          <select
                            value={task.assignee}
                            onChange={(e) => assignTask(task.id, e.target.value)}
                            className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors w-full"
                          >
                            {teamMembers.map(member => (
                              <option key={member} value={member}>
                                {member}
                              </option>
                            ))}
                          </select>
                          
                          {/* Status dropdown */}
                          {column.id !== 'done' && (
                            <select
                              value={task.status}
                              onChange={(e) => moveTask(task.id, e.target.value as Task['status'])}
                              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors w-full"
                            >
                              {statusColumns.map(col => (
                                <option key={col.id} value={col.id}>
                                  {col.title}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 4. COPILOT SIDEBAR - AI Chat Interface */}
      <CopilotSidebar
        labels={{
          title: "Vibe Code Copilot",
          initial: "Hi! 👋 I'm your AI assistant for the Kanban board. I can help you manage tasks, team members, and provide insights about your project. What would you like to do?",
        }}
        defaultOpen={false}
        shortcut="/"
        className="z-50"
      >
        {/* The sidebar will render your app content */}
      </CopilotSidebar>
      
    </main>
  );
}
