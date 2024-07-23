import { BASE_URL, refreshToken } from "./apiAuths";

export async function createProfile(profileData) {
  const jsonString = JSON.stringify(profileData);
  try {
    const response = await fetch(`${BASE_URL}/api/v1/profile/`, {
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
        return await createProfile(profileData);
      } else if (refresh.status === 401) {
        return { data: resData, status: response.status };
      }
    } else if (response.status === 201) {
      await fetch(`${BASE_URL}/api/v1/profile/notification-preferences/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      return { data: resData, status: response.status };
    } else {
      return { data: resData, status: response.status };
    }
  } catch (error) {
    console.error("Error creating profile:", error);
  }
}
