import { getComments } from "@/services/Comments";
import { getCurhatanList } from "@/services/getCurhatanList";
import { getUserByUUID } from "@/services/getUserByUUID";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const curhatanList = await getCurhatanList();

  if (!curhatanList) {
    return NextResponse.json({ msg: "Bad Request" }, { status: 400 });
  }

  const fetchPromises = curhatanList.map(async (curhatan) => {
    const [comments, user] = await Promise.all([
      getComments(curhatan.uuid),
      getUserByUUID(curhatan.userId),
    ]);

    return {
      ...curhatan,
      commentLength: comments.length,
      user: {
        username: user?.name,
        pfpUrl: user?.pfp,
      },
    };
  });

  const enhancedCurhatanList = await Promise.all(fetchPromises);

  return NextResponse.json(enhancedCurhatanList, { status: 200 });
}
