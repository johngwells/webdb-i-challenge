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
})

module.exports = server;