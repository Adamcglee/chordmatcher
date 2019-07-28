import React, { Component } from "react";
import axios from "axios";
import "./search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchtext: "",
      searchresults: [],
      searching: false
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
    this.setState({ searching: true });
    axios
      .get(
        `http://api.guitarparty.com/v2/songs/?query=${this.state.searchtext}`,
        api_key
      )
      .then(res => {
        this.setState({ searchresults: res.data.objects, searching: false });
        console.log(this.state.searchresults);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.searchSubmit}>
          <h5>Song Search:</h5>
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
          {this.state.searching === true ? (
            <div className="d-flex justify-content-center align-items-center">
              <strong>Loading...</strong>
              <div
                className="spinner-border ml-auto"
                role="status"
                aria-hidden="true"
              />
            </div>
          ) : (
            this.state.searchresults.map(song => (
              <div className="song-result">
                <h5 className="song-info">
                  "{song.title}" By:
                  {song.authors.length === 1
                    ? song.authors[0].name
                    : song.authors.map((author, i) => (
                        <div key={author.uri}>
                          {i === 0 ? ` ${author.name}, ` : ` ${author.name}`}
                        </div>
                      ))}
                </h5>
                <ul className="chord-list">
                  {song.chords.map(chord => (
                    <li className="chord">{chord.name}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default Search;
