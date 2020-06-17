import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { ReactiveVar } from 'meteor/reactive-var';

import { Entries } from '../api/entries.js'
import Entry from './Entry.js';

const DEFAULT_VOTE_SORT_ORDER = -1;

this.sortOrder = new ReactiveVar(DEFAULT_VOTE_SORT_ORDER);

class App extends Component {
    
    handleSubmit(event){
        event.preventDefault();
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
        
        if(text != ''){
          Entries.insert({
            text,
            votes: 0,
            createdAt: new Date(),
          });
        } else alert("Entry should not be empty!");
        
        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    changeSortingOrder(){
        sortOrder.set(sortOrder.get() * -1);
    }
    
    renderEntries() {
        return this.props.entries.map((entry) => (
          <Entry key={entry._id} entry={entry} />
        ));
    }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Leaderboard</h1>
          <h2>
            <button className="sort" onClick={this.changeSortingOrder.bind(this)}> &#8645; </button>
          </h2>
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
              <input 
                type="text"
                ref="textInput"
                placeholder="Type to add an entry"
              />
          </form>        
        </header>
        <ul>
          {this.renderEntries()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return{
      entries: Entries.find({}, { sort: { votes: sortOrder.get(), name: 1} }).fetch(),
    };
})(App);

