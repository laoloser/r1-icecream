import React, { Component } from 'react';
import './App.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";
import round1Locations from './components/locations';

class App extends Component {



  /* mandatory */
  mapHandler = (event) => {
    let state = event.target.dataset.name;

    // Get locations in the selected state
    let locations = round1Locations[state] || [];

    // If no locations, show message
    if (locations.length === 0) {
      document.getElementById("popup-result").innerHTML = 
        `No Round1 locations in this state.`;
    } else {
      // Calculate price per city based on tax rate
      let iceCreamPrice = 0.99;
      let locationText = locations.map(loc => {
        let finalPrice = (iceCreamPrice * (1 + loc.taxRate)).toFixed(2);
        return `<li>${loc.name} - <span style="color:#D81921;">${loc.city}</span> ($${finalPrice} after tax)</li>`;
      }).join("");

      document.getElementById("popup-result").innerHTML = 
        `There are ${locations.length} Round1 location(s) in this state.<br>
         <b>99¢ Ice Cream Prices:</b>
         <ul>${locationText}</ul>`;
    }
    document.getElementById("info-panel").style.display = "flex";

  };

  closePopup = () => {
    document.getElementById("info-panel").style.display = "none";
    document.getElementById("help-panel").style.display = "none";
  };

  helpPanel = () => {
    document.getElementById("help-panel").style.display = "flex"

  }

  /* optional customization of filling per state and calling custom callbacks per state */
  statesCustomConfig = () => {
    let config = {};
  
    // Loop through each state in round1Locations
    Object.keys(round1Locations).forEach(state => {
      let locations = round1Locations[state] || [];
      
      // Assign fill color based on the number of locations
      let fillColor = locations.length > 0 ? (locations.length > 1 ? "#D81921" : "#ff8f8f") : "#a5a5a5";
  
      config[state] = { fill: fillColor };
    });
  
    return config;
  };
  

  render() {
    return (
      <div className="App">
      <div id="logo-container">
        <img id="logo" src="/assets/logo.png"></img>
      </div>
      <div id="header"><p>99¢ Ice Cream Tracker</p>
      <p id="help" onClick={this.helpPanel}>?</p>
      <img id="guide" src="/assets/guide.jpg"></img>
      </div>
        <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler} />
        <div className="info-panel" id="info-panel">
          <div className="empty" id="top" onClick={this.closePopup}></div>
          <div className="empty" id="left" onClick={this.closePopup}></div>
          <div className="info-content">
            <span className="close-btn" onClick={this.closePopup}>&times;</span>
            <p id="popup-result">This is text</p>
          </div>
          <div className="empty" id="right" onClick={this.closePopup}></div>
          <div className="empty" id="bottom" onClick={this.closePopup}></div>
        </div>
        <div className="help-panel" id="help-panel">
          <div className="empty" id="top" onClick={this.closePopup}></div>
          <div className="empty" id="left" onClick={this.closePopup}></div>
          <div className="help-content">
            <span className="close-btn" onClick={this.closePopup}>&times;</span>
            <h3>How to use:</h3>
            <p id="help-result">Round1 sells ice cream for 99¢,<br></br> but it's never really 99¢ is it ?
            <br></br><br></br> Select any state and view each Round1 location<br></br> to see the exact price of ice cream after tax.</p>
          </div>
          <div className="empty" id="right" onClick={this.closePopup}></div>
          <div className="empty" id="bottom" onClick={this.closePopup}></div>
        </div>
      </div>
    );
  }
}

export default App;