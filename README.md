<div align="center">

![pro-readme-title-2](https://github.com/xyflow/pro-platform/assets/9868315/95a25241-fc25-4cc2-9caa-d2007de53bfe)

![GitHub License MIT](https://img.shields.io/github/license/wbkd/react-flow?color=%23ff0072)

The React Flow Pro platform allows subscribers to access advanced code examples and direct contact to the xyflow team.<br/>
Built with [nextjs](https://nextjs.org/), [nhost](https://nhost.io/) and [stripe](https://stripe.com).

</div>

## Features

- ✨ Preview and download code examples from a private Github repository
- 📬 Add and delete team members
- 💸 New Stripe subscription, upgrade, and cancel
- 👤 Manage account details (email, password, delete account)

## Open Source

We've been funding the development of React Flow and Svelte Flow through the Pro Platform since 2022. We refactored the entire platform in 2023 and made it open source.

- [Why we refactored and open sourced the Pro Platform](https://xyflow.com/blog/react-flow-pro-platform-open-source)
- [How we fund our open source libraries](https://xyflow.com/open-source)

## Feedback and Contributing

The Pro Platform was not initially developed to be plug-and-play for other developers. If you would like to use this platform as a starting point for your own open source project, we'd love to hear about it. Send us an email at info@xyflow.com

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
