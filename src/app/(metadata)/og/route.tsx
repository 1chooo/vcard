import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs";

/**
 * To generate an image for the Open Graph protocol.
 * Read more: [Next.js Docs: `ImageResponse`](https://nextjs.org/docs/app/api-reference/functions/image-response)
 * @param {NextRequest} req
 *
 * @returns ImageResponse
 *
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postTitle = searchParams.get("title");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundImage: "url(https://v0.1chooo.com/images/opengraph-image.png)",
        }}
      >
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: "flex",
            fontSize: 130,
            fontFamily: "Kaisei Tokumin",
            letterSpacing: "-0.05em",
            fontStyle: "normal",
            color: "white",
            lineHeight: "120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      emoji: "twemoji",
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "image/png",
      },
    },
  );
}
