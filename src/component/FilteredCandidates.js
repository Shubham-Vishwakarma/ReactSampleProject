import CandidateCard from "./CandidateCard";

function FilteredCandidates(props) {

    const filteredCandidates = props.filteredCandidates;

    return (
        <div className="cardContainer">
            <ul>
                {filteredCandidates.map(item => (
                    <li key={item.id}>
                        <CandidateCard id={item.id} name={item.name} Image={item.Image} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FilteredCandidates;