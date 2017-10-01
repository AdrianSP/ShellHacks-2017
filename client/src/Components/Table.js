import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import styles from './Table.css';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const AddButton = ({onClick, disabled}) => (
  <FloatingActionButton mini={true} onClick={onClick} disabled={disabled}> 
    <ContentAdd />
  </FloatingActionButton>
);

const RemoveButton = ({onClick, disabled}) => (
  <FloatingActionButton mini={true} onClick={onClick} disabled={disabled} secondary={true}> 
    <ContentRemove />
  </FloatingActionButton>
);


export default class Table extends React.Component{  


  state = {
    isAddDialogOpen: false,
    isRemoveDialogOpen: false,
    update: 0,
    occupancy: this.props.occupancy,
    seats: [],
    removeSeats: []
  };

  componentWillMount(){
    const {occupancy, capacity} = this.props.data;
    const removeSlots = occupancy;
    const removeSeats = [];
    for(var i = 1; i <= removeSlots; i++){
      removeSeats.push(i);
    }
    const slots = capacity - occupancy;
    const seats = [];
    for(var i = 1; i <= slots; i++){
      seats.push(i);
    }
    this.setState({seats});
    this.setState({removeSeats});
  }

  handleChange = (event, index, value) => {
    this.setState({update: value});
  }

  handleAddOpen = () => {
    this.setState({isAddDialogOpen: true});
  };

  handleRemoveOpen = () => {
    this.setState({isRemoveDialogOpen: true});
  };

  handleAddCancel = () => {
    this.setState({isAddDialogOpen: false});
  };

  handleAddOK = () => {
    this.setState({occupancy: (this.props.occupancy + this.state.update), update: 0,  isAddDialogOpen: false});
  };

  handleRemoveCancel = () => {
    this.setState({isRemoveDialogOpen: false});
  };

  handleRemoveOK = () => {
    this.setState({occupancy: (this.props.occupancy - this.state.update), update: 0, isRemoveDialogOpen: false});
  };

  render() {

    const {id, capacity} = this.props.data;
    const {isRemoveDialogOpen, isAddDialogOpen, removeSeats, seats, update} = this.state;

    const addActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleAddCancel}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleAddOK}
      />,
    ];
    const removeActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleRemoveCancel}
      />,
      <FlatButton
        label="OK"
        primary={true}
        onClick={this.handleRemoveOK}
      />,
    ];

    const options = seats.map((seat,i) => <MenuItem key={i} value={i+1} primaryText={`${i +1}`} />);
    const removeOptions = removeSeats.map((seat,i) => <MenuItem key={i} value={i+1} primaryText={`${i +1}`} />);
    const empty = this.state.occupancy == 0;
    const full = capacity == this.state.occupancy;

    return (
      <div id="wrapper">
        <Paper id="Table" zDepth={1} circle={true} children= {
          <div id="Table">
            <p>
            <u><b> {`Table ${id}`} </b></u><br/>
            {`${capacity - this.state.occupancy} of ${capacity} seat(s) available`}<br /></p>
            <Dialog
                title="Add People"
                actions={addActions}
                modal={false}
                open={isAddDialogOpen}
              >
              How many people would you like to add to this table?
              <br/>
              <DropDownMenu maxHeight={300} value={update} onChange={this.handleChange}>
                {options}
              </DropDownMenu>
            </Dialog>


            <Dialog
                title="Remove People"
                actions={removeActions}
                modal={false}
                open={isRemoveDialogOpen}
              >
              How many people would you like to remove from this table?
              <br/>
              <DropDownMenu maxHeight={300} value={update} onChange={this.handleChange}>
                {removeOptions}
              </DropDownMenu>
            </Dialog>

            <AddButton onClick={this.handleAddOpen} disabled={full}/>
            <RemoveButton onClick={this.handleRemoveOpen} disabled={empty}/>
          </div>
        }
        />
      </div>
      );
    }
  }