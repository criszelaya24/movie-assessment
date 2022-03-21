# MovieDB Assesment
    Backend from movie-assessment, The goal is to connect to a movie API and return all the details related to the current streamed movies. As an extra mile movies will be listed by your IP location.

# External movie API
    https://developers.themoviedb.org/3/movies/get-now-playing
**To connect you will need a valid api-key.** 🧨

# Run Locally
If you want to setup locally this server, you need the following.

    - Nodejs
    - npm
    - Mongo database
    - A client to test it

Fill out the .env.example and rename it to .env then, start the server, run from the terminal:

    - npm run install
    - npm run start

# Postman Collection
    https://www.getpostman.com/collections/9d9fc1aeda4fe200f6c6

# User stories
```
As a guest user,
So I can list all recently streamed movies,
I would like to be able get register

As a valid user,
So I can list all recently streamed movies,
I would like to be able login

As a valid user,
So I can have secure my account,
I would like to be able logout.

As a valid user,
So I can check all the recent movies from my country,
I would like to be able to list recent streamed movies.

As a valid user,
So I can have a list of favorite movies,
I would like to be able to save a movie.

As a valid user,
So I can check a list of favorite movies,
I would like to be able to list them.

As a valid user,
So I can have control of favorite movies,
I would like to be able to delete a movie from favorite.

```