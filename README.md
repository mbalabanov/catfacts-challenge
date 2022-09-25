This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Descripion
- This is a REST API using Next.js with TypeScript
    - It integrates with an external catfact API at https://catfact.ninja/
    - This API gets data from https://catfact.ninja/facts and provides it on Localhost:3000/api/...
    - It uses API routes of Next.js

- You can get data from the following API endpoints
    - Get **all** available cat facts unsorted at /api/facts
    - Get **all** available cat facts in **alphabetic order** at /api/facts?sort=alphabetic
    - Get **all** available cat facts **sorted by length ascending** at /api/facts?sort=length_ascending
    - Get all cat facts **paginated** at /api/facts?page=3&per_page=20
    - Get all cat facts **paginated and sorted alphabetically** at /api/facts?page=3&per_page=20&sort=alphabetic
    - Get all cat facts **paginated and sorted by length ascending** at /api/facts?page=3&per_page=20&sort=length_ascending
    - Get all cat facts paginated and in **reverse alphabetic order** at /api/facts?page=3&per_page=20&sort=reverse_alphabetic
    - Get all cat facts paginated and sorted by length **descending** at /api/facts?page=3&per_page=20&sort=length_descending
    - get all cat facts **filtered by a certain length** at /api/facts?length_filter=60

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the instructions.

