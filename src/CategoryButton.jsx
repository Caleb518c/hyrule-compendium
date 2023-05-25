import React from "react";

function CategoryButtons({ categoryName, currentCategory, toggleCategory }) {
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div>
      <button
        className="categoryButton"
        onClick={() => {
          toggleCategory(categoryName);
          currentCategory = categoryName;
        }}
      >
        <div className="categoryButtonContents">
          <img
            src={"src/Icons/" + categoryName + ".png"}
            alt={categoryName + " icon"}
          />
          <p>{capitalizeFirstLetter(categoryName)}</p>
        </div>
      </button>
    </div>
  );
}

export default CategoryButtons;
