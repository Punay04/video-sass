import { authOptions } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import videoModel, { Video, VIDEO_DIMENSIONS } from "@/models/video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();

    const videos = await videoModel.find({}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length === 0) {
      return NextResponse.json({ message: "No videos found" }, { status: 404 });
    }

    return NextResponse.json({ videos }, { status: 200 });
  } catch (error) {
    console.log("Error fetching videos", error);
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDb();

    const body: Video = await req.json();

    if (
      !body.title ||
      !body.description ||
      !body.videoUrl ||
      !body.thumbnailUrl
    ) {
      return NextResponse.json(
        { message: "No video data provided" },
        { status: 400 }
      );
    }

    const videoData: Video = {
      ...body,
      controls: body?.controls ?? true,
      transformation: body?.transformation ?? {
        height: VIDEO_DIMENSIONS.height,
        width: VIDEO_DIMENSIONS.width,
        quality: body?.transformation?.quality ?? 100,
      },
    };

    await videoModel.create(videoData);

    return NextResponse.json({ message: "Video created successfully" });
  } catch (error) {
    console.log("Error creating video", error);
    return NextResponse.json(
      { error: "Failed to create video" },
      { status: 500 }
    );
  }
}
