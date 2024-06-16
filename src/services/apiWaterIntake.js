import { decrypt } from "../utils/helpers";
import { BASE_URL, refreshToken } from "./apiAuths";

export async function getUserWaterIntake(date) {
  const token = decrypt(localStorage.getItem("access"));
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/food-diaries/water-intake/?date=${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const resData = await response.json();
    if (response.status === 401) {
      const refresh = await refreshToken();
      if (refresh.status === 200) {
        getUserWaterIntake(date);
      }
    } else return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error fetching user waterintake", error);
  }
}
