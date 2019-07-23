import React, { Component } from "react";
import axios from "axios";
import "./search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchtext: "",
      searchresults: []
    };
  }

  inputHandler = async event => {
    await this.setState({ [event.target.name]: event.target.value });
    console.log("Search Text: ", this.state.searchtext);
  };

  searchSubmit = event => {
    event.preventDefault();
    const api_key = {
      headers: {
        "Guitarparty-Api-Key": process.env.REACT_APP_GUITARPARTY_API_KEY
      }
    };
    axios
      .get(
        `http://api.guitarparty.com/v2/songs/?query=${this.state.searchtext}`,
        api_key
      )
      .then(res => {
        this.setState({ searchresults: res.data.objects });
        console.log(this.state.searchresults);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.searchSubmit}>
          <h5>Search:</h5>
          <input
            type="text"
            name="searchtext"
            value={this.state.searchtext}
            onChange={this.inputHandler}
            placeholder="Search by Song"
          />
        </form>
        <div>
          Search Results
          {this.state.searchresults.map(song => (
            <div className="song-result">
              <p>"{song.title}" By: {song.authors[0].name}</p>
              <ul className="chord-list">
                {song.chords.map(chord => (
                  <li className="chord">{chord.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Search;
