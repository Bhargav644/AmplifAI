import { createContext, useState } from "react";

export const SearchContext = createContext({
  searchTerm: "",
  searchResults: [],
  setSearchTerm: () => {},
  setSearchResults: () => {},
});

export default function SearchProvider(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider
      value={{ searchTerm, searchResults, setSearchTerm, setSearchResults }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
