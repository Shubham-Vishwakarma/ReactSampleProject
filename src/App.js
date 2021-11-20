// App.js
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Main from './component/Main'
import Candidate from './component/Candidate';
import { CandidateContext } from './context/Context';
import './App.css';


function App() {
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [ allCandidates, setAllCandidates ] = useState([]);
  const [ shortlistedCandidates, setShortlistedCandidates ] = useState([]);
  const [ rejectedCandidates, setRejectedCandidates ] = useState([]);

  const performEvent = (actionType, id) => {

    const candidate = allCandidates.find(item => item.id === id);
    candidate.status = actionType;

    switch(actionType) {
      case 'ADD_TO_SHORTLISTED':
          setShortlistedCandidates([...shortlistedCandidates, candidate]);
          return;
      case 'ADD_TO_REJECTED':
          setRejectedCandidates([...rejectedCandidates, candidate]);
          return;
      default:
          return;
    }

  }
  
  useEffect(() => {
      fetch("https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json")
          .then(response => response.json())
          .then(
              (result) => {
                  const cn = []
                  for(let i = 0; i < result.length; i++) {
                    const t = result[i];
                    t.status = ''
                    cn.push(t);
                  }
                  setIsLoaded(true);
                  setAllCandidates(cn);
              },
              (error) => {
                  setIsLoaded(true);
                  setError(error);
              }
          )
  }, [allCandidates, isLoaded]);

  if(error) {
      return (<div>Error: { error.message }</div>);
  }
  else if (!isLoaded) {
      return (<div>Loading...</div>);
  }
  else {
    return (
      <main className="mainApp">
        <CandidateContext.Provider value={ { allCandidates, performEvent } }>
          <Routes>
            <Route path='/' element={<Main filteredCandidates={allCandidates} />} />
            <Route path='/shortlisted' element={<Main filteredCandidates={shortlistedCandidates}/>} />
            <Route path='rejected' element={<Main filteredCandidates={rejectedCandidates}/>} />
            <Route path='/:id' element={<Candidate />} />
          </Routes>
        </CandidateContext.Provider>
      </main>
    );
  }
}

export default App;