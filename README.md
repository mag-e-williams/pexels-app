This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### First, Add your API KEY

Create a `.env` file on the top level of the directory and add your Pexels API key as an `API_KEY` variable

### Then, install all depenencies:

```bash
npm install
```

### Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Task Checklist

As a user visiting the website...

- [x] I can see an initial set of curated photos on the home screen
- [x] I am able to access the the photographerʼs name and url if those details are available for every photo
- [x] I can paginate the list of curated photos
- [x] I can use a text input to search for photos Iʼm interested
- [x] I can see the results of my search in the photo viewing area
- [x] I can paginate search results if needed
- [x] I should not be shown the "previous" pagination button when there is no previous page
- [x] I can refresh my browser and retain my search query and/or page

As a developer working on the project locally...

- [x] I have access to all project-specific local setup instructions I need to run the project
- [x] I can install any required dependencies with npm or yarn
- [x] I can compile and run the project in one step
