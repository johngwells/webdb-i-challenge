const express = require('express');
const knex = require('knex')

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  db
    .select('*')
    .from('accounts')
    .then(account => res.status(200).json(account))
    .catch(err => res.status(500).json({ error: 'Failed to retrieve accounts'}))
});

// Add new record to db
server.post('/', (req, res) => {
  db
    .insert(req.body, 'id')
    .into('accounts')
    .then(record => res.status(200).json(record))
    .catch(err => console.log().json({ error: 'Failed to add record to database' }));
})


// update record to db
server.put('/:id', (req, res) => {
  const params = req.body;

  db('accounts')
    .where({ id: req.params.id })
    .update(params)
    .then(account => {
      res.status(200).json(account);
    })
    .catch(err => console.console.log().json({ error: 'Failed to update account record' }));
});

module.exports = server;