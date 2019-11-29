import { useState, useEffect } from "react";
// import { getCharacter } from "../api/search";

const useSearch = searchString => {
	const [locations, setLocations] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);

		const debounced = setTimeout(() => {
			// getCharacter(searchString).then(({ data }) => {
			// 		setLocations(data);
			// 		setLoading(false);
			// 	})
			// 	.catch(e => {
			// 		setLoading(false);
			// 	});
		}, 300);

		return () => {
			clearTimeout(debounced);
		};
	}, [searchString]);

	return { locations, isLoading };
};

export default useSearch;