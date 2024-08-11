const campscoutUrl = "http://localhost:8000"

const createCampscout = async (campgrounds, startDate, endDate) => {
    const preparedUrl = `${campscoutUrl}?campground=${campgrounds}&startDate=${startDate}&endDate=${endDate}`
    try {
        const response = await fetch(preparedUrl);
        console.log(response)
        return response
    } catch (error) {
        console.log("Campscout API error: ", error);
        throw error
    }
};

export default createCampscout;