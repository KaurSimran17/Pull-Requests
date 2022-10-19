import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import UsePullRequest from './components/usePullRequest';

const App = () => {
  const myStyle = {
    color: "white",
    // backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Sans-Serif"
  };

  const divStyle = {
    display:"flexbox" , 
    alignItems:"center" , 
    justifyContent:"center" , 
    marginLeft:"auto" , 
    marginRight:"auto",
    marginTop:"20px"
  };
  
  return (
<>
<div className="w-50 p-3 square bg-primary rounded" style={divStyle}>
  <h1 style={myStyle} className="text-center">Neovim Repoistory Pull Requests</h1></div>
<UsePullRequest/>
</>
    )
  }
export default App;