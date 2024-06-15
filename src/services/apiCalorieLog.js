import { decrypt } from "../utils/helpers";
import { BASE_URL, refreshToken } from "./apiAuths";

export async function getUserCalorie(date) {
  const token = decrypt(localStorage.getItem("access"));
  //Fetch user calorie for the given date
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/food-diaries/calorie-log/?date=${date}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const resData = await response.json();
    // If access token expired, try refreshing the token
    if (response.status === 401) {
      const refresh = await refreshToken();
      //If success, recursively call the get user calorie again
      if (refresh.status === 200) {
        getUserCalorie(date);
        //If not, then user needs to log in again
      } else if (refresh.status === 401) {
        return { data: resData, status: response.status };
      }
      //If user has not log calorie for the day
    } else if (response.status === 404) {
      // Create calorie for user
      const { data, status } = await createUserCalorie(date, token);
      if (status === 201) {
        return { data, status: 200 };
      }
    } else if (response.status === 200) {
      return { data: resData, status: response.status };
    }
  } catch (error) {
    console.log("Error fetching calorie:", error);
  }
}

async function createUserCalorie(date, token) {
  const jsonString = JSON.stringify({ date: date });
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/food-diaries/calorie-log/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: jsonString,
      }
    );

    const resData = await response.json();
    return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error creating calorie:", error);
  }
}
