import { getComments } from "@/services/Comments";
import { getCurhatanDetail } from "@/services/getCurhatanDetail";
import { getUserByUUID } from "@/services/getUserByEmail";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const curhatanId = searchParams.get("curhatanId");
  if (!curhatanId) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const curhatanDetailArray = [];

  const curhatan = await getCurhatanDetail(curhatanId);

  if (!curhatan) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const user = await getUserByUUID(curhatan.userUuid);

  const username = user?.name;
  const pfpUrl = user?.pfp;

  const curhatanData = {
    ...curhatan,
    user: { username, pfpUrl },
  };

  const comments = await getComments(curhatanId);

  for (const comment of comments) {
    const user = await getUserByUUID(comment.userUuid);
    const username = user?.name;
    const pfpUrl = user?.pfp;

    const commentData = {
      ...comment,

      user: { username, pfpUrl },
    };
    curhatanDetailArray.push(commentData);
  }

  const datas = {
    ...curhatanData,
    comments: curhatanDetailArray,
  };

  return new NextResponse(JSON.stringify(datas), { status: 200 });
}
