import { BASE_URL, refreshToken } from "./apiAuths";
import { createClient } from "@supabase/supabase-js";

const PURL = import.meta.env.VITE_PROJECT_URL;

// Create Supabase client
const supabase = createClient(PURL, import.meta.env.VITE_SUPABASE_KEY);

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

export async function setAvatar(file) {
  const response = await uploadFile(file);
  const avatar = `${PURL}/storage/v1/object/public/${response.fullPath}`;

  const res = await updateProfile({ avatar: avatar });
  return { status: res.status };
}

// Upload file using standard upload
async function uploadFile(file) {
  const imagePath = `${Math.random()}-${file.name}`.replaceAll("/", "");

  const { data, error } = await supabase.storage.from("avatars").upload(imagePath, file);
  if (error) {
    // Handle error
    return error;
  } else {
    // Handle success
    return data;
  }
}

export async function getNotificationPreferences() {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/profile/notification-preferences`,
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
        return await getNotificationPreferences();
      } else if (refresh.status === 401) {
        return { data: resData, status: response.status };
      }
    } else return { data: resData, status: response.status };
  } catch (error) {
    console.error("Error fetching user notification preferences", error);
  }
}

export async function updatePreferences(data) {
  const jsonString = JSON.stringify(data);
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/profile/notification-preferences/`,
      {
        method: "PUT",
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
        return await updatePreferences(data);
      } else if (refresh.status === 401) {
        return { status: response.status };
      }
    } else return { status: response.status };
  } catch (error) {
    console.error("Error updating notification preferences", error);
  }
}
