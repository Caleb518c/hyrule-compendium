import React, { useEffect, useState } from "react";

function Entry({ currentId, toggleCurrentEntry }) {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(true);

  const propertyMappings = [
    { key: "common_locations", label: "Common Locations" },
    { key: "drops", label: "Drops" },
    { key: "hearts_recovered", label: "Hearts Recovered" },
    { key: "cooking_effect", label: "Cooking Effect" },
    { key: "attack", label: "Damage" },
    { key: "defense", label: "Defense" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://botw-compendium.herokuapp.com/api/v2/entry/" + currentId
        );
        const jsonDataRaw = await response.json();
        setJsonData(jsonDataRaw);
        setLoading(false); // Set loading state to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading state to false in case of an error
      }
    };

    if (currentId) {
      fetchData();
    }
  }, [currentId]);

  if (loading) {
    return (
      <div className="loadingEntry">
        <div className="loadingEntryContentWrapper">
          <h1>Name</h1>
          <p>Id:</p>
          <div className="loadingEntryImage">Image</div>
          <h3>Description:</h3>
          <p className="descriptionLoading">Description</p>
        </div>
      </div>
    );
  }

  if (jsonData === null) {
    console.log("JSON data returned by API call was null");
    return null;
  }

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="entry">
      <div className="entryContentWrapper">
        <h1>{capitalizeFirstLetter(jsonData.data.name)}</h1>
        <p>Id: {jsonData.data.id}</p>
        <img src={jsonData.data.image} alt="" />
        <h3>Description:</h3>
        <p>{jsonData.data.description}</p>

        {propertyMappings.map((property) => {
          if (
            property.key === "drops" &&
            jsonData.data[property.key] &&
            jsonData.data[property.key].length > 0
          ) {
            return (
              <div key={property.key}>
                <h3>{property.label}:</h3>
                <div>
                  {jsonData.data[property.key].map((item, index) => (
                    <div key={index}>{item}</div>
                  ))}
                </div>
              </div>
            );
          } else if (
            jsonData.data[property.key] &&
            jsonData.data[property.key] !== -1
          ) {
            return (
              <div key={property.key}>
                <h3>{property.label}:</h3>
                <div>
                  {Array.isArray(jsonData.data[property.key]) &&
                  jsonData.data[property.key].length > 1 ? (
                    jsonData.data[property.key].map((item, index) => (
                      <div key={index}>{item}</div>
                    ))
                  ) : (
                    <div>{jsonData.data[property.key]}</div>
                  )}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default Entry;
