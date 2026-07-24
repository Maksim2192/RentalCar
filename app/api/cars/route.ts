import { NextResponse } from "next/server";


const API_URL =
  "https://car-rental-api.goit.study";


export async function GET(
  request: Request
) {

  const { searchParams } =
    new URL(request.url);


  const params = new URLSearchParams();


  searchParams.forEach(
    (value, key) => {
      params.append(key, value);
    }
  );



  const response = await fetch(
    `${API_URL}/cars?${params.toString()}`
  );



  if (!response.ok) {

    return NextResponse.json(
      {
        message:
          "Failed to fetch cars",
      },
      {
        status:
          response.status,
      }
    );

  }



  const data =
    await response.json();



  return NextResponse.json(data);

}