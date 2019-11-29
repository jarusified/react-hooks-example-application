import axios from 'axios';

const GET_LOCATIONS = 'https://localhost/api/search';

export const getLocations = async name => (
	axios.get(`${GET_LOCATIONS}${name}`, { params: { fields: "name" } })
);

