import React, { useState, useEffect } from 'react';
import Form from './components/Form';



function App() {

  //state of the app
  const [ search, saveSearch ] = useState('');

  useEffect(() => {
    
    const consultAPI = async () => {
      if(search === '') return;

      const imagesForPage = 30;
      const key = '16907978-904268798dc665aeb47b88d29';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesForPage}`;
      
      const answer = await fetch(url);
      const result = await answer.json();

      console.log(result);
    }
    consultAPI();
  }, [search]);

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Searcher of images</p>

        <Form 
          saveSearch={saveSearch}
        />
      </div>
    </div>
  );
}

export default App;
