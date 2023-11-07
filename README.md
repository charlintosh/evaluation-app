# Evalutation App

![Evaluation Dashboard](https://res.cloudinary.com/charlintosh/image/upload/v1699379568/xxc5jao8pgzkj7vdxbki.png "Evaluation Dashboard")

First, create your `.env.local` file.

```text
MONGODB_URI=<mongo-connection-string>/EvaluationDB
NEXT_PUBLIC_APP_URL=http://localhost:3000
CLOUDINARY_NAME=<your-name>
CLOUDINARY_API_SECRET=<your-cloudinary-secret>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-secret>
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


