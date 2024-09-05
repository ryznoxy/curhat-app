import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { postId, userName, userEmail, reason } = await request.json();

  if (!postId || !userName || !userEmail || !reason) {
    return NextResponse.json("Bad Request", { status: 400 });
  }

  const DC_WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK || "";

  const embed_message = {
    embeds: [
      {
        title: "Report for :",
        description: postId,
        color: 5814783,
        fields: [
          {
            name: "Reported by:",
            value: `${userName} | ${userEmail}`,
          },
          {
            name: "Reason:",
            value: reason,
          },
          {
            name: "Reported at:",
            value: new Date().toISOString(),
          },
        ],
      },
    ],
  };

  const res = await fetch(DC_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(embed_message),
  });

  if (!res.ok) {
    return NextResponse.json("Failed to report", { status: 500 });
  }

  return NextResponse.json("OK", { status: 200 });
}
