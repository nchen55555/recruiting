import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const userId = process.env.NEXT_PUBLIC_USER_ID;
    const data = await req.json(); 
    const response = await fetch(data.url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${apiKey}:`)}`,
        'Content-Type': 'application/json',
        'On-Behalf-Of': `${userId}`,
     },
      body: JSON.stringify(data.data), 
    });

    console.log("Greenhouse response status:", response.status);

    if (!response.ok) {
        const errorData = await response.json();
        console.log("Error from Greenhouse:", errorData);
        return NextResponse.json({ error: errorData }, { status: response.status });
    }

    if (response.headers.get('content-type')?.includes('application/json')) {
        const responseData = await response.json();
        return NextResponse.json({ message: 'Application submitted successfully', data: responseData });
    } else {
        const errorText = await response.text();
        console.error("Non-JSON response:", errorText);
        return NextResponse.json({ error: 'Unexpected response format' }, { status: 500 });
    }
}