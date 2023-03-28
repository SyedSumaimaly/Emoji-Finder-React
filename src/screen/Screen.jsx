import "../App.css";
import { useEffect, useState } from "react";

function Screen() {
  const [search, setSearch] = useState(false);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  async function Apiget() {
    const response = await fetch(
      "https://emoji-api.com/emojis?access_key=42f4ef8a4fc9fc59afa805874fa8c1106a906f4e"
    );

    const data = await response.json().then((data) => data);
    setData(data);
  }

  useEffect(() => {
    Apiget();
  }, []);

  const SearchFuction = async (e) => {
    if (e.target.value === "") {
      setSearch(false);
    } else {
      setSearch(true);
    }

    const response = await fetch(
      `https://emoji-api.com/emojis?search=${e.target.value}&access_key=42f4ef8a4fc9fc59afa805874fa8c1106a906f4e`
    );

    const data = await response.json().then((data) => data);
    setSearchData(data);
  };

  return (
    <>
      <div className="main_div">
        <div className="head">
          <h2>Emoji Finder App</h2>
        </div>
        <input
          type="text"
          onChange={SearchFuction}
          placeholder="input search text"
          className="serInput"
        />
        <div className="main">
          <div className="cards_main">
            {search
              ? searchData &&
                searchData.map((value, index) => {
                  return (
                    <div className="cards">
                      <div className="character" key={index}>
                        {value.character}
                      </div>
                      <div>
                        <p key={index}>Group: {value.group}</p>
                      </div>
                      <p>Name: {value.unicodeName}</p>
                    </div>
                  );
                })
              : data.map((value, index) => {
                  return (
                    <div className="cards">
                      <div className="character" key={index}>
                        {value.character}
                      </div>
                      <div className="description">
                        <p key={index}>Group: {value.group}</p>
                      </div>
                      <div  className="description_second">
                        <p>Name: {value.unicodeName}</p>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Screen;
