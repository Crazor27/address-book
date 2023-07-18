import './App.css';
import { useEffect, useState, useCallback } from 'react';

function App() {
	const [pageState, setPageState] = useState(1);
	const [personData, setPersonData] = useState(null);
  
  return (
    <div className="App">
      <body className="App-body">
	  {pageState ? (
    	  <AddressBook 
    		pageState={pageState} 
    		setPageState={setPageState} 
    		personData={personData} 
    		setPersonData={setPersonData}/> 
    		):(
    	  <DetailPage 
    		personData={personData}/> 
      )}
      </body>
    </div>
  );
}

function AddressBook({pageState, setPageState, personData, setPersonData}) {
	const [tableBody, setTableBody] = useState("");
    const handleClick = useCallback(info => {
        setPersonData(info);
    	setPageState(0);
    }, [setPersonData, setPageState]);
   
	useEffect(() => {
      if (tableBody == "") {
          let personsData = [];
          let req = new XMLHttpRequest();
          req.open("GET", 'https://randomuser.me/api/?results=100&inc=name,phone', true);
          req.send();
          req.onreadystatechange = function () {
              if (req.readyState == 4 && req.status == 200) {
                  const obj = JSON.parse(req.responseText);
  
                  for (let i = 0; i < obj.results.length; i++) {
                      let result = obj.results[i];
                      personsData.push([result.name.first, result.name.last, result.phone]);
                  }
                
                  const newTableBody = personsData.map( (person) => ( 
                      <tr onClick={() => handleClick([person[0], person[1], person[2]])}> 
                          {person[0] + " " + person[1]}
                      </tr>
                  ));
                  setTableBody(newTableBody);
              }
          }
      }
	}, [tableBody, setTableBody, handleClick]);
  return (
		<div>
		<table className="address-book">
            <thead>
               <th>Address Book</th>
            </thead>
            <tbody>  
				<td>{tableBody}</td>
            </tbody>
        </table>
		</div>
	);
}

function DetailPage({personData}) {
	let heading = ["First Name", "Last Name", "Telephone"];
    let tableBody = "";
	const tableHeading = heading.map( value => 
		<th> {value} </th>
	);
	if (personData) {
		tableBody = personData.map( value => (
          <td> {value} </td>
        )); 
	}
	return (
		<div>
		<table className="detail-page">
			<thead>
				{tableHeading}
			</thead>
			<tbody>  
				{tableBody}
			</tbody>
		</table>
		</div>
	);
}

export default App;
