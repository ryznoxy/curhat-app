export const removeLike = async (
  uuid: string,
  userUuid: string,
  postOrComment: "post" | "comment"
) => {
  if (!userUuid) {
    return { success: false, msg: "You need to login" };
  }

  try {
    const response = await fetch("/api/update-like", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid, userUuid, postOrComment }),
    });

    if (!response.ok) {
      return { success: false, msg: "Failed to remove like" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, msg: "An error occurred while removing like" };
  }
};

export const addLike = async (
  uuid: string,
  userUuid: string,
  postOrComment: "post" | "comment"
) => {
  if (!userUuid) {
    return {
      success: false,
      msg: "You need to login",
    };
  }

  try {
    const response = await fetch("/api/update-like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uuid, userUuid, postOrComment }),
    });

    if (!response.ok) {
      return {
        success: false,
        msg: "Failed to add like",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      msg: "An error occurred while adding like",
    };
  }
};
