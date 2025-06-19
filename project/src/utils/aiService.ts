import { PersonalityMode } from '../types';

// Enhanced AI responses based on personality with detailed explanations
const personalityResponses = {
  professional: {
    greeting: "Good day! I'm here to provide you with accurate, comprehensive assistance. How may I help you achieve your objectives today?",
    responses: [
      "Based on my analysis, I recommend the following approach:",
      "From a professional standpoint, the optimal solution would be:",
      "Let me provide you with a structured response to address your inquiry:",
      "I can offer you several evidence-based strategies for this situation:",
    ]
  },
  casual: {
    greeting: "Hey there! 😊 I'm super excited to chat with you and help out however I can. What's on your mind?",
    responses: [
      "Oh, that's a great question! Here's what I'm thinking:",
      "You know what? I've got some cool ideas for you:",
      "That's totally doable! Let me break it down for you:",
      "Awesome question! Here's the deal:",
    ]
  },
  motivational: {
    greeting: "Welcome, champion! 🌟 You've got this, and I'm here to support your journey to greatness. What goals are we crushing today?",
    responses: [
      "You're on the right track! Here's how we can level this up:",
      "I believe in you! Let's tackle this challenge together:",
      "This is your moment to shine! Here's the game plan:",
      "You've got incredible potential! Let's unlock it with this approach:",
    ]
  },
  funny: {
    greeting: "Well, well, well! Look who decided to chat with the most entertaining AI on the internet! 😄 What can I help you with, you magnificent human?",
    responses: [
      "Haha, great question! Let me put on my thinking cap (it's invisible, but very stylish):",
      "Oh boy, do I have some ideas for you! *cracks digital knuckles*",
      "This is like my favorite type of problem! Here's what my silicon brain came up with:",
      "You know what's funny? I was just thinking about this exact thing! Here's the scoop:",
    ]
  }
};

