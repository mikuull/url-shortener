import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/libs";
import { NextResponse } from "next/server";

async function GET(req: NextApiRequest, res: any) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Only GET requests are allowed" },
      { status: 400 }
    );
  }

  const { code } = await res.params;

  if (typeof code == "string") {
    const analytic = await prisma.urlAnalytic.findFirst({
      where: {
        url: {
          urlCode: code,
        },
      },
      include: {
        url: true,
      },
    });

    if (!analytic) {
      return NextResponse.json(
        {
          error: {
            message: "Analytic not found!",
          },
          data: null,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: null,
        data: {
          clicked: analytic.clicked,
          url: {
            originalUrl: analytic.url.originalUrl,
            shortUrl: analytic.url.shortUrl,
            code: analytic.url.urlCode,
          },
        },
      },
      { status: 200 }
    );
  }
}

export { GET as GET };
