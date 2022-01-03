import React from "react";
import Note from "./Note.js";

//NotesList = Presentation Container

const NotesList = (props) => {
  //for each note, checks if doesMatchSearch is true
  const keepSearchMatches = (notes) => notes.doesMatchSearch;
  //shows notes after filtering for doesMatchSearch = true
  const searchMatches = props.notes.filter(keepSearchMatches);

  //for each note, renderNote returns a note component
  //use key property because rendering a list - helps React work faster
  const renderNote = (note) => (
    <Note
      removeNote={props.removeNote}
      onType={props.onType}
      note={note}
      key={note.id}
    />
  );
  //noteElements only needs to map over "new" filtered list(searchMatches)
  const noteElements = searchMatches.map(renderNote);
  //because map is doing all the work, we can just call noteElements to display note data
  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;
