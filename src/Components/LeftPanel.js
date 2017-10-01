import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import styles from './LeftPanel.css';

export default function LeftPanel() {
	return (
		<Drawer open={true} docked={true} containerStyle={{top: 100, width: 150}}>
          <p/><u><b>Wait Time</b></u><p/>
          30 mins.
          <br/>
          <Divider inset={false} />
          <br/><br/>
          <p/><u><b>People Waiting</b></u><p/>
          <MenuItem>Party 1 (3)</MenuItem>
          <MenuItem>Party 2 (2)</MenuItem>
          <MenuItem>Party 3 (4)</MenuItem>
          <MenuItem>Party 4 (1)</MenuItem>
          <MenuItem>Party 5 (2)</MenuItem>
        </Drawer>
	);
}

