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

export async function createUserMeal(mealData) {
  const jsonString = JSON.stringify(mealData);
  try {
    const response = await fetch(`${BASE_URL}/api/v1/food-diaries/meal/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: jsonString,
    });

    const resData = await response.json();
    if (response.status === 401) {
      const refresh = await refreshToken();
      if (refresh.status === 200) {
        return await createUserMeal(mealData);
      } else if (refresh.status === 401) {
        return { data: resData, status: response.status };
      }
    } else return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error creating meal:", error);
  }
}
export async function deleteUserMeal(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/food-diaries/meal/${id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.status === 401) {
      const refresh = await refreshToken();
      if (refresh.status === 200) {
        return await deleteUserMeal(id);
      } else if (refresh.status === 401) {
        return { status: response.status };
      }
    } else return { status: response.status };
  } catch (error) {
    console.error("Error deleting meal:", error);
  }
}
