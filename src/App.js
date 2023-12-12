import React, { useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [summary, setSummary] = useState('');
  const [topics, setTopics] = useState([]);
  const [classificationResult, setClassificationResult] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/summarize');
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIdentifiedTopics = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/identify_topics');
      setTopics(response.data.key_topics);
    } catch (error) {
      console.error('Error fetching identified topics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClassifyClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/classify');
      setClassificationResult(response.data[0]);
    } catch (error) {
      console.error('Error fetching classification:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {loading && <div className="loader">Loading...</div>}

      {summary && !loading && (
        <div>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
      
      {topics.length > 0 && !loading ? (
        <div>
          <h2>Identified Topics:</h2>
          <ul>
            {topics.map((topic, index) => (
              <li key={index}>{`${topic.word} (Score: ${topic.score})`}</li>
            ))}
          </ul>
        </div>
      ) : <div></div>}

      <button onClick={fetchSummary} disabled={loading}>Fetch Summary</button>
      <button onClick={fetchIdentifiedTopics} disabled={loading}>Fetch Identified Topics</button>

      <div>
        <button onClick={handleClassifyClick} disabled={loading}>Classify Document Text</button>
        {classificationResult && (
          <div>
            <h3>Classification Result:</h3>
            <p>{`Label: ${classificationResult.label}`}</p>
            <p>{`Score: ${classificationResult.score}`}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
