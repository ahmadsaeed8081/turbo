import React from "react";

import { SearchIcon } from "../../icons";
const SearchBox = () => {
  return (
    <div className="search-box flex">
      <div className="warp flex items-center">
        <div className="left-side flex items-center">
          <div className="icon flex items-center justify-center">
            <SearchIcon />
          </div>
          <input
            type="text"
            className="txt cleanbtn w-full"
            placeholder="Search Member By Address"
          />
        </div>
        <div className="right-side flex items-center justify-center">
          <div className="btn-lbl">Search</div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
