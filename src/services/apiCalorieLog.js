import { BASE_URL, refreshToken } from "./apiAuths";

export async function getUserCalorie(date) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/food-diaries/calorie-log/?date=${date}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const resData = await response.json();

    // If access token expired, try refreshing the token
    if (response.status === 401) {
      const refresh = await refreshToken();
      // If success, recursively call the get user calorie again
      if (refresh.status === 200) {
        return await getUserCalorie(date);
      } else if (refresh.status === 401) {
        // If not, then user needs to log in again
        return { data: resData, status: response.status };
      }
    } else if (response.status === 404) {
      // If user has not logged calorie for the day, create calorie for user
      const { data, status } = await createUserCalorie(date);
      if (status === 201) {
        return { data, status: 200 };
      } else if (status === 404) {
        return { data, status: 404 };
      } else {
        return { data, status };
      }
    } else if (response.status === 200) {
      return { data: resData, status: response.status };
    } else {
      return { data: resData, status: response.status };
    }
  } catch (error) {
    console.log("Error fetching calorie:", error);
  }
}

async function createUserCalorie(date) {
  const jsonString = JSON.stringify({ date: date });
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/food-diaries/calorie-log/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: jsonString,
      }
    );

    const resData = await response.json();
    return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error creating calorie:", error);
  }
}
