import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import ListingImages from './components/ListingImages';



function App() {

  //state of the app
  const [ search, saveSearch ] = useState('');
  //state to images
  const [ images, saveImages ] = useState([]);
  //state to current page
  const [ currentpage, saveCurrentPage ] = useState(1);
  //state to total of pages
  const [ totalpages, saveTotalPages ] = useState(5);


  useEffect(() => {
    
    const consultAPI = async () => {
      if(search === '') return;

      const imagesForPage = 30;
      const key = '16907978-904268798dc665aeb47b88d29';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesForPage}`;
      
      const answer = await fetch(url);
      const result = await answer.json();

      saveImages(result.hits);

      //calculate the total pages
      const calculateTotalPages = Math.ceil(result.totalHits / imagesForPage);
      saveTotalPages(calculateTotalPages);
    }
    consultAPI();
  }, [search]);

  //define the previous page
  const previousPage = () => {
      const newCurrentPage = currentpage - 1;
      //se detiene cuando es 0
      if(newCurrentPage === 0) return;

      saveCurrentPage(newCurrentPage);
  }

  //define the next page
  const nextPage = () => {
      const newCurrentPage = currentpage + 1;
      
      if(newCurrentPage > totalpages) return;

      saveCurrentPage(newCurrentPage);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Searcher of images</p>

        <Form 
          saveSearch={saveSearch}
        />

        <div className="row justify-content-center">
          <ListingImages 
              images={images}
          />
        </div>

        <button
          type="button"
          className="bbtn btn-info mr-1"
          onClick={previousPage}
        >&laquo;Previous</button>
  
        <button
          type="button"
          className="bbtn btn-info"
          onClick={nextPage}
        >Next&raquo;</button>

      </div>      
    </div>
  );
}

export default App;
