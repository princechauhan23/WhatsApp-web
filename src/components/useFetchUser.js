const fetchUserList = async () => {
  const apiRes = await fetch("https://api.github.com/users");
  const json = await apiRes.json();
  // console.log("json", json)
  return json;
};

export default fetchUserList;