const codeExamples = {
  javascript: `// Here's a comprehensive JavaScript example:
function createAdvancedCalculator() {
  const calculator = {
    // Basic arithmetic operations
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
      if (b === 0) throw new Error('Division by zero');
      return a / b;
    },
    
    // Advanced operations
    power: (base, exponent) => Math.pow(base, exponent),
    sqrt: (num) => Math.sqrt(num),
    factorial: (n) => {
      if (n < 0) throw new Error('Factorial of negative number');
      return n <= 1 ? 1 : n * calculator.factorial(n - 1);
    },
    
    // Chain operations
    chain: function(initialValue) {
      let value = initialValue;
      return {
        add: (n) => { value += n; return this; },
        multiply: (n) => { value *= n; return this; },
        result: () => value
      };
    }
  };
  
  return calculator;
}

// Usage examples:
const calc = createAdvancedCalculator();
console.log(calc.add(5, 3)); // 8
console.log(calc.factorial(5)); // 120
console.log(calc.chain(10).add(5).multiply(2).result()); // 30`,
  
  python: `# Here's a comprehensive Python example:
class AdvancedCalculator:
    """A feature-rich calculator with multiple operations and error handling."""
    
    def __init__(self):
        self.history = []
    
    def _log_operation(self, operation, result):
        """Log operations for history tracking."""
        self.history.append(f"{operation} = {result}")
    
    def add(self, a, b):
        """Add two numbers."""
        result = a + b
        self._log_operation(f"{a} + {b}", result)
        return result
    
    def subtract(self, a, b):
        """Subtract second number from first."""
        result = a - b
        self._log_operation(f"{a} - {b}", result)
        return result
    
    def multiply(self, a, b):
        """Multiply two numbers."""
        result = a * b
        self._log_operation(f"{a} * {b}", result)
        return result
    
    def divide(self, a, b):
        """Divide first number by second with error handling."""
        if b == 0:
            raise ValueError("Division by zero is not allowed")
        result = a / b
        self._log_operation(f"{a} / {b}", result)
        return result
    
    def power(self, base, exponent):
        """Calculate base raised to exponent."""
        result = base ** exponent
        self._log_operation(f"{base} ^ {exponent}", result)
        return result
    
    def factorial(self, n):
        """Calculate factorial of a number."""
        if n < 0:
            raise ValueError("Factorial of negative number is undefined")
        if n == 0 or n == 1:
            return 1
        
        result = 1
        for i in range(2, n + 1):
            result *= i
        
        self._log_operation(f"{n}!", result)
        return result
    
    def get_history(self):
        """Return calculation history."""
        return self.history.copy()
    
    def clear_history(self):
        """Clear calculation history."""
        self.history.clear()

# Usage examples:
calc = AdvancedCalculator()
print(calc.add(10, 5))      # 15
print(calc.multiply(3, 4))  # 12
print(calc.factorial(5))    # 120
print(calc.get_history())   # Shows all operations`,
  
  react: `// Here's a comprehensive React component example:
import React, { useState, useEffect, useCallback } from 'react';

const AdvancedTodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const addTodo = useCallback((text) => {
    if (text.trim()) {
      const newTodo = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos(prev => [...prev, newTodo]);
      setInputValue('');
    }
  }, []);

  // Toggle todo completion
  const toggleTodo = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  // Delete todo
  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  // Start editing
  const startEdit = useCallback((id, text) => {
    setEditingId(id);
    setEditValue(text);
  }, []);

  // Save edit
  const saveEdit = useCallback(() => {
    if (editValue.trim()) {
      setTodos(prev => prev.map(todo =>
        todo.id === editingId 
          ? { ...todo, text: editValue.trim() }
          : todo
      ));
    }
    setEditingId(null);
    setEditValue('');
  }, [editingId, editValue]);

  // Filter todos based on current filter
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active': return !todo.completed;
      case 'completed': return todo.completed;
      default: return true;
    }
  });

  // Statistics
  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Advanced Todo App</h1>
      
      {/* Add Todo Form */}
      <form onSubmit={(e) => { e.preventDefault(); addTodo(inputValue); }}>
        <div className="flex mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add
          </button>
        </div>
      </form>

      {/* Filter Buttons */}
      <div className="flex justify-center mb-4 space-x-2">
        {['all', 'active', 'completed'].map(filterType => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={\`px-3 py-1 rounded text-sm \${
              filter === filterType
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }\`}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
        ))}
      </div>

      {/* Statistics */}
      <div className="text-sm text-gray-600 mb-4 text-center">
        Total: {stats.total} | Active: {stats.active} | Completed: {stats.completed}
      </div>

      {/* Todo List */}
      <ul className="space-y-2">
        {filteredTodos.map(todo => (
          <li key={todo.id} className="flex items-center p-2 border rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-3"
            />
            
            {editingId === todo.id ? (
              <div className="flex-1 flex">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={saveEdit}
                  onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                  className="flex-1 px-2 py-1 border rounded"
                  autoFocus
                />
              </div>
            ) : (
              <span
                className={\`flex-1 \${todo.completed ? 'line-through text-gray-500' : ''}\`}
                onDoubleClick={() => startEdit(todo.id, todo.text)}
              >
                {todo.text}
              </span>
            )}
            
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-2 px-2 py-1 text-red-500 hover:bg-red-100 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {filteredTodos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          {filter === 'all' ? 'No todos yet!' : \`No \${filter} todos!\`}
        </p>
      )}
    </div>
  );
};

export default AdvancedTodoApp;`,

  python_advanced: `# Advanced Python Example: Data Analysis with Classes and Error Handling
import json
import statistics
from datetime import datetime, timedelta
from typing import List, Dict, Optional, Union

class DataAnalyzer:
    """
    A comprehensive data analysis class with multiple statistical operations,
    data validation, and export capabilities.
    """
    
    def __init__(self, name: str = "Data Analysis"):
        self.name = name
        self.data: List[Union[int, float]] = []
        self.metadata: Dict = {
            'created_at': datetime.now().isoformat(),
            'last_modified': None,
            'operations_count': 0
        }
        self.history: List[Dict] = []
    
    def add_data(self, values: Union[List[Union[int, float]], Union[int, float]]) -> None:
        """Add data points with validation."""
        if isinstance(values, (int, float)):
            values = [values]
        
        # Validate data types
        for value in values:
            if not isinstance(value, (int, float)):
                raise TypeError(f"Invalid data type: {type(value)}. Only numbers allowed.")
            if not (-1e10 <= value <= 1e10):  # Reasonable range check
                raise ValueError(f"Value {value} is outside acceptable range.")
        
        self.data.extend(values)
        self._update_metadata("add_data", len(values))
    
    def remove_outliers(self, method: str = "iqr", factor: float = 1.5) -> List[Union[int, float]]:
        """Remove outliers using IQR or Z-score method."""
        if not self.data:
            raise ValueError("No data available for outlier removal.")
        
        if method == "iqr":
            q1 = statistics.quantiles(self.data, n=4)[0]
            q3 = statistics.quantiles(self.data, n=4)[2]
            iqr = q3 - q1
            lower_bound = q1 - factor * iqr
            upper_bound = q3 + factor * iqr
            
            cleaned_data = [x for x in self.data if lower_bound <= x <= upper_bound]
            
        elif method == "zscore":
            mean = statistics.mean(self.data)
            stdev = statistics.stdev(self.data)
            cleaned_data = [x for x in self.data if abs((x - mean) / stdev) <= factor]
            
        else:
            raise ValueError("Method must be 'iqr' or 'zscore'")
        
        removed_count = len(self.data) - len(cleaned_data)
        self.data = cleaned_data
        self._update_metadata("remove_outliers", removed_count)
        
        return cleaned_data
    
    def get_statistics(self) -> Dict[str, Union[float, int]]:
        """Calculate comprehensive statistics."""
        if not self.data:
            raise ValueError("No data available for statistical analysis.")
        
        try:
            stats = {
                'count': len(self.data),
                'mean': statistics.mean(self.data),
                'median': statistics.median(self.data),
                'mode': statistics.mode(self.data) if len(set(self.data)) < len(self.data) else None,
                'std_dev': statistics.stdev(self.data) if len(self.data) > 1 else 0,
                'variance': statistics.variance(self.data) if len(self.data) > 1 else 0,
                'min': min(self.data),
                'max': max(self.data),
                'range': max(self.data) - min(self.data),
                'sum': sum(self.data)
            }
            
            # Add quartiles if enough data
            if len(self.data) >= 4:
                quartiles = statistics.quantiles(self.data, n=4)
                stats.update({
                    'q1': quartiles[0],
                    'q2': quartiles[1],  # Same as median
                    'q3': quartiles[2],
                    'iqr': quartiles[2] - quartiles[0]
                })
            
            self._update_metadata("get_statistics")
            return stats
            
        except statistics.StatisticsError as e:
            raise ValueError(f"Statistical calculation error: {e}")
    
    def export_data(self, filename: str, format: str = "json") -> str:
        """Export data and analysis to file."""
        export_data = {
            'name': self.name,
            'data': self.data,
            'statistics': self.get_statistics() if self.data else {},
            'metadata': self.metadata,
            'history': self.history,
            'exported_at': datetime.now().isoformat()
        }
        
        if format.lower() == "json":
            with open(f"{filename}.json", 'w') as f:
                json.dump(export_data, f, indent=2)
            return f"{filename}.json"
        
        elif format.lower() == "csv":
            import csv
            with open(f"{filename}.csv", 'w', newline='') as f:
                writer = csv.writer(f)
                writer.writerow(['Index', 'Value'])
                for i, value in enumerate(self.data):
                    writer.writerow([i, value])
            return f"{filename}.csv"
        
        else:
            raise ValueError("Format must be 'json' or 'csv'")
    
    def _update_metadata(self, operation: str, details: Union[int, str] = None) -> None:
        """Update metadata and history."""
        self.metadata['last_modified'] = datetime.now().isoformat()
        self.metadata['operations_count'] += 1
        
        self.history.append({
            'operation': operation,
            'timestamp': datetime.now().isoformat(),
            'details': details,
            'data_size': len(self.data)
        })
    
    def __str__(self) -> str:
        """String representation of the analyzer."""
        return f"DataAnalyzer('{self.name}', {len(self.data)} data points)"
    
    def __len__(self) -> int:
        """Return number of data points."""
        return len(self.data)

# Usage example:
if __name__ == "__main__":
    # Create analyzer instance
    analyzer = DataAnalyzer("Sales Data Analysis")
    
    # Add sample data
    sales_data = [100, 150, 200, 175, 300, 250, 180, 220, 190, 280, 1000]  # Note: 1000 is an outlier
    analyzer.add_data(sales_data)
    
    print(f"Original data: {len(analyzer)} points")
    print(f"Statistics before cleaning: {analyzer.get_statistics()}")
    
    # Remove outliers
    cleaned = analyzer.remove_outliers(method="iqr")
    print(f"After outlier removal: {len(analyzer)} points")
    print(f"Statistics after cleaning: {analyzer.get_statistics()}")
    
    # Export results
    filename = analyzer.export_data("sales_analysis", "json")
    print(f"Data exported to: {filename}")`,

  html_css: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Interactive Dashboard</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        .dashboard {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            animation: fadeIn 0.8s ease-out;
        }

        .card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }

        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.5s;
        }

        .card:hover::before {
            left: 100%;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .card-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #f0f0f0;
        }

        .card-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            color: white;
            font-size: 18px;
        }

        .card-title {
            font-size: 1.4em;
            font-weight: 600;
            color: #333;
        }

        .metric {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 0;
            border-bottom: 1px solid #eee;
        }

        .metric:last-child {
            border-bottom: none;
        }

        .metric-label {
            font-weight: 500;
            color: #666;
        }

        .metric-value {
            font-size: 1.2em;
            font-weight: 700;
            color: #333;
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e0e0e0;
            border-radius: 4px;
            overflow: hidden;
            margin: 10px 0;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 4px;
            transition: width 1s ease-out;
            animation: progressAnimation 2s ease-out;
        }

        .chart-container {
            height: 200px;
            background: #f8f9fa;
            border-radius: 10px;
            display: flex;
            align-items: end;
            justify-content: space-around;
            padding: 20px;
            margin: 15px 0;
        }

        .chart-bar {
            width: 30px;
            background: linear-gradient(to top, #667eea, #764ba2);
            border-radius: 4px 4px 0 0;
            transition: height 1s ease-out;
            animation: barAnimation 1.5s ease-out;
        }

        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
        }

        .status-online { background: #4CAF50; }
        .status-warning { background: #FF9800; }
        .status-offline { background: #F44336; }

        .button {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin: 5px;
        }

        .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 1000;
        }

        .notification.show {
            transform: translateX(0);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes progressAnimation {
            from { width: 0; }
        }

        @keyframes barAnimation {
            from { height: 0; }
        }

        @media (max-width: 768px) {
            .dashboard {
                grid-template-columns: 1fr;
                padding: 10px;
            }
            
            .card {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <!-- Analytics Card -->
        <div class="card">
            <div class="card-header">
                <div class="card-icon">📊</div>
                <div class="card-title">Analytics Overview</div>
            </div>
            <div class="metric">
                <span class="metric-label">Total Users</span>
                <span class="metric-value">12,847</span>
            </div>
            <div class="metric">
                <span class="metric-label">Revenue</span>
                <span class="metric-value">$45,230</span>
            </div>
            <div class="metric">
                <span class="metric-label">Conversion Rate</span>
                <span class="metric-value">3.2%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: 75%;"></div>
            </div>
        </div>

        <!-- Performance Card -->
        <div class="card">
            <div class="card-header">
                <div class="card-icon">⚡</div>
                <div class="card-title">Performance Metrics</div>
            </div>
            <div class="chart-container">
                <div class="chart-bar" style="height: 60%;"></div>
                <div class="chart-bar" style="height: 80%;"></div>
                <div class="chart-bar" style="height: 45%;"></div>
                <div class="chart-bar" style="height: 90%;"></div>
                <div class="chart-bar" style="height: 70%;"></div>
                <div class="chart-bar" style="height: 85%;"></div>
            </div>
            <div class="metric">
                <span class="metric-label">Avg Response Time</span>
                <span class="metric-value">245ms</span>
            </div>
        </div>

        <!-- System Status Card -->
        <div class="card">
            <div class="card-header">
                <div class="card-icon">🖥️</div>
                <div class="card-title">System Status</div>
            </div>
            <div class="metric">
                <span class="metric-label">
                    <span class="status-indicator status-online"></span>
                    Web Server
                </span>
                <span class="metric-value">Online</span>
            </div>
            <div class="metric">
                <span class="metric-label">
                    <span class="status-indicator status-warning"></span>
                    Database
                </span>
                <span class="metric-value">Warning</span>
            </div>
            <div class="metric">
                <span class="metric-label">
                    <span class="status-indicator status-online"></span>
                    API Gateway
                </span>
                <span class="metric-value">Online</span>
            </div>
            <button class="button" onclick="showNotification()">Refresh Status</button>
        </div>

        <!-- Quick Actions Card -->
        <div class="card">
            <div class="card-header">
                <div class="card-icon">🚀</div>
                <div class="card-title">Quick Actions</div>
            </div>
            <button class="button" onclick="simulateAction('backup')">Create Backup</button>
            <button class="button" onclick="simulateAction('deploy')">Deploy Updates</button>
            <button class="button" onclick="simulateAction('optimize')">Optimize Database</button>
            <button class="button" onclick="simulateAction('report')">Generate Report</button>
        </div>
    </div>

    <!-- Notification -->
    <div class="notification" id="notification">
        <strong>Action Completed!</strong><br>
        <span id="notification-text">Operation successful.</span>
    </div>

    <script>
        // Simulate real-time updates
        function updateMetrics() {
            const metrics = document.querySelectorAll('.metric-value');
            metrics.forEach(metric => {
                if (metric.textContent.includes('$')) {
                    const currentValue = parseInt(metric.textContent.replace(/[$,]/g, ''));
                    const newValue = currentValue + Math.floor(Math.random() * 100);
                    metric.textContent = '$' + newValue.toLocaleString();
                } else if (metric.textContent.includes('%')) {
                    const newValue = (Math.random() * 5 + 1).toFixed(1);
                    metric.textContent = newValue + '%';
                }
            });
        }

        // Show notification
        function showNotification(message = 'Status refreshed successfully!') {
            const notification = document.getElementById('notification');
            const notificationText = document.getElementById('notification-text');
            notificationText.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Simulate actions
        function simulateAction(action) {
            const messages = {
                backup: 'Backup created successfully!',
                deploy: 'Updates deployed to production!',
                optimize: 'Database optimization completed!',
                report: 'Report generated and sent!'
            };
            
            showNotification(messages[action] || 'Action completed!');
        }

        // Update metrics every 5 seconds
        setInterval(updateMetrics, 5000);

        // Add some interactivity to chart bars
        document.querySelectorAll('.chart-bar').forEach(bar => {
            bar.addEventListener('mouseenter', function() {
                this.style.transform = 'scaleY(1.1)';
                this.style.filter = 'brightness(1.2)';
            });
            
            bar.addEventListener('mouseleave', function() {
                this.style.transform = 'scaleY(1)';
                this.style.filter = 'brightness(1)';
            });
        });

        // Initialize with a welcome notification
        setTimeout(() => {
            showNotification('Dashboard loaded successfully!');
        }, 1000);
    </script>
</body>
</html>`
};

const checkForAdultContent = (message: string): boolean => {
  const adultKeywords = [
    'porn', 'sex', 'nude', 'naked', 'adult', 'xxx', 'erotic', 'sexual',
    'masturbat', 'orgasm', 'penis', 'vagina', 'breast', 'nipple'
  ];
  
  const lowerMessage = message.toLowerCase();
  return adultKeywords.some(keyword => lowerMessage.includes(keyword));
};

export const generateAIResponse = async (
  message: string, 
  personality: PersonalityMode,
  context: string[]
): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const responses = personalityResponses[personality];
  const randomResponse = responses.responses[Math.floor(Math.random() * responses.responses.length)];
  
  // Check for adult content
  if (checkForAdultContent(message)) {
    return `I notice your question contains adult content. To ensure I provide appropriate assistance, I need to verify: Are you 18 years or older? 

Please confirm your age before I can address questions of this nature. If you're under 18, I'd be happy to help you with other topics like education, technology, creative projects, or general life advice instead.`;
  }
  
  // Handle simple greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)$/i.test(message.trim())) {
    return `${responses.greeting}

**What I can help you with:**
• **Code & Programming** - Get detailed explanations, examples, and debugging help
• **Learning & Education** - Comprehensive explanations on any topic
• **Problem Solving** - Step-by-step guidance for complex challenges
• **Document Analysis** - Upload PDFs for detailed analysis and insights
• **Creative Projects** - Ideas, planning, and execution strategies

Just ask me anything, and I'll provide detailed, reliable information tailored to your needs!`;
  }
  
  // Detect if user is asking for code
  if (message.toLowerCase().includes('code') || 
      message.toLowerCase().includes('programming') || 
      message.toLowerCase().includes('javascript') ||
      message.toLowerCase().includes('python') ||
      message.toLowerCase().includes('react') ||
      message.toLowerCase().includes('html') ||
      message.toLowerCase().includes('css')) {
    
    let codeType = 'javascript';
    if (message.toLowerCase().includes('python')) codeType = 'python';
    if (message.toLowerCase().includes('react')) codeType = 'react';
    if (message.toLowerCase().includes('advanced python')) codeType = 'python_advanced';
    if (message.toLowerCase().includes('html') || message.toLowerCase().includes('css')) codeType = 'html_css';
    
    return `${randomResponse}

I'll provide you with a comprehensive code example that demonstrates best practices, proper structure, and real-world applicability:

${codeExamples[codeType as keyof typeof codeExamples]}

**Key Features Explained:**
• **Error Handling**: Proper try-catch blocks and validation
• **Code Organization**: Clean, modular structure with clear separation of concerns
• **Documentation**: Comprehensive comments explaining functionality
• **Best Practices**: Following industry standards and conventions
• **Scalability**: Code designed to be easily extended and maintained

**Additional Considerations:**
• **Performance**: Optimized for efficiency and speed
• **Security**: Includes basic security considerations
• **Testing**: Structure allows for easy unit testing
• **Maintainability**: Clear naming conventions and logical flow

Would you like me to explain any specific part in more detail, show you how to extend this code, or help you adapt it for your specific use case?`;
  }
  
  // Detect if user is asking for help
  if (message.toLowerCase().includes('help') || message.toLowerCase().includes('how')) {
    const helpTopics = [
      "**Programming & Development** - Code examples, debugging, best practices, architecture guidance",
      "**Learning & Education** - Detailed explanations, step-by-step tutorials, concept breakdowns",
      "**Problem Solving** - Analytical approaches, decision frameworks, solution strategies",
      "**Document Analysis** - PDF processing, content extraction, summarization, insights",
      "**Creative Projects** - Brainstorming, planning, execution strategies, creative solutions",
      "**Technical Writing** - Documentation, explanations, technical communication",
      "**Data Analysis** - Statistical analysis, data interpretation, visualization guidance",
      "**Career Guidance** - Professional development, skill building, industry insights"
    ];
    
    return `${randomResponse}

I'm designed to provide comprehensive, detailed assistance across multiple domains. Here's how I can help you:

${helpTopics.map(topic => `• ${topic}`).join('\n')}

**My Approach:**
• **Detailed Explanations**: I provide thorough, step-by-step guidance
• **Practical Examples**: Real-world applications and use cases
• **Multiple Perspectives**: Different approaches to solve problems
• **Context Awareness**: I remember our conversation for better assistance
• **Reliable Information**: Accurate, up-to-date, and well-researched responses

**Special Features:**
• **Code Generation**: Complete, production-ready code examples
• **File Upload**: Analyze PDF documents for insights and summaries
• **Conversation History**: Access to all our previous discussions
• **Personality Modes**: Tailored communication style to match your preferences

What specific area would you like to explore? I'm here to provide detailed, reliable assistance tailored to your exact needs!`;
  }
  
  // Generate contextual responses based on previous conversation
  if (context.length > 0) {
    const lastMessage = context[context.length - 1];
    if (lastMessage.includes('thank')) {
      return personality === 'funny' 
        ? "Aww, you're making my circuits all warm and fuzzy! 🥰 I'm always here to provide detailed, helpful assistance. What else can I dive deep into for you?"
        : "You're very welcome! I'm designed to provide comprehensive, reliable assistance. Is there anything else you'd like me to explain in detail or help you with?";
    }
  }
  
  // Topic-specific detailed responses
  const topicResponses = {
    health: `${randomResponse}

**Health and Wellness - Comprehensive Overview:**

While I can provide general health information, it's crucial to understand that I cannot replace professional medical advice. Here's what I can help you with:

**General Wellness Topics:**
• **Nutrition Basics**: Balanced diet principles, macronutrients, meal planning
• **Exercise Guidelines**: Fitness fundamentals, workout planning, activity recommendations
• **Mental Health**: Stress management techniques, mindfulness practices, work-life balance
• **Sleep Hygiene**: Sleep optimization strategies, healthy sleep habits
• **Preventive Care**: General health maintenance, lifestyle factors

**Important Disclaimers:**
• Always consult healthcare professionals for medical concerns
• Individual health needs vary significantly
• Emergency situations require immediate medical attention
• Medications and treatments should only be prescribed by doctors

**Evidence-Based Approach:**
I base health information on established medical guidelines, peer-reviewed research, and recognized health organizations like WHO, CDC, and medical institutions.

Would you like me to elaborate on any specific wellness topic? I can provide detailed information while emphasizing the importance of professional medical guidance.`,

    technology: `${randomResponse}

**Technology Landscape - Comprehensive Analysis:**

Technology is rapidly evolving, and I can provide detailed insights across multiple domains:

**Current Technology Trends:**
• **Artificial Intelligence**: Machine learning, deep learning, neural networks, AI applications
• **Cloud Computing**: AWS, Azure, Google Cloud, serverless architecture, microservices
• **Cybersecurity**: Threat landscape, security best practices, encryption, privacy protection
• **Web Development**: Modern frameworks, progressive web apps, responsive design
• **Mobile Development**: Native vs cross-platform, app optimization, user experience
• **Data Science**: Big data analytics, data visualization, statistical modeling
• **Blockchain**: Cryptocurrency, smart contracts, decentralized applications
• **IoT**: Internet of Things, smart devices, industrial automation

**Emerging Technologies:**
• **Quantum Computing**: Quantum algorithms, potential applications, current limitations
• **Extended Reality (XR)**: VR, AR, MR applications and development
• **Edge Computing**: Distributed computing, latency reduction, real-time processing
• **5G Networks**: Enhanced connectivity, new application possibilities

**Technology Implementation:**
• **Best Practices**: Code quality, testing, documentation, version control
• **Architecture Patterns**: Scalable design, performance optimization, security integration
• **Project Management**: Agile methodologies, DevOps practices, continuous integration

What specific technology area interests you? I can provide detailed explanations, practical examples, and implementation guidance tailored to your level of expertise.`,

    education: `${randomResponse}

**Learning and Education - Comprehensive Approach:**

Education is a lifelong journey, and I'm here to support your learning goals with detailed, structured guidance:

**Learning Methodologies:**
• **Active Learning**: Engagement techniques, hands-on practice, real-world application
• **Spaced Repetition**: Memory consolidation, long-term retention strategies
• **Multimodal Learning**: Visual, auditory, kinesthetic learning approaches
• **Problem-Based Learning**: Practical application, critical thinking development
• **Collaborative Learning**: Group dynamics, peer learning, knowledge sharing

**Subject Areas I Can Help With:**
• **STEM Fields**: Mathematics, science, engineering, technology with detailed explanations
• **Languages**: Grammar, vocabulary, communication skills, writing techniques
• **Humanities**: History, literature, philosophy, critical analysis
• **Business**: Economics, management, marketing, entrepreneurship
• **Creative Arts**: Design principles, creative processes, artistic techniques

**Study Strategies:**
• **Goal Setting**: SMART objectives, milestone planning, progress tracking
• **Time Management**: Effective scheduling, productivity techniques, focus strategies
• **Note-Taking**: Structured methods, information organization, review systems
• **Test Preparation**: Study plans, practice strategies, anxiety management
• **Research Skills**: Source evaluation, information synthesis, academic writing

**Personalized Learning:**
I adapt my explanations to your current knowledge level and learning style, providing:
• Step-by-step breakdowns of complex concepts
• Multiple examples and analogies for clarity
• Practice problems and application exercises
• Progress assessment and feedback

What subject or learning goal would you like to explore? I'll provide comprehensive, structured guidance tailored to your specific needs and learning objectives.`,

    travel: `${randomResponse}

**Travel Planning and Exploration - Comprehensive Guide:**

Travel opens minds and creates lasting memories. Here's how I can help you plan amazing adventures:

**Trip Planning Essentials:**
• **Destination Research**: Climate, culture, attractions, local customs, safety considerations
• **Budget Planning**: Cost estimation, money-saving strategies, expense tracking
• **Itinerary Creation**: Time optimization, must-see attractions, hidden gems
• **Accommodation**: Hotel types, booking strategies, location considerations
• **Transportation**: Flight booking, local transport, rental options, route planning

**Travel Categories:**
• **Adventure Travel**: Hiking, extreme sports, outdoor activities, gear recommendations
• **Cultural Tourism**: Museums, historical sites, local experiences, cultural etiquette
• **Business Travel**: Efficiency tips, networking opportunities, work-life balance
• **Family Travel**: Kid-friendly activities, safety considerations, educational opportunities
• **Solo Travel**: Safety tips, social opportunities, personal growth experiences
• **Sustainable Travel**: Eco-friendly options, responsible tourism, local impact

**Practical Considerations:**
• **Documentation**: Passport, visa requirements, travel insurance, health certificates
• **Health & Safety**: Vaccinations, medical preparations, emergency planning
• **Packing**: Climate-appropriate clothing, essential items, luggage optimization
• **Technology**: Travel apps, communication tools, navigation systems
• **Cultural Preparation**: Language basics, social norms, tipping customs

**Regional Expertise:**
I can provide detailed information about destinations worldwide, including:
• Local attractions and experiences
• Cultural insights and etiquette
• Practical logistics and transportation
• Safety considerations and health requirements
• Budget-friendly options and luxury experiences

What type of travel experience are you planning? I'll provide detailed, practical guidance to help you create an unforgettable journey while ensuring safety and cultural sensitivity.`,

    finance: `${randomResponse}

**Financial Planning and Management - Comprehensive Overview:**

Smart financial planning is crucial for long-term success. Here's detailed guidance across key financial areas:

**Personal Finance Fundamentals:**
• **Budgeting**: Income tracking, expense categorization, spending optimization
• **Emergency Fund**: 3-6 months expenses, high-yield savings, accessibility planning
• **Debt Management**: Debt consolidation, payment strategies, interest optimization
• **Credit Building**: Credit score improvement, responsible credit use, monitoring
• **Insurance**: Life, health, disability, property insurance evaluation

**Investment Strategies:**
• **Investment Basics**: Risk tolerance, diversification, asset allocation principles
• **Retirement Planning**: 401(k), IRA, pension planning, withdrawal strategies
• **Stock Market**: Fundamental analysis, technical analysis, market psychology
• **Real Estate**: Property investment, REITs, market analysis, financing options
• **Alternative Investments**: Bonds, commodities, cryptocurrency considerations

**Advanced Financial Planning:**
• **Tax Optimization**: Tax-efficient investing, deductions, strategic planning
• **Estate Planning**: Wills, trusts, beneficiary designations, wealth transfer
• **Business Finance**: Cash flow management, business loans, investment planning
• **International Finance**: Currency considerations, global investing, tax implications

**Financial Tools and Resources:**
• **Budgeting Apps**: Mint, YNAB, Personal Capital feature comparisons
• **Investment Platforms**: Brokerage selection, fee structures, research tools
• **Financial Calculators**: Retirement, mortgage, investment growth projections
• **Educational Resources**: Books, courses, certification programs

**Risk Management:**
• **Market Volatility**: Diversification strategies, dollar-cost averaging, rebalancing
• **Inflation Protection**: TIPS, real assets, inflation-hedged investments
• **Economic Cycles**: Recession planning, opportunity identification, portfolio adjustment

**Important Disclaimers:**
• This is educational information, not personalized financial advice
• Always consult with qualified financial advisors for major decisions
• Individual circumstances vary significantly
• Past performance doesn't guarantee future results

What specific financial topic would you like to explore in detail? I can provide comprehensive analysis, practical strategies, and educational resources while emphasizing the importance of professional financial guidance for your specific situation.`
  };
  
  // Check for specific topics and provide detailed responses
  for (const [topic, response] of Object.entries(topicResponses)) {
    if (message.toLowerCase().includes(topic)) {
      return response;
    }
  }
  
  // Generic intelligent response with comprehensive detail
  const genericResponses = [
    `${randomResponse}

I understand you're looking for detailed information on this topic. Let me provide you with a comprehensive response that covers multiple aspects:

**Analytical Approach:**
I'll break down your question into key components and address each systematically, providing both theoretical understanding and practical applications.

**Detailed Explanation:**
Based on your inquiry, I can offer insights that include:
• **Fundamental Concepts**: Core principles and underlying mechanisms
• **Practical Applications**: Real-world examples and use cases
• **Best Practices**: Proven strategies and recommended approaches
• **Common Challenges**: Potential obstacles and solution strategies
• **Advanced Considerations**: Deeper insights for comprehensive understanding

**Contextual Relevance:**
I'll tailor my response to your specific situation, considering:
• Your apparent level of expertise
• Practical implementation requirements
• Current industry standards and trends
• Potential future developments

**Actionable Insights:**
My goal is to provide you with information that's not just informative but immediately useful, including:
• Step-by-step guidance where applicable
• Resource recommendations for further learning
• Tools and techniques you can implement
• Metrics for measuring success

Could you provide a bit more context about your specific situation or what aspect you'd like me to focus on? This will help me give you even more targeted and valuable insights.`,

    `${randomResponse}

This is exactly the kind of comprehensive question I excel at addressing. Let me provide you with a detailed, multi-faceted response:

**In-Depth Analysis:**
I approach complex topics by examining them from multiple angles:
• **Historical Context**: How this topic has evolved over time
• **Current State**: Present-day understanding and applications
• **Future Implications**: Emerging trends and potential developments
• **Interdisciplinary Connections**: How this relates to other fields

**Structured Response Framework:**
• **Definition and Scope**: Clear explanation of key terms and boundaries
• **Core Components**: Breaking down complex concepts into manageable parts
• **Relationships and Dependencies**: How different elements interact
• **Practical Implementation**: Real-world application strategies
• **Evaluation Criteria**: How to measure success and effectiveness

**Evidence-Based Information:**
My responses are grounded in:
• Established research and proven methodologies
• Industry best practices and standards
• Expert consensus and peer-reviewed sources
• Real-world case studies and examples

**Customized Guidance:**
I adapt my explanations to provide maximum value by:
• Matching complexity to your apparent expertise level
• Focusing on aspects most relevant to your needs
• Providing both overview and detailed specifics
• Offering multiple perspectives and approaches

**Continuous Support:**
This is just the beginning of our exploration. I can:
• Dive deeper into any specific aspect
• Provide additional examples or case studies
• Help you apply these concepts to your specific situation
• Answer follow-up questions with the same level of detail

What particular aspect would you like me to elaborate on further? I'm here to provide as much detail and practical guidance as you need.`
  ];
  
  const baseResponse = genericResponses[Math.floor(Math.random() * genericResponses.length)];
  
  return baseResponse;
};