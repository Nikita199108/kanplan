export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";

const boards = [
    { id: "1", title: "Demo Board", createdAt: new Date().toISOString() },
];

export async function GET() {
    return NextResponse.json(boards);
}