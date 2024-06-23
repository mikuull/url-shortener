import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs";

async function GET(req: NextRequest, res: any) {
  const { code } = res.params;

  if (typeof code === "string") {
    try {
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
    } catch (error) {
      console.error("Error fetching URL:", error);
      return NextResponse.json(
        {
          error: {
            message: "Internal Server Error",
          },
          data: null,
        },
        { status: 500 }
      );
    }
  } else {
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
}

export { GET as GET };
