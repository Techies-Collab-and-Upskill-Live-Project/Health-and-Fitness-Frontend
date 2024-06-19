import { BASE_URL, refreshToken } from "./apiAuths";

export async function getUserExercise(date) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/food-diaries/exercise/?date=${date}`,
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
       return await getUserExercise(date);
      } else if (refresh.status === 401) {
        return { data: resData, status: response.status };
      }
    } else return { data: resData, status: response.status };

    return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error fetching user exercises", error);
  }
}

export async function createUserExercise(exerciseData) {
  const jsonString = JSON.stringify(exerciseData);
  try {
    const response = await fetch(`${BASE_URL}/api/v1/food-diaries/exercise/`, {
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
        return await createUserExercise(exerciseData);
      } else if (refresh.status === 401) {
        return { data: resData, status: response.status };
      }
    } else return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error creating exercise:", error);
  }
}

export async function deleteUserExercise(id) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/food-diaries/exercise/${id}/`,
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
        return await deleteUserExercise(id);
      } else if (refresh.status === 401) {
        return { status: response.status };
      }
    } else return { status: response.status };
  } catch (error) {
    console.error("Error deleting exercise:", error);
  }
}
