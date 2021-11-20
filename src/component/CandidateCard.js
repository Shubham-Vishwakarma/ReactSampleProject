import { useNavigate } from 'react-router-dom';


function CandidateCard(props) {

    const navigate = useNavigate();

    function onCandidateClick(event) {
        event.preventDefault();
        const path = `/${props.id}`
        navigate(path);
    }

    return (
        <div className="candidateCard" onClick={onCandidateClick}>
            <img className="candidateImage" src={props.Image} alt="candidate_image"></img>
            <p>{props.name}</p>
        </div>
    );

}

export default CandidateCard;