# Deals for Devs

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

An application to send upcoming and ongoing deals straight to your inbox every month!

## Getting Started

To get a development environment running on your local machine:

1. Clone the repository in a directory of your choice.

2. Create a `.env` file (from `.env.example`) and add all the credentials necessary to run the app.

> To get those credentials, please send James (@jamesqquick) a message on Discord!

```bash
cp .env.example .env
```

### Install packages

```bash
npm install
```

### Database Setup

To get started, you'll need to create a **free** account with [Xata](https://xata.io/).

Xata runs on PostgreSQL, but to get access to the PostgreSQL layer, youll need to enable this in your workspace settings. Find your workspace settings and toggle to enable `Direct Access to PostgreSQL (BETA)`.

Now, you'll need to create a new database. Give it a name, and make sure to enable the checkbox that says `Enable direct access to PostgreSQL`.

If this is your first db, you'll be prompted to create an API key and `Select a platform`. Make sure to copy your API key. You can then skip the platform section.

Open your database settings and copy the `PostgreSQL endpoint` property. You'll need to replace `<YOUR_API_KEY>` with a new API key. If you haven't already done so, you can create your API key in your `Account Settings` which can be found in the dropdown menu on your profile icon in the top right corner of the dashboard. Your endpoint will look like this.

`postgresql://l5kbra:<YOUR_API_KEY>@us-east-1.sql.xata.sh/<DB_NAME>:main?sslmode=require`

> Xata uses branches to create multiple instance of a database. The default branch is `main`. These onboarding steps will assume you are using this default `main` branch. Learn more about [Xata branching](https://xata.io/branching).

Update the `DATABASE_URL` environment variable in your `.env` file. Make sure to replace `<YOUR_API_KEY>` with the API key you just created.

```bash
DATABASE_URL=postgresql://l5kbra:<YOUR_API_KEY>@us-east-1.sql.xata.sh/<DB_NAME>:main?sslmode=require
```

### Generate DB Tables Using Prisma

Now, you'll need to push the Prisma schema to your db. In your terminal, run the following command. This will generate the necessary tables in your Xata db.

```bash
npx prisma db push
```

You should be able to verify the tables were created successfully inside of the Xata dashboard.

![CleanShot 2024-05-08 at 09 18 14](https://github.com/Learn-Build-Teach/deals-for-devs/assets/5391915/32641b1f-fb10-4da4-b462-20c90bb8e077)

Unfortunately, the `image` column in the `DealImage` table that is generated from Prisma will not be the correct format. You'll need to delete that column and recreate as a `file` type. Make sure to deselect `Allow multiple files` and select `Make files public by default`.

![CleanShot 2024-06-13 at 10 12 05](https://github.com/Learn-Build-Teach/deals-for-devs/assets/5391915/f80f540e-4352-4238-9d6a-6865c018ca26)


### Connect Project To Xata Using the Xata CLI

In this project, we'll be connecting to our db in two different ways: using Prisma ORM and the Xata client SDK. All standard CRUD (Create, read, update, and delete) db interactions will be run through Prisma. We'll use the Xata client to take advantage of Xata specific features like search and file uploads.

You'll need to generate the Xata configuration and typings in your project. To do this, you'll use the Xata CLI. This should have been installed during the `npm install`. If you have issues, you can manually install like so:

```bash
npm install @xata.io/cli
```

Log in to your Xata account by running the follwing command. This will pop open a new browser window to handle authentication.

```bash
xata auth login
```

If you run into an issue `xata command not found` you may have a permissions error that prevented you from installing the xata cli. Either run:

```bash
sudo npm install
```

or install the cli manually

```bash
sudo npm install -g @xata.io/cli@latest
```

Initialize xata in your project directory with the following command.

```bash
xata init
```

Choose your newly created database. Then, choose `TypeScript` for the `Generate code and types from your Xata database` option. Lastly, choose the default of `src/xata.ts` for the output path of the generated code.

### Run the development server.

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
