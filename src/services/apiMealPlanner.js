import { BASE_URL, refreshToken } from "./apiAuths";

export async function getUserPlannedMeals(dateRange) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/meal-planner/meals/?date_range=${dateRange}`,
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
        return await getUserPlannedMeals(dateRange);
      } else if (refresh.status === 401) {
        return { data: resData, status: response.status };
      }
    } else return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error fetching user meals", error);
  }
}

export async function createPlannedMeal({data}) {
  const jsonString = JSON.stringify(data);
  try {
    const response = await fetch(`${BASE_URL}/api/v1/meal-planner/meals/`, {
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
        return await createPlannedMeal(data);
      } else if (refresh.status === 401) {
        return { data: resData, status: response.status };
      }
    } else return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error creating meal:", error);
  }
}

export async function updatePlannedMeal({data, id}) {
  const jsonString = JSON.stringify(data);
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/meal-planner/meals/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: jsonString,
      }
    );

    const resData = await response.json();
    if (response.status === 401) {
      const refresh = await refreshToken();
      if (refresh.status === 200) {
        return await updatePlannedMeal(data, id);
      } else if (refresh.status === 401) {
        return { data: resData, status: response.status };
      }
    } else return { data: resData, status: response?.status };
  } catch (error) {
    console.error("Error updating planned meal:", error);
  }
}

export async function deleteUserMeal(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/meal-planner/meals/${id}/`,
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
