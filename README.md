# SoarView

<p align="center">
    <img src="https://user-images.githubusercontent.com/63423828/113918339-eb6c2d80-97a7-11eb-999c-63a2e039b0ea.gif" alt="SoarView" />
</p>

## What is SoarView?
[SoarView](https://soarview.herokuapp.com) is a full-stack web application for glider pilots to upload, review and share flights they've recorded on a GPS. It is inspired on [OLC](www.onlinecontest.org). For more information on the world of soaring visit [The Soaring Society of America](www.ssa.org).

## Links
* [Live Application](https://soarview.herokuapp.com)
* [Application Wiki](https://github.com/guipace/SoarView/wiki)

## Primary Languages
* JavaScript
* Python
* HTML5
* CSS3
* SQL

## Technologies Implemented
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Node.js](https://nodejs.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [Flask](https://palletsprojects.com/p/flask/)
* [SQLAlchemy](https://www.sqlalchemy.org/)
* [Alembic](https://alembic.sqlalchemy.org/)
* [OpenLayers](https://openlayers.org/)
* [Chart.js](https://www.chartjs.org/)
* [WTForms](https://wtforms.readthedocs.io/en/2.3.x/)
* [Amazon Web Services S3](https://aws.amazon.com/s3/)
* [Docker](https://www.docker.com/)
* [FontAwesome](https://fontawesome.com/)
* [TailwindCSS](https://tailwindcss.com)
* [Heroku](https://heroku.com/)

## Developing
Below are instructions to run the application on a local development environment.

### Pre-installed requirements:
* Python v3.8
* PostgreSQL
* Pipenv
* Node.js

### Instructions:
1. Clone this repository: `git clone https://github.com/guipace/SoarView.git`
2. Change directory: `cd SoarView`
3. Create python environment & install dependencies: `pipenv install -r --dev dev-requirements.txt && pipenv install -r requirements.txt`
4. Create your own environment variables files (`.env`) based on the provided examples (`.env.example`) in the project's root directory and react-app directory.
5. Create a user and database in your PostgreSQL that matches your environment variables configuration.
6. In a terminal activate the Pipenv environment: `pipenv shell`
7. Apply migrations to the database: `flask db upgrade`
8. Seed the database: `flask seed all`
9. In another terminal, change directories into the react-app directory: `cd react-app`
10. Install node modules: `npm install`
11. Run backend application in first terminal: `flask run`
12. Run the frontend application in second terminal: `npm start`
13. Your app should open in your default browser.

## Challenges

## Code Snippets
