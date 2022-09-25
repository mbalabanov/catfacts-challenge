This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Descripion
- This is a REST API using Next.js with TypeScript
    - It integrates with an external catfact API at https://catfact.ninja/
    - This API gets data from https://catfact.ninja/facts and provides it on `localhost:3000/api/...`
    - It uses API routes of Next.js

## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the instructions.

## Endpoints and Parameters

- You can get data from the following API **endpoints**:
    - Get **multiple** cat facts at `localhost:3000/api/facts`
    - Get **individual** cat facts by ID at `localhost:3000/api/fact/15`

- The following **parameters** can be _optionally_ added to the URL `/api/facts` (chaining with `?` and `&`):
  - For pagination:
    - `page=1`
    - `per_page=10`
  - For sorting:
    - `sort=alphabetic`
    - `sort=reverse_alphabetic`
    - `sort=length_ascending`
    - `sort=length_descending`
  - For filtering by length:
    - `length_filter=60`

### Examples:
  - **All** available cat facts unsorted at `/api/facts`
  - **All** available cat facts in **alphabetic order** at `/api/facts?sort=alphabetic`
  - **All** available cat facts **sorted by length ascending** at `/api/facts?sort=length_ascending`
  - Cat facts **paginated** at `/api/facts?page=3&per_page=20`
  - Cat facts paginated and **sorted alphabetically** at `/api/facts?page=3&per_page=20&sort=alphabetic`
  - Cat facts paginated and **sorted by length ascending** at `/api/facts?page=3&per_page=20&sort=length_ascending`
  - Cat facts paginated and in **reverse alphabetic order** at `/api/facts?page=3&per_page=20&sort=reverse_alphabetic`
  - Cat facts paginated and sorted by **length descending** at `/api/facts?page=3&per_page=20&sort=length_descending`
  - Cat facts **filtered by a specific length** at `/api/facts?length_filter=60`

## Building for Production

```bash
npm next build
# or
yarn next build
```

After building:
```bash
npm start
# or
yarn run start
```