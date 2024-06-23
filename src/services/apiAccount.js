import { BASE_URL, refreshToken } from "./apiAuths";

export async function setNewUsername(data) {
  const jsonString = JSON.stringify(data);
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/auth/users/set_username/`,
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
        return await setNewUsername(data);
      } else if (refresh.status === 401) {
        return { data: resData, status: response.status };
      }
    } else return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error setting usernanme", error);
  }
}
