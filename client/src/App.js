import React, { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleGetAnswer = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      
      setAnswer(data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Chat avec OpenAI</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Posez une question..."
        value={question}
        onChange={handleQuestionChange}
      />
      <button onClick={handleGetAnswer} disabled={isLoading}>
        Obtenir une réponse
      </button>
      {isLoading && <p>Chargement en cours...</p>}
      {answer && (
        <div>
          <h2>Réponse :</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
