import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  //notes property = array of objects as data
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  //method to add new, blank note
  addNote = () => {
    //create a new note
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    //add the new note to existing array of notes
    this.setState({ notes: [newNote, ...this.state.notes] });
  };

  //method to edit notes
  onType = (editMeId, updatedKey, updatedValue) => {
    // editMeId == id of the note that is edited
    // updatedKey == title or description field
    // updatedValue == value of title or description

    //maps over array of notes and only updates note that has been edited
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          note.title = updatedValue;
          return note;
        } else {
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes });
  };

  //method to search notes
  onSearch = (text) => {
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      // first if statement checks if user typed in search bar and then deleted text - then notes will reappear
      if (!newSearchText) {
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        // use includes() to check if string in newSearchText matches title or description
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        // new symbol, || OR operator - to replace if, else statement. Here it is checking if titleMatch OR descriptionMatch is true
        const hasMatch = titleMatch || descriptionMatch;
        note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };

  //method to remove/delete note
  removeNote = (noteId) => {
    // filters through notes. for each note that does NOT match noteId, returns to updatedNotes, because noteId is what we want to delete
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: updatedNotes });
  };

  // saves to local storage each time state is updated
  componentDidUpdate() {
    const stringifiedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }

  // checkes to see if there is anything saved in local storage
  componentDidMount() {
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      this.setState({ notes: savedNotes });
    }
  }

  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          addNote={this.addNote}
          searchText={this.state.searchText}
        />
        <NotesList
          onType={this.onType}
          notes={this.state.notes}
          removeNote={this.removeNote}
        />
      </div>
    );
  }
}

export default App;