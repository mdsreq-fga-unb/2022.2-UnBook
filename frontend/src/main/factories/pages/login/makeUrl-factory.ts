const makeUrl = (path: string): string => {
	return `http://localhost:3000/api/${path}`;
};

export { makeUrl };
