import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import FilteredCandidates from './FilteredCandidates';
import SearchBar from "./SearchBar";

function Main(props) {

    const [ filteredCandidates, setFilteredCandidates ] = useState([]);
    const [ textValue, setTextValue ] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        if(!textValue){
            setFilteredCandidates(props.filteredCandidates)
        }
    }, [props.filteredCandidates, textValue])

    function handleClick(path) {
        navigate(path);
    }
    
    function onSearchClick(textValue) {
        
        setTextValue(textValue)

        const c = []
        for(let i = 0; i < filteredCandidates.length; i++) {
            console.log(`${filteredCandidates[i].name} ${textValue}`);
            if(filteredCandidates[i].name.includes(textValue)){
                console.log(`Including ${filteredCandidates[i].name} ${textValue}`);
                c.push(filteredCandidates[i]);
            }
        }
        
        console.log(c);
        setFilteredCandidates(c);
    }

    function onClearClick() {
        setTextValue(null)
        setFilteredCandidates(props.filteredCandidates)
    }

    return (
        <div>
            <div className="navbar">
                <button className="button home" onClick={() => handleClick('/')}>Home</button>
                <button className="button shortlist" onClick={() => handleClick('/shortlisted')}>Shortlisted</button>
                <button className="button reject" onClick={() => handleClick('/rejected')}>Rejected</button>
            </div>
            <SearchBar onSearchClick={onSearchClick} onClearClick={onClearClick}/>
            <div className="mainCardContainer">
                <FilteredCandidates filteredCandidates={filteredCandidates} />
            </div>
        </div>
    );

}

export default Main;