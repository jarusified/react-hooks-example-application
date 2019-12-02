// eslint-disable
import React, { Fragment, useState} from "react";

// Form suggestion imports
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import  Button  from 'react-bootstrap/Button'

import { search } from '../sockets/emit'

const Search = ({ placeholder,  characterList }) => {
    const [ currentCharacterList, setCurrentCharacterList ] = useState([])

    const handleCharacterAdd = (e) => {
        setCurrentCharacterList(e)
    }

    return (
        <Fragment>
            <Typeahead
                id="search-typehead"
                clearButton
                labelKey="name"
                multiple={true}
                options={characterList}
                onChange={handleCharacterAdd}
                placeholder={placeholder}
            />

            <Button variant="outline-success" onClick={() => search({ 'characters': currentCharacterList })}>Search</Button>
        </Fragment>
    );
};

export default Search;