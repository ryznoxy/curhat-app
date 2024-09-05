export const ReasonList = [
  "Spam",
  "Hate Speech",
  "Violence",
  "Racism",
  "Harmful",
  "Other",
];

export const report = async (
  postId: string,
  userName: string,
  userEmail: string,
  reason: string
) => {
  if (!userEmail) {
    return;
  }
  const res = await fetch("/api/report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId, userName, userEmail, reason }),
  });

  let isError = false;

  if (!res.ok) {
    isError = true;
  }

  return { isError };
};
