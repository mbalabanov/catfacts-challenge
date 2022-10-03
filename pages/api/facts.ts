import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

import { BASE_URL } from "../baseUrl";

const getFacts = async (pageNumber: string, factsPerPage: string = "10") => {
  let queryURL = BASE_URL + "?page=" + pageNumber + "&limit=" + factsPerPage;
  try {
    const res = await fetch(queryURL);
    const data = await res.json();
    return data;
  } catch (err) {
    return err;
  }
};

const addIDToFactsData = (
  page: number = 1,
  factsPerPage: number = 10,
  data: { fact: string; length: number }[]
) => {
  let startingID = 1;

  if (page > 1) {
    startingID = Number(page) - 1 + Number(factsPerPage);
  }

  const dataWithID = data.map((dataItem: object) => {
    return {
      ...dataItem,
      id: uuidv4(),
    };
  });

  return dataWithID;
};

const sortDataAscending = (criteria: string, data: any[]) => {
  return data.sort((a, b) => (a[criteria] > b[criteria] ? 1 : -1));
};

const sortDataDescending = (criteria: string, data: any[]) => {
  return data.sort((a, b) => (a[criteria] < b[criteria] ? 1 : -1));
};

const filterByLength = (targetLength: number, data: any[]) => {
  const filteredResults = data.filter((fact) => {
    return fact.length === targetLength;
  });
  return filteredResults;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query;
  let { page, per_page, sort, length_filter } = query;

  if (!page && !per_page) {
    let allFactsCount = await getFacts("1", "1");
    page = "1";
    per_page = allFactsCount.total;
  }

  // @ts-ignore
  let allFactsData = await getFacts(page, per_page);

  let factsDataWithIDs = await addIDToFactsData(
    // @ts-ignore
    page,
    per_page,
    allFactsData.data
  );

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

  if (length_filter) {
    factsDataWithIDs = filterByLength(Number(length_filter), factsDataWithIDs);
  }

  res.status(200).json(factsDataWithIDs);
}
