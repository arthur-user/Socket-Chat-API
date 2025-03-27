export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check if the response is OK before parsing the JSON
    if (!response.ok) {
      const responseData = await response.json();
      let message;
      if (responseData?.message) {
        message = responseData.message; // Get error message from response if present
      } else {
        message = responseData; // fallback to the response body as message
      }
      return { error: true, message }; // Return error message if not OK
    }

    // Parse and return the JSON response data if successful
    const responseData = await response.json();
    return responseData;

  } catch (error) {
    return { error: true, message: error.message || "Something went wrong" };
  }
};

export const getRequest = async (url) => {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    let message = "Error fetching data";

    if (data?.message) {
      message = data.message;
    }
    return { error: true, message };
  }
  return data; // return data if no error
};
