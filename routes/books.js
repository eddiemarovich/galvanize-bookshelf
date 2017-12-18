'use strict';

const express = require('express');
const knex = require('../knex')
// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/books', function(req, res, next) {
  return knex('books').orderBy('title', 'asc')
    .select('id AS id', 'title AS title', 'author AS author', 'genre AS genre', 'description AS description', 'cover_url AS coverUrl', 'created_at AS createdAt', 'updated_at AS updatedAt')
    .then(data => {
      res.status(200).json(data)
    })
})

router.get('/books/:id', (req, res, next) => {
  const id = req.params.id
  return knex('books')
    .where({id})
    .first()
    .select('id AS id', 'title AS title', 'author AS author', 'genre AS genre', 'description AS description', 'cover_url AS coverUrl', 'created_at AS createdAt', 'updated_at AS updatedAt')
    .then(data => {
      res.status(200).json(data)
    })
})

router.post('/books', (req, res, next) => {
  // const {title, author, genre, description, cover_url} = req.body
  // const newBook = {title, author, genre, description, cover_url}
  return knex('books')
  .insert({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
    })
  .returning(['title', 'author', 'genre', 'cover_url AS coverUrl', 'description', 'id'])
  .then(data => {
    res.status(200).json(data[0])
  })
})

router.patch('/books/:id', (req, res, next) => {
  return knex('books')
  .update({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    description: req.body.description,
    cover_url: req.body.coverUrl
    })
  .returning(['title', 'author', 'genre', 'cover_url AS coverUrl', 'description', 'id'])
  .then(data => {
    res.status(200).json(data[0])
  })
})

router.delete('/books/:id', (req, res, next) => {
  return knex('books')
  .where('id', req.params.id)
  .del()
  .returning(['title', 'author','genre', 'cover_url AS coverUrl', 'created_at AS createdAt', 'description'])
  .then(data => res.status(200).send(data[0]))
})

// YOUR CODE HERE


module.exports = router;
