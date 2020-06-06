import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import ListingImages from './components/ListingImages';



function App() {

  //state of the app
  const [ search, saveSearch ] = useState('');

  const [ images, saveImages ] = useState([]);

  useEffect(() => {
    
    const consultAPI = async () => {
      if(search === '') return;

      const imagesForPage = 30;
      const key = '16907978-904268798dc665aeb47b88d29';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesForPage}`;
      
      const answer = await fetch(url);
      const result = await answer.json();

      saveImages(result.hits);
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

      <div className="row justify-content-center">
        <ListingImages 
            images={images}
        />
      </div>
    </div>
  );
}

export default App;
