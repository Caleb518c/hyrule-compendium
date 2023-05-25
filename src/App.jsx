import React, { useEffect, useState } from "react";
import Thumbnail from "./Thumbnail";
import Entry from "./Entry";
import CategoryButton from "./CategoryButton";
import "./App.css";

function App() {
  const [data, setData] = useState();
  const [currentCategory, setCurrentCategory] = useState("creatures");
  const [currentEntrySelected, setCurrentEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://botw-compendium.herokuapp.com/api/v2/all"
        );
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleCategory = (category) => {
    setCurrentCategory(category);
  };

  const toggleCurrentEntry = (entryID) => {
    setCurrentEntry(entryID);
  };

  const renderCurrentEntry = () => {
    if (currentEntrySelected === null) {
      return null;
    } else {
      return (
        <>
          <Entry
            currentId={currentEntrySelected}
            toggleCurrentEntry={(entryID) => {
              toggleCurrentEntry(data.data.id);
            }}
          />
        </>
      );
    }
  };

  const renderThumbnails = () => {
    const categoryData = data && data.data[currentCategory];
    if (!categoryData) {
      return null;
    }

    if (loading) {
      return (
        <>
          <div className="thumbnailLoading">
            <div>Image</div>
            <h3>Name</h3>
            <p>Id</p>
          </div>
        </>
      );
    } else {
      if (Object.keys(categoryData).length === 2) {
        return (
          <>
            <>
              {categoryData.non_food
                .sort((a, b) => a.id - b.id)
                .map((item) => (
                  <Thumbnail
                    key={item.id}
                    name={item.name}
                    number={item.id}
                    img={item.image}
                    toggleCurrentEntry={() => {
                      toggleCurrentEntry(item.id);
                    }}
                  />
                ))}
            </>
            <>
              {categoryData.food
                .sort((a, b) => a.id - b.id)
                .map((item) => (
                  <Thumbnail
                    key={item.id}
                    name={item.name}
                    number={item.id}
                    img={item.image}
                    toggleCurrentEntry={() => {
                      toggleCurrentEntry(item.id);
                    }}
                  />
                ))}
            </>
          </>
        );
      } else {
        return categoryData
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <Thumbnail
              key={item.id}
              name={item.name}
              number={item.id}
              img={item.image}
              toggleCurrentEntry={() => {
                toggleCurrentEntry(item.id);
              }}
            />
          ));
      }
    }
  };

  return (
    <>
      {currentEntrySelected && currentCategory !== null ? (
        <div className="bigEntryWrapper">
          <div className="entryWrapperMain">
            <button
              className="removeEntryButton"
              onClick={() => toggleCurrentEntry(null)}
            >
              ✖
            </button>
            <div className="currentEntry">{renderCurrentEntry()}</div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="everythingElseWrapper">
        <div className="categoryButtons">
          <CategoryButton
            categoryName={"creatures"}
            currentCategory={"creatures"}
            toggleCategory={setCurrentCategory}
          />
          <CategoryButton
            categoryName={"monsters"}
            currentCategory={"monsters"}
            toggleCategory={setCurrentCategory}
          />
          <CategoryButton
            categoryName={"materials"}
            currentCategory={"materials"}
            toggleCategory={setCurrentCategory}
          />
          <CategoryButton
            categoryName={"equipment"}
            currentCategory={"equipment"}
            toggleCategory={setCurrentCategory}
          />
          <CategoryButton
            categoryName={"treasure"}
            currentCategory={"treasure"}
            toggleCategory={setCurrentCategory}
          />
        </div>

        <div className="thumbnailContainer">{renderThumbnails()}</div>
      </div>
    </>
  );
}

export default App;
