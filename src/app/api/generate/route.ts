import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { prisma, generateLink } from "@/libs";
import { isWebUri } from "valid-url";

type RequestData = {
  url: string;
};

async function POST(req: any, res: NextApiResponse) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Only POST requests are allowed" },
      { status: 400 }
    );
  }

  const { url }: RequestData = await req.json();
  //const host = req.headers.host;
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

  const result = await prisma.$transaction(async (tx) => {
    const originalUrl = await tx.url.findFirst({
      where: {
        originalUrl: url,
      },
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
          connect: {
            id: newUrl.id,
          },
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
}

export { POST as POST };
