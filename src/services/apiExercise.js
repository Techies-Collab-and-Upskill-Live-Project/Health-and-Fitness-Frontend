import { decrypt } from "../utils/helpers";
import { BASE_URL } from "./apiAuths";

export async function getUserExercise(date) {
  const token = decrypt(localStorage.getItem("access"));
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/food-diaries/exercise/?date=${date}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const resData = await response.json();
    return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error fetching user exercises", error);
  }
}
