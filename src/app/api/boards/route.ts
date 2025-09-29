export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";

const boards = [ 
    { id: "1", title: "Demo Board", createdAt: new Date().toISOString() },
];

export async function GET() {
    return NextResponse.json(boards);
}

export async function POST(req: Request) {
    const data = await req.json();
    const newBoard = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString()
    };
    boards.push(newBoard);  // ← ЭТО НЕ БУДЕТ РАБОТАТЬ С const!
    return NextResponse.json(newBoard, { status: 201 });
}