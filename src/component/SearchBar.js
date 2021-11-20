import { useState } from 'react'

function SearchBar(props) {

    const[ textValue, setTextValue ] = useState('');

    function onTextChange(event) {
        setTextValue(event.target.value);
    }

    return(
        <div className="searchBar">
            <input type="text" id="search" placeholder="Search using name" name="search" value={textValue} onChange={onTextChange} />
            <button className="button shortlist" onClick={() => props.onSearchClick(textValue)}>Search</button>
            <button className="button home" onClick={props.onClearClick}>Clear</button>
        </div>
    );

}

export default SearchBar