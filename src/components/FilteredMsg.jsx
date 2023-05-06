const FilteredMsg = ({ props }) => {

    console.log(props.m, 'props')
  const date = new Date(props.m?.date?.seconds * 1000).toLocaleDateString();

  return (
    <div className="filteredMsgCon">
      <div className="filteredMsg" style={{fontSize: "14px"}}>{date}</div>
      <div className="filteredMsg" style={{fontSize: "16px"}}>{props.m?.textMessage}</div>
    </div>
  );
};

export default FilteredMsg;
