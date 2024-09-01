import { getComments } from "@/services/Comments";
import { getCurhatanList } from "@/services/getCurhatanList";
import { getUserByUUID } from "@/services/getUserByUUID";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const curhatanList = await getCurhatanList();

  if (!curhatanList) {
    return NextResponse.json({ msg: "Bad Request" }, { status: 400 });
  }

  const enhancedCurhatanList = [];

  for (const curhatan of curhatanList) {
    const userUUID = curhatan.userId;

    const comment = await getComments(curhatan.uuid);
    const commentLength = comment.length;

    const user = await getUserByUUID(userUUID);
    const username = user?.name;
    const pfpUrl = user?.pfp;

    const enhancedCurhatan = {
      ...curhatan,
      user: {
        username,
        pfpUrl,
      },
      commentLength,
    };

    enhancedCurhatanList.push(enhancedCurhatan);
  }

  return NextResponse.json(enhancedCurhatanList, {
    status: 200,
  });
}
