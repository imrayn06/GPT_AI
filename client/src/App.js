import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [translation, setTranslation] = useState('');
  const [result, setResult] = useState('');

  const handleGenerateText = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/generate-text', { prompt });
      setResult(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSummarizeText = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/summarize-text', { text });
      setSummary(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTranslateText = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/translate-text', { text, targetLanguage: 'French' });
      setTranslation(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>AI-Enhanced Content Generation Application</h1>
      
      <div className="feature">
        <h2>Text Generation</h2>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt"
        />
        <button onClick={handleGenerateText}>Generate Text</button>
        <p>{result}</p>
      </div>

      <div className="feature">
        <h2>Text Summarization</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to summarize"
        />
        <button onClick={handleSummarizeText}>Summarize Text</button>
        <p>{summary}</p>
      </div>

      <div className="feature">
        <h2>Language Translation</h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate"
        />
        <button onClick={handleTranslateText}>Translate Text</button>
        <p>{translation}</p>
      </div>
    </div>
  );
}

export default App;
