# React Flow Platform

Our platform for managing React Flow Pro subscriptions. Built with [nextjs](https://nextjs.org/), [nhost](https://nhost.io/) and [stripe](https://stripe.com).

## Development

These are the steps needed to setup and run the platform on your machine.

1. NextJS App

The frontend of the platform is built with [nextjs](https://nextjs.org/). To run the frontend, you need to install the dependencies and start the development server:

```sh
pnpm install
```

```sh
pnpm run dev
```

This will start a webserver at [http://localhost:3000](http://localhost:3000) where you can see the app.

2. Nhost Backend

The database, user management and authentication is built with [nhost](https://nhost.io/). To run the backend locally, you need to have [the nhost cli](https://docs.nhost.io/cli) installed. The backend is located in the `/nhost` directory.

```sh
cd nhost
```

```sh
pnpm run dev
```

3. Stripe Webhook

For being able to test the stripe integration locally, you need to listen to stripe events that change the subscription data in our database. This webhook listener can be started by running the following command in the `/nhost` dir:

```sh
pnpm run stripe-webhook
```
