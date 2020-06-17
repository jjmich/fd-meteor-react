import React, { Component } from 'react';
import { Entries } from '../api/entries.js';

export default class Entry extends Component {

  upvoteEntry(){
    Entries.update(this.props.entry._id, {
      $set: { votes: this.props.entry.votes + 1 },
    });
  }

  downvoteEntry(){
    Entries.update(this.props.entry._id, {
      $set: { votes: this.props.entry.votes == 0 ? 0 : this.props.entry.votes - 1 },
    });
  }

  deleteEntry(){
    Entries.remove(this.props.entry._id);
  }

  render() {

    return (
      <li className="list">
        <button className="delete" onClick={this.deleteEntry.bind(this)}>
          &times;
        </button>
        <button className="upvote" onClick={this.upvoteEntry.bind(this)}>
          +
        </button>
        <button className="downvote" onClick={this.downvoteEntry.bind(this)}>
          -
        </button>
        <span className="votes" style={{width: '20%'}}>Points: <b>{this.props.entry.votes}</b></span>
        <span className="text">{this.props.entry.text} </span>
      </li>
    );
  }
}

