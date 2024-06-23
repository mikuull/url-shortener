import { NextRequest, NextResponse } from "next/server";
import { prisma, generateLink } from "@/libs";
import { isWebUri } from "valid-url";

type RequestData = {
  url: string;
};

async function POST(req: NextRequest) {
  const { url }: RequestData = await req.json();

  const { shortCode, shortUrl } = generateLink("localhost:3000");

  if (!isWebUri(url)) {
    return NextResponse.json(
      {
        error: {
          message: "Invalid Url",
        },
        data: null,
      },
      { status: 400 }
    );
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const originalUrl = await tx.url.findFirst({
        where: { originalUrl: url },
      });

      if (originalUrl) return originalUrl;

      const newUrl = await tx.url.create({
        data: {
          originalUrl: url,
          shortUrl,
          urlCode: shortCode,
        },
      });

      await tx.urlAnalytic.create({
        data: {
          clicked: 0,
          url: {
            connect: { id: newUrl.id },
          },
        },
      });

      return newUrl;
    });

    return NextResponse.json(
      {
        error: null,
        data: {
          originalUrl: result.originalUrl,
          shortUrl: result.shortUrl,
          code: result.urlCode,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database transaction error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export { POST as POST };
