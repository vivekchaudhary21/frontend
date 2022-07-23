import React from 'react';
import data from './data';
import SingleQuestion from './Question';

function App() {
  return (
    <div className='container'>
      <h3>Questiona and Answers about login</h3>
      <section className='info'>
        {data.map((question) => (
          <SingleQuestion key={question.title} question={question} />
        ))}
      </section>
    </div>
  );
}

export default App;
