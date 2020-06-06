import React, { useState } from 'react';
import Error from './Error';

const Form = ({saveSearch}) => {

    //hook - state "term"
    const [ term, saveTerm ] = useState('');
    const [ error, saveError ] = useState(false);

    const SearchImages = e => {
        e.preventDefault();
        
        //validate
        if(term.trim() === '') {
            saveError(true);
            return;
        }
        saveError(false);

        //submit the term of search towards main component
        saveSearch(term);
    }

    return ( 
        <form
            onSubmit={SearchImages}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search a image"
                        onChange={ e => saveTerm(e.target.value) }
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        placeholder="Search"
                        
                    />
                </div>
            </div>

            { error ? <Error message="Add a term of search" /> : null }
        </form>
     );
}
 
export default Form;