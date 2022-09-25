import type { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "../baseUrl";

const totalFactsCount = async () => {
  try {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    return data.total;
  } catch (err) {
    return "332";
  }
};

const getAllFacts = async (pageNumber: string, factsPerPage: string) => {
  let queryURL = BASE_URL + "?page=" + pageNumber + "&limit=" + factsPerPage;
  try {
    const res = await fetch(queryURL);
    const data = await res.json();
    return data.data;
  } catch (err) {
    return err;
  }
};

const addIDToFactsData = (
  page: number,
  factsPerPage: number,
  data: { fact: string; length: number }[]
) => {
  let startingIndex = 0;

  if (page > 1) {
    startingIndex = Number(page) - 1 + Number(factsPerPage);
  }

  let factsDataWithID: { id: number; data: any }[] = [];
  data.forEach((dataEntry: { fact: string; length: number }, index: number) => {
    factsDataWithID.push({
      id: startingIndex + index,
      // @ts-ignore
      fact: dataEntry.fact,
      length: dataEntry.length,
    });
  });
  return factsDataWithID;
};

const sortDataAscending = (criteria: string, data: any[]) => {
  return data.sort((a, b) => (a[criteria] > b[criteria] ? 1 : -1));
};

const sortDataDescending = (criteria: string, data: any[]) => {
  return data.sort((a, b) => (a[criteria] < b[criteria] ? 1 : -1));
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  let { page, per_page, sort } = query;

  if (!page && !per_page) {
    let allFactsCount = await totalFactsCount();
    page = "1";
    per_page = allFactsCount;
  }

  // @ts-ignore
  let allFactsData = await getAllFacts(page, per_page);
  // @ts-ignore
  let factsDataWithIDs = await addIDToFactsData(page, per_page, allFactsData);

  if (sort === "alphabetic") {
    factsDataWithIDs = sortDataAscending("fact", factsDataWithIDs);
  }

  if (sort === "length_ascending") {
    factsDataWithIDs = sortDataAscending("length", factsDataWithIDs);
  }

  if (sort === "length_descending") {
    factsDataWithIDs = sortDataDescending("length", factsDataWithIDs);
  }

  if (sort === "reverse_alphabetic") {
    factsDataWithIDs = sortDataDescending("fact", factsDataWithIDs);
  }

  res.status(200).json(factsDataWithIDs);
}
