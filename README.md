<div align="center">

![pro-readme-title-2](https://github.com/xyflow/pro-platform/assets/9868315/95a25241-fc25-4cc2-9caa-d2007de53bfe)

![GitHub License MIT](https://img.shields.io/github/license/wbkd/react-flow?color=%23ff0072)

The React Flow Pro platform allows subscribers to access advanced code examples and direct contact to the xyflow team.<br/>
Built with [Nextjs](https://nextjs.org/), [Nhost](https://nhost.io/), [Stripe](https://stripe.com) and [shadcn/ui](https://ui.shadcn.com/).

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

## Development

These are the steps needed to setup and run the platform on your machine.

#### Nextjs App

The frontend of the platform is built with [Nextjs](https://nextjs.org/). To run the frontend, you need to install the dependencies and start the development server:

```sh
pnpm install
```

```sh
pnpm run dev
```

This will start a webserver at [http://localhost:3000](http://localhost:3000) where you can see the app.

#### Nhost Backend

The database, user management and authentication is built with [Nhost](https://nhost.io/). To run the backend locally, you need to have [the Nhost cli](https://docs.nhost.io/development/cli/getting-started) installed. The backend is located in the `/nhost` directory.

```sh
cd nhost
```

```sh
pnpm run dev
```

#### Stripe Webhook

For being able to test the Stripe integration locally, you need to listen to Stripe events that change the subscription data in our database. This webhook listener can be started by running the following command in the `/nhost` dir:

```sh
pnpm run stripe-webhook
```

#### Pro Examples

If a newly published pro example does not appear in the list you might need to call https://pro.reactflow.dev/api/revalidate?path=/examples&tag=examples manually.

## Feedback and Contributing

The Pro Platform was not initially developed to be plug-and-play for other developers. If you would like to use this platform as a starting point for your own open source project, we'd love to hear about it. Send us an email at info@xyflow.com
