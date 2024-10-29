import { NextRequest, NextResponse } from "next/server";

const apiKey = 'f06b2b153e016f8e7c3632627af56b1d-7';

// curl -X POST 'https://harvest.greenhouse.io/v1/candidates' -H 'Authorization: Basic f06b2b153e016f8e7c3632627af56b1d-7:' -H "Content-Type: application/json" -H "On-Behalf-Of: 4280249007" -d '{"first_name": "John","last_name": "Locke","company": "The Tustin Box Company","title": "Customer Success Representative","is_private": false,"applications": [{"job_id": 4285367007}]}'

export async function POST(req: NextRequest, res: NextResponse) {
    const data = await req.json(); // Parse request body
    const response = await fetch('https://harvest.greenhouse.io/v1/candidates', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`${apiKey}:`)}`,
        'Content-Type': 'application/json',
        'On-Behalf-Of': '',
      },
      body: JSON.stringify(data), // not getting the right data fro the request 
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