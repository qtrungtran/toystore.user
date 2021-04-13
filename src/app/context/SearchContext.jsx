import React, { useState, useContext, createContext } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
	const [search, setSearch] = useState('');

	const searchChange = value => {
		setSearch(value);
	};

	return (
		<SearchContext.Provider
			value={{
				search,
				searchChange
			}}
		>
			{children}
		</SearchContext.Provider>
	);
};

export const useSearch = () => {
	const { search, searchChange } = useContext(SearchContext);
	return {
		search,
		searchChange
	};
};
