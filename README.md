# SoarView

<p align="center">
    <img src="#" alt="SoarView" />
</p>

## What is SoarView?
[SoarView](https://soarview.herokuapp.com) is an application for glider pilots to upload, review and share flights they've recorded on a GPS. It is built on React and Redux in the frontend and Flask in the backend on top of a PostgreSQL database.

## Links
* [Live Application](https://soarview.herokuapp.com)
* [Application Wiki](https://github.com/guipace/SoarView/wiki)

## Primary Languages
* JavaScript
* Python
* HTML5
* CSS3

## Technologies
* React.js
* Redux
* Flask
* SQLAlchemy
* Alembic
* PostgreSQL
* [TailwindCSS](https://tailwindcss.com)
<!-- * [OpenCageData](https://opencagedata.com)
* [Leaflet](https://leafletjs.com)
* [React Leaflet](https://react-leaflet.js.org) -->

## Developing

### What you'll need on your machine:

* PostgreSQL
* Pipenv with Python v3.8
* Node.js

1. `git clone` this repo
2. `cd` into the local repo
3. Run `pipenv install -r --dev dev-requirements.txt && pipenv install -r requirements.txt`
4. Create your own `.env` file based on the provided `.env.example`.
5. Create a user and database in your PostgreSQL that matches your `.env` configuration
6. In the first terminal, run `pipenv shell` to activate the Pipenv environment.
7. Run `flask db upgrade` and then `flask seed all` to apply migrations and seed data to your database.
8. Open another terminal window and `cd` into the local repo, then `cd` into `react-app`
9. Run `npm install`
10. In your terminal running Pipenv shell, run `flask run`.
11. In your terminal in the `react-app`, run `npm start`.
12. Your app should open in your default browser.
13. If you are planning on developing, please make a fork and create pull requests as necessary.

## Challenges

## Code Snippets
