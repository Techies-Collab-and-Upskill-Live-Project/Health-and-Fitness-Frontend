import { BASE_URL, refreshToken } from "./apiAuths";

export async function getUserMeal(date) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/food-diaries/meal/?date=${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const resData = await response.json();
    if (response.status === 401) {
      const refresh = await refreshToken();
      if (refresh.status === 200) {
       return await getUserMeal(date);
      } else if (refresh.status === 401) {
        return { data: resData, status: response.status };
      }
    } else return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error fetching user meals", error);
  }
}
