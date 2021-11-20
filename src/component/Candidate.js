import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom'
import { CandidateContext } from '../context/Context';
import CandidateCard from "./CandidateCard";
import { useNavigate } from "react-router-dom";


function Candidate() {
    
    const { allCandidates, performEvent } = useContext(CandidateContext);
    const { id } = useParams();
    const candidate = allCandidates.find((item) => (item.id === id));
    const [ message, setMessage ] = useState();
    const navigate = useNavigate();


    function handleClick(eventType) {
        performEvent(eventType, id);
        
        switch(eventType) {
            case 'ADD_TO_SHORTLISTED':
                setMessage("Added to Shortlisted");
                return;
            case 'ADD_TO_REJECTED':
                setMessage("Added to Rejected");
                return;
            default:
                return;
        }
    }

    function handleClick2(path) {
        navigate(path);
    }

    if(candidate) {
        return (
            <div>
                <div className="navbar">
                    <button className="button home" onClick={() => handleClick2('/')}>Home</button>
                    <button className="button shortlist" onClick={() => handleClick2('/shortlisted')}>Shortlisted</button>
                    <button className="button reject" onClick={() => handleClick2('/rejected')}>Rejected</button>
                </div>
                <div className="singleCardContainer">
                    <CandidateCard id={candidate.id} name={candidate.name} Image={candidate.Image} />
                    <div>
                        <button className="button shortlist" onClick={() => handleClick('ADD_TO_SHORTLISTED')}>Shortlist</button>
                        <button className="button reject" onClick={() => handleClick('ADD_TO_REJECTED')}>Reject</button>
                    </div>
                    <p>{candidate.status} {message}</p>
                </div>
            </div>
        );
    }
    else {
        return ( <p>Cannot find candidate with id {id}</p>)
    }

}

export default Candidate;