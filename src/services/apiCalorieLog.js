import { decrypt } from "../utils/helpers";
import { BASE_URL, refreshToken } from "./apiAuths";

export async function getUserCalorie(date) {
  const token = decrypt(localStorage.getItem("access"));
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
    if (response.status === 401) {
      const refresh = await refreshToken();
      if (refresh.status === 200) {
        getUserCalorie(date);
      } else if (refresh.status === 401) {
        return { data: resData, status: response.status };
      }
    } else if (response.status === 404) {
      const {data, status} = await createUserCalorie(date, token);
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
