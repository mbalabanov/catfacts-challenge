import type { NextApiRequest, NextApiResponse } from "next";

const totalFactsCount = async () => {
  try {
    const res = await fetch(`https://catfact.ninja/facts`);
    const data = await res.json();
    return data.total;
  } catch (err) {
    return err;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let factsCount = await totalFactsCount();
  res.status(200).json({ total_facts_count: factsCount });
}
