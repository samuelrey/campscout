const campscoutUrl = "http://localhost:8000"

const createCampscout = async (campgrounds, startDate, endDate) => {
    const body = JSON.stringify({
        campground_id: campgrounds,
        start_date: startDate,
        end_date: endDate
    })
    console.log(body)
    const preparedUrl = `${campscoutUrl}/scout`
    try {
        const response = await fetch(preparedUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body
        });
        console.log(response)
        return response
    } catch (error) {
        console.log("Campscout API error: ", error);
        throw error
    }
};

export default createCampscout;