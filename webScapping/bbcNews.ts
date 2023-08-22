export const scrapi = async () => {
	try {
		const res = await fetch('https://scap-api.onrender.com/savedBbcNews');
		const data = await res.json();
        return data
	} catch (err) {
		console.log(err);
	}
};


//'https://scap-api.onrender.com/bbcNews'