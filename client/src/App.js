import React, { Component } from 'react';
import logo from './haveaseatlogo.PNG';
import './App.css';
import LeftPanel from './Components/LeftPanel';
import Table from './Components/Table';


class App extends Component {

  constructor(){
    super();

    this.state = {
      tables: [ 
        {id: 1, capacity:2, occupancy:1},
        {id: 2, capacity:2, occupancy:2},
        {id: 3, capacity:8, occupancy:0},
        {id: 4, capacity:4, occupancy:3},
        {id: 5, capacity:4, occupancy:4},
        {id: 6, capacity:8, occupancy:0}
      ]
    }
  }

  render() {
    const {tables} = this.state;
    return (
      <div>
        <div id="imgWrap">
          <img id="imgDiv" src={logo} alt="Logo" />
        </div>
        <div className="App">
          <LeftPanel/>
          <div id="tableDiv" styles={{padding: 20}}>
            {tables.map(({id, capacity, occupancy}) => <Table data={{id, capacity, occupancy}} id={id} capacity={capacity} occupancy={occupancy}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
