import type { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "../../baseUrl";

const getFactByID = async (pageNumber: string, factsPerPage: string) => {
  let queryURL = BASE_URL + "?page=" + pageNumber + "&limit=" + factsPerPage;
  try {
    const res = await fetch(queryURL);
    const data = await res.json();
    console.log(data);
    return data.data;
  } catch (err) {
    return err;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  // @ts-ignore
  let factData = await getFactByID(id, 1);
  res.status(200).json({
    id: id,
    fact: factData[0].fact,
    length: factData[0].length,
  });
}
