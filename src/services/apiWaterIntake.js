import { BASE_URL, refreshToken } from "./apiAuths";

export async function getUserWaterIntake(date) {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/food-diaries/water-intake/?date=${date}`,
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
        return await getUserWaterIntake(date);
      }
    } else return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error fetching user waterintake", error);
  }
}

export async function createWaterIntake(waterIntakeData) {
  const jsonString = JSON.stringify(waterIntakeData);
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/food-diaries/water-intake/`,
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
    if (response.status === 401) {
      const refresh = await refreshToken();
      if (refresh.status === 200) {
        return await createWaterIntake(waterIntakeData);
      } else if (refresh.status === 401) {
        return { data: resData, status: response.status };
      }
    } else return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error creating waterIntake:", error);
  }
}

export async function updateWaterIntake(updatedData) {
  const jsonString = JSON.stringify(updatedData);
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/food-diaries/water-intake/`,
      {
        method: "PUT",
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
        return await updateWaterIntake(updatedData);
      } else if (refresh.status === 401) {
        return { data: resData, status: response.status };
      }
    } else return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error updating waterIntake:", error);
  }
}
