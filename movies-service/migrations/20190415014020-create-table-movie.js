'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  db.createTable("movie", {
    id: {type: "string", primaryKey: true},
    title: "string",
    genre: "string",
    runtime: "int",
    format: "string",
    plot: "string",
    released_at: "datetime",
    created_at: "datetime",
    updated_at: "datetime"
  }, (err) => {
    if (!err) {
      db.addIndex("movie", "movie_created_at_idx", ["created_at"]);
    } else {
      console.log(err);
    }
  })
  return null;
};

exports.down = function(db) {
  db.dropTable("movie");
  return null;
};

exports._meta = {
  "version": 1
};
