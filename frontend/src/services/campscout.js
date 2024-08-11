const campscoutUrl = "http://localhost:8000"

export const getCampgrounds = async () => {
    const preparedUrl = `${campscoutUrl}/campground`
    try {
        const response = await fetch(preparedUrl)
        return response
    } catch (error) {
        console.log(`Error retrieving campgrounds: ${error}`)
        throw error
    }
}

export const createCampscout = async (campgrounds, startDate, endDate) => {
    const body = JSON.stringify({
        campground_id: campgrounds,
        start_date: startDate,
        end_date: endDate
    })

    const preparedUrl = `${campscoutUrl}/scout`
    try {
        const response = await fetch(preparedUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body
        });
        return response
    } catch (error) {
        console.log(`Error creating scout: ${error}`);
        throw error
    }
};
