require('babel-register');

var express = require('express');
var graphqlHTTP = require('express-graphql');
var schema = require('./benchmark/schema').schema;
var app = express();

/**
 * HOW TO run the benchmarks:
 *
 * sudo docker-compose up -d postgres
 * sudo docker-compose run benchmark_server node test/benchmark/seed.js
 * sudo docker-compose up -d benchmark_server
 * ab -p test/benchmark/[FILE].json -T application/json -n 500 -c 20 http://localhost:4000/graphql
 */

app.use('/graphql', graphqlHTTP({
  schema,
  formatError: error => {
    console.log(error.stack);
    return {
      message: error.message,
      locations: error.locations,
      stack: error.stack
    };
  }
}));

app.listen(4000, function () {
  console.log('Benchmarking server listening');
});
