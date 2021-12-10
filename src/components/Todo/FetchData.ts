import axios from "axios";

export const API = "https://hn.algolia.com/api/v3";

// Example use case: fetchData("react");
export const fetchData = async (query: string) => {
  const url = `${API}/search?query=${query}`;

  return await axios.get(url);
};

