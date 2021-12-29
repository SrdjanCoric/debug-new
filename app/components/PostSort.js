import React, { useCallback, useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, recountVotes } from "../actions/posts";
import { changeSort } from "../actions/sort";

import "./css/_PostSort.css";

const Options = [
  {
    name: "old",
    render: "Old",
  },
  {
    name: "top",
    render: "Top",
  },
  {
    name: "new",
    render: "New",
  },
];

const PostSort = () => {
  const { sort } = useSelector((state) => state.sort);
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChangeSort = useCallback(
    (sort) => {
      dispatch(changeSort(sort));
      dispatch(fetchPosts({ sort }));
      dispatch(recountVotes());
      setMenuOpen(false);
    },
    [dispatch]
  );

  useEffect(() => {
    handleChangeSort(sort);
  }, [sort, handleChangeSort]);

  const handleOpenMenu = () => {
    if (menuOpen) {
      return;
    }

    setMenuOpen(true);
  };

  const renderDropdown = () => {
    if (!menuOpen) {
      return null;
    }
    const sorts = Options.map((option) => {
      const className = "option" + (option.name === sort ? " selected" : "");
      return (
        <div
          className={className}
          key={option.name}
          onClick={() => handleChangeSort(option.name)}
        >
          <div className="dot" />
          {option.render}
        </div>
      );
    });
    console.log("in between", menuOpen);
    return (
      <div className="dropdown">
        <div className="sorts">
          <div className="sortHeader">Sort</div>
          {sorts}
        </div>
      </div>
    );
  };
  const option = Options.find((option) => option.name === sort);
  return (
    <div className="postSort">
      <div className="text">Showing</div>
      <div className="selector" onClick={handleOpenMenu}>
        <div className="selectedName">{option.render}</div>
        <div className="icon-chevron-down">v</div>
        {renderDropdown()}
      </div>
      <div className="text">posts</div>
    </div>
  );
};

export default PostSort;
