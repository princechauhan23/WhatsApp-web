import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SearchMsg = ({ props }) => {
  const handleSearch = (e) => {
    console.log(e.target.value);
  };

  const handleback = () => {
    props.setSrchmsgInput("");
  };

  return (
    <div className="searchBar-container">
      <div className="searchBar">
        {props.srchmsgInput === "" ? (
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ color: "#54656f" }}
          />
        ) : (
          <FontAwesomeIcon
            icon={faArrowLeft}
            onClick={handleback}
            style={{ color: "#54656f", cursor: "pointer" }}
          />
        )}
        <input
          type="text"
          name="search"
          value={props.srchmsgInput}
          onKeyUp={handleSearch}
          placeholder="Search or start new chat"
          onChange={(e) => props.setSrchmsgInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchMsg;
