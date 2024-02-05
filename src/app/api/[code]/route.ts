import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma } from "@/libs";

type Data = {
  name: string;
};

async function GET(req: NextApiRequest, res: any) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Only GET requests are allowed" },
      { status: 400 }
    );
  }

  const { code } = await res.params;

  if (typeof code == "string") {
    const result = await prisma.$transaction(async (tx) => {
      const url = await tx.url.findUnique({
        where: {
          urlCode: code,
        },
      });

      if (!url) return null;

      await tx.urlAnalytic.update({
        where: {
          url_id: url.id,
        },
        data: {
          clicked: {
            increment: 1,
          },
        },
      });

      return url;
    });

    if (!result) {
      return NextResponse.json(
        {
          error: {
            message: "Invalid short url code!",
          },
          data: null,
        },
        { status: 400 }
      );
    }

    return NextResponse.redirect(result.originalUrl);
  }
}

export { GET as GET };
