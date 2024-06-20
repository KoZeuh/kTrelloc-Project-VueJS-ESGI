<h1 align="center"> kTrelloc </h1> <br>
<p align="center">
  <a href="https://gitpoint.co/">
    <img alt="GitPoint" title="GitPoint" src="logo.gif" width="450">
  </a>
</p>

<p align="center">
  A Trello-like project management tool built with VueJS3, TailwindCSS, Vite 5.0, Express, Prisma, and TypeScript.<br>
  This project is equipped with a translation system and is available in 6 languages.
</p>

<p align="center">
  <a href="#">
    <img alt="Download on the App Store" title="App Store" src="http://i.imgur.com/0n2zqHD.png" width="140">
  </a>

  <a href="#">
    <img alt="Get it on Google Play" title="Google Play" src="http://i.imgur.com/mtGRPuM.png" width="140">
  </a>
</p>

## Table of Contents

- [Introduction](#introduction)
- [Previews](#previews)
- [Features](#features)
- [Feedback](#feedback)
- [Contributors](#contributors)
- [Build Process](#build-process)

## Introduction

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](./CONTRIBUTORS.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Gitter chat](https://img.shields.io/badge/chat-on_gitter-008080.svg?style=flat-square)](https://gitter.im/kELaptop-Laravel-ESGI)

kTrello is a Trello-like project management tool built with VueJS3, Express, Prisma, and TypeScript. It allows users to create boards, lists, and cards to organize their tasks and projects.

## Previews

<details>
  <summary><strong>➡️ View</strong></summary>
  <br/>
  <img align="left" src="previews/home_and_login.PNG" width="280" target="_blank"/>
  <img src="previews/signup.PNG" width="280" target="_blank"/>
  <br/>
  <img align="left" src="previews/settings_view.PNG" width="280" target="_blank"/>
  <img src="previews/dashboard.PNG" width="280" target="_blank"/>
  <br/>
  <img align="left" src="previews/board_view.PNG" width="280" target="_blank"/>
  <img src="previews/card_view.PNG" width="280" target="_blank"/>
</details>

## Features

A few of the things you can do with kTrelloc :

### Website 🌐

* Create, edit, and delete boards, lists, and cards.
* Add members to boards by defining their roles. (User or Administrator)
* Add comments/checklists/attachments to cards.
* Assign members to cards.
* Add tags to cards.

## Feedback

Feel free to send us feedback -> [file an issue](https://github.com/KoZeuh/kTrelloc-Project-VueJS-ESGI/issues/new). Feature requests are always welcome. If you wish to contribute, please take a quick look at the [guidelines](./CONTRIBUTING.md)!

## Contributors

[@KoZeuh](https://github.com/KoZeuh)

## Build Process

- Clone or download the repository.
- Create a MySQL database named `ktrelloc` with the InnoDB storage engine.
- The database connection is configured in `backend/.env`.

**In the frontend folder:**

- Run `npm install` or `yarn install` to install dependencies.
- Run `npm run dev` or `yarn run dev` to start the user interface in development mode.
  
**In the backend folder:**

- Run `npm install` or `yarn install` to install dependencies.
- Run `npx prisma migrate dev` to perform a database migration.
- Run `npm run dev` or `yarn run dev` to start the server in development mode.

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


