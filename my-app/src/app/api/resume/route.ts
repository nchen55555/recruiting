import { NextRequest, NextResponse } from "next/server";

const apiKey = 'f06b2b153e016f8e7c3632627af56b1d-7';

// curl -X POST 'https://harvest.greenhouse.io/v1/candidates' \
  // -H "Authorization: Basic ZjA2YjJiMTUzZTAxNmY4ZTdjMzYzMjYyN2FmNTZiMWQtNzo=" \
  // -H "Content-Type: application/json" \
  // -H "On-Behalf-Of: 4280249007" \
  // -d '{"first_name": "John","last_name": "Locke","company": "The Tustin Box Company","title": "Customer Success Representative","is_private": false,"applications": [{"job_id": 4285367007}]}'

  // curl -X GET 'https://harvest.greenhouse.io/v1/candidates/34727662007' -u  f06b2b153e016f8e7c3632627af56b1d-7:

export async function POST(req: NextRequest) {
    const data = await req.json(); // Parse request body
    const response = await fetch(data.url, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ZjA2YjJiMTUzZTAxNmY4ZTdjMzYzMjYyN2FmNTZiMWQtNzo=',
        'Content-Type': 'application/json',
        'On-Behalf-Of': '4280249007',
     },
      body: JSON.stringify(data.application), // not getting the right data fro the request 
    });

    console.log("Greenhouse Application Upload response status:", response.status);
    if (!response.ok) {
        const errorData = await response.json();
        console.log("Error from Greenhouse Application Upload:", errorData);
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