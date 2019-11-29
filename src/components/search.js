// eslint-disable
import React, { useState, useCallback, Fragment } from "react";

// Form suggestion imports
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import SearchButton from './searchButton'

import useSocket from '../hooks/socket';

const getUrl = "http://127.0.0.1:4000"

const Search = ({ value, onChange, placeholder }) => {
    const [searchString, setSearchString] = useState("");
    const [compare, setCompare] = useState(false)
    const { data, isConnected }  = useSocket(getUrl, 'init', {})

    const handleCharacterAdd = (e) => {
        setSearchString(e)
    }

    const handleEnableCompare = (e) => {
        if (compare){
            setCompare(false)
        }
        else{
            setCompare(true)
        }
    }

    const handleInputSelect = useCallback(e => {
        if ((e.target.value.length > 0)) { // For Clearing Selected Input
            setSearchString(e.target.value)
            console.log('aaaa')
        }
        console.log(searchString)
    }, [searchString, setSearchString])

    return (
        <Fragment>
            <Typeahead
                id="search-typehead"
                clearButton
                labelKey="name"
                multiple={true}
                options={data}
                onChange = {handleCharacterAdd}
                placeholder={placeholder}
            />

            <Form inline>
                <Form.Text className="text" style={{ fontSize: '16px', color: "black" }}>
                    Compare
    			</Form.Text>
                <FormControl
                    checked={data}
                    onChange={ handleEnableCompare }
                    type="checkbox"
                    placeholder={placeholder}
                    className="mr-lg-2">
                </FormControl>

                <SearchButton
                    characters={searchString}
                    variant="outline-success">Search</SearchButton>
            </Form>
        </Fragment>
    );
};

export default Search;