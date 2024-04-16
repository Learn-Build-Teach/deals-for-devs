# Deals for Devs

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

**The best deals and giveaways for developers**

Get upcoming and ongoing deals sent straight to your inbox every month!

## Getting Started

To get a development environment running on your local machine:

1. Clone the repository in a directory of your choice.

2. Create a `.env` file (from `.env.example`) and add all the credentials necessary to run the app.

> To get those credentials, please send James (@jamesqquick) a message on Discord!

```bash
cp .env.example .env
```

3. Install packages

```bash
npm install
```

4. Database Setup
   You'll need to create a free database with [Xata](https://xata.io/) which runs on Postgres. When you create your db, make sure enable the checkbox that says `Enable direct access to Postgres`.

> Since we'll be using Prisma to interact with our database, you need to `Enable direct access to Postgres`.

Then, select your newly created database. On the next page, you'll want to copy the `PostgreSQL endpoint` property. Then add this property to your `.env` file like so.

> You'll need to also create an API Key to include in this DB URL. You can do this in your `account settings`.

```bash
DATABASE_URL=<your_postgresql endpoint>
```

> You can click on the `Settings` tab later on if you ever need to come back to these settings.

Now, you'll need to push the Prisma schema to your db. In your terminal, run the following command. This will generated the necessary tables.

```bash
npx prisma db push
```

You should be able to verify the tables were created successfully inside of the Xata dashboard.

Lastly, you'll need to generate the Xata configuration and typings in your project.

Login to your Xata account. This will pop open a new browser window to handle authentication.

```bash
xata auth login
```

Initialize xata in your project directory.

```bash
xata init
```

Choose the database and the default settings from there.

5. Run the development server.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Xata](https://xata.io/)
- [Sentry](https://sentry.io/)
- [Clerk](https://clerk.com/)

## Contributing

You are welcome to contribute by opening issues or PRs!

Be sure to check out our [Contribution Guide](https://github.com/Learn-Build-Teach/deals-for-devs/blob/main/.github/contributing.md).
Also, you can join our project channel on the [Learn Build Teach Discord](https://www.learnbuildteach.com/)
by messaging James (@jamesqquick) on Discord for access.

> [!IMPORTANT]
> All PRs should target `dev` as the base branch.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.chrisnowicki.io"><img src="https://avatars.githubusercontent.com/u/102450568?v=4?s=100" width="100px;" alt="Chris Nowicki"/><br /><sub><b>Chris Nowicki</b></sub></a><br /><a href="https://github.com/Learn-Build-Teach/deals-for-devs/commits?author=chris-nowicki" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://wipdev.netlify.app"><img src="https://avatars.githubusercontent.com/u/140237026?v=4?s=100" width="100px;" alt="Waseem Medhat"/><br /><sub><b>Waseem Medhat</b></sub></a><br /><a href="https://github.com/Learn-Build-Teach/deals-for-devs/commits?author=wipdev-tech" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/klae32"><img src="https://avatars.githubusercontent.com/u/26855871?v=4?s=100" width="100px;" alt="klae32"/><br /><sub><b>klae32</b></sub></a><br /><a href="https://github.com/Learn-Build-Teach/deals-for-devs/commits?author=klae32" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.edwinboon.dev"><img src="https://avatars.githubusercontent.com/u/117263901?v=4?s=100" width="100px;" alt="Edwin Boon"/><br /><sub><b>Edwin Boon</b></sub></a><br /><a href="https://github.com/Learn-Build-Teach/deals-for-devs/commits?author=brwmaster" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/BryanF1nes"><img src="https://avatars.githubusercontent.com/u/49371751?v=4?s=100" width="100px;" alt="Bryan Fines"/><br /><sub><b>Bryan Fines</b></sub></a><br /><a href="https://github.com/Learn-Build-Teach/deals-for-devs/commits?author=BryanF1nes" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://elliezub.com"><img src="https://avatars.githubusercontent.com/u/112726692?v=4?s=100" width="100px;" alt="Ellie"/><br /><sub><b>Ellie</b></sub></a><br /><a href="https://github.com/Learn-Build-Teach/deals-for-devs/commits?author=elliezub" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.biodrop.io/CBID2"><img src="https://avatars.githubusercontent.com/u/105683440?v=4?s=100" width="100px;" alt="Christine Belzie"/><br /><sub><b>Christine Belzie</b></sub></a><br /><a href="https://github.com/Learn-Build-Teach/deals-for-devs/commits?author=CBID2" title="Code">💻</a> <a href="https://github.com/Learn-Build-Teach/deals-for-devs/commits?author=CBID2" title="Documentation">📖</a> <a href="#a11y-CBID2" title="Accessibility">️️️️♿️</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
