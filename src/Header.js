import React from "react";

//Header = Container Component (manages data)

const Header = (props) => {
  const callSearch = (e) => {
    props.onSearch(e.target.value);
  };

  return (
    <header>
      <h1 className="app-header__title">Super Sticky Notes</h1>
      <aside className="app-header__controls">
        <button onClick={props.addNote} className="add-new">
          + New Note
        </button>
        <input
          className="search"
          type="text"
          placeholder="Type here to search..."
          value={props.searchText}
          onChange={callSearch}
        />
      </aside>
    </header>
  );
};

export default Header;
