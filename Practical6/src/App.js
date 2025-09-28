import React, { useState} from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [listening, setListening] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTasks((prev) => [...prev, speechResult]);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  }

  const addTask = () => {
    if (!task.trim()) return;
    const updatedTasks = [...tasks];
    if (editIndex >= 0) {
      updatedTasks[editIndex] = task;
      setEditIndex(-1);
    } else {
      updatedTasks.push(task);
    }
    setTasks(updatedTasks);
    setTask('');
  };

  const editTask = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const completeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startListening = () => {
    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition.');
      return;
    }
    setListening(true);
    recognition.start();
  };

  return (
    <div className="container">
      <div className="todo-box">
        <h2>Get Things Done</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={addTask}>
            {editIndex >= 0 ? 'Update' : 'Add'}
          </button>
        </div>

        <button onClick={startListening} className={`mic-btn ${listening ? 'listening' : ''}`}>
          {listening ? 'Listening...' : 'Speak Task'}
        </button>

        <div className="task-list">
          {tasks.map((t, index) => (
            <div className="task-item" key={index}>
              <span>{t}</span>
              <div className="actions">
                <button onClick={() => completeTask(index)}>Complete</button>
                <button onClick={() => editTask(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
