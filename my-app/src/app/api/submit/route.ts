import { NextRequest, NextResponse } from "next/server";

/**
 * Sends a specific request to the GreenHouse API endpoint. For this specific application, 
 * we will only be sending requests to ADD a candidate and ADD an attachment to the candidate's profile
 * @param {NextRequest} data - data from application form to be included in candidate's profile.
 * @returns {NextResponse} - Response json for success or failure 
 */
export async function POST(req: NextRequest) {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const userId = process.env.NEXT_PUBLIC_USER_ID;
    const data = await req.json(); 

    // To abstract method to both requests to ADD a candidate and ADD an attachment to the candidate's profile 
    // each request body has an endpoint URL specific to the initial caller's purpose
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