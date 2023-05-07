const FilteredMsg = ({ props }) => {
  const date = new Date(props.m?.date?.seconds * 1000).toLocaleDateString();

  return (
    <div
      id={props.m.id}
      className="filteredMsgCon"
      onClick={() => props.setMessageId(props.m.id)}
    >
      <div className="filteredMsg" style={{ fontSize: "14px" }}>
        {date}
      </div>
      <div className="filteredMsg" style={{ fontSize: "16px" }}>
        {props.m?.textMessage}
      </div>
    </div>
  );
};

export default FilteredMsg;
