import type { NextApiRequest, NextApiResponse } from "next";

const callAPI = async () => {
  try {
    const res = await fetch(`https://catfact.ninja/fact`);
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let factsResponse = await callAPI();
  res.status(200).json(factsResponse);
}
