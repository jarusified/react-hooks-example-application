// eslint-disable
import React, { useState, useCallback, Component } from "react";

// Form suggestion imports
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button"

import useSearch from '../hooks/search';
import useSocket from '../hooks/socket';

const getUrl = "http://127.0.0.1:5000"

const Search = ( { placeholder }) => {
    // const [origin, setOrigin] = useState({});
    // const [destination, setDestination] = useState({});

    // const handleSubmit = useCallback(e => {
    //     e.preventDefault();
    //     alert(`You Selected: ${(origin || {}).name}, ${(destination || {}).name}`);
    // },
    //     [origin, destination]
    // );

    const [searchString, setSearchString] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const { locations, isLoading } = useSearch(searchString);

    const { data, isConnected } = useSocket(getUrl, 'init')

    const handleInputChange = useCallback(e => {
        // if(!(value.name && (e.target.value.length < value.name.length))){ // For Clearing Selected Input
        setSearchString(e.target.value);
        // }
        // onChange({});
    }, ['Batman'])


    return (
        <Component>
            <Typeahead
                id="search-typehead"
                clearButton
                labelKey="name"
                multiple={false}
                options={data}
                placeholder= { placeholder }
            />

            <Form inline>
                <Form.Text className="text" style={{ fontSize: '16px', color: "black" }}>
                    Enable comparison
    					</Form.Text>
                <FormControl
                    checked={data}
                    onChange={(e) => this.setState({ multiple: e.target.checked })}
                    type="checkbox"
                    placeholder={'e.g. : ' + data[10]}
                    className="mr-lg-2">
                </FormControl>

                <Button
                    // onClick={handleInputChange}
                    variant="outline-success">Search</Button>
            </Form>
        </Component>
    );
};

export default Search;