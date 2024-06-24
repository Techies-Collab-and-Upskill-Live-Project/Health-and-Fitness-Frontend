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

    if (response.status === 401) {
      const refresh = await refreshToken();
      if (refresh.status === 200) {
        return await setNewUsername(data);
      } else if (refresh.status === 401) {
        return { status: response.status };
      }
    } else return { status: response.status };
  } catch (error) {
    console.error("Error setting usernanme", error);
  }
}
export async function updateProfile(data) {
  const jsonString = JSON.stringify(data);
  try {
    const response = await fetch(`${BASE_URL}/api/v1/profile/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: jsonString,
    });

    if (response.status === 401) {
      const refresh = await refreshToken();
      if (refresh.status === 200) {
        return await updateProfile(data);
      } else if (refresh.status === 401) {
        return { status: response.status };
      }
    } else return { status: response.status };
  } catch (error) {
    console.error("Error updating profile", error);
  }
}
