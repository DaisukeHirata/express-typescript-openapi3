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
  db.createTable("country", {
    id: {type: "string", primaryKey: true},
    name: {type: "string", notNull: true}
  });
  db.createTable("state", {
    id: {type: "string", primaryKey: true},
    name: {type: "string", notNull: true},
    country_id: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'state_country_id_fk',
        table: 'country',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  });
  db.createTable("city", {
    id: {type: "string", primaryKey: true},
    name: {type: "string", notNull: true},
    state_id: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'city_state_id_fk',
        table: 'state',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  });
  db.createTable("cinema", {
    id: {type: "string", primaryKey: true},
    name: {type: "string", notNull: true},
    latitude: {type: "real", notNull: true},
    longitude: {type: "real", notNull: true},
    city_id: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'cinema_city_id_fk',
        table: 'city',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  });
  db.createTable("cinemaPremiere", {
    id: {type: "string", primaryKey: true},
    movie_id: { type: 'string', notNull: true},
    cinema_id: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'cinemaPremiere_cinema_id_fk',
        table: 'cinema',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  });  
  db.createTable("cinemaRoom", {
    id: {type: "string", primaryKey: true},
    name: {type: "string", notNull: true},
    capacity: {type: "int", unsigned: true, notNull: true},
    format: {type: "string"},
    cinema_id: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'cinemaRoom_cinema_id_fk',
        table: 'cinema',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  });
  db.createTable("schedule", {
    id: {type: "string", primaryKey: true},
    time: {type: "string", notNull: true},
    price: {type: "real", unsigned: true, notNull: true},
    movie_id: { type: 'string', notNull: true},
    cinemaRoom_id: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'schedule_cinemaRoom_id_fk',
        table: 'cinemaRoom',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  });
  db.createTable("emptySeat", {
    id: {type: "string", primaryKey: true},
    seat_number: {type: "string", notNull: true},
    schedule_id: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'emptySeat_schedule_id_fk',
        table: 'schedule',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  });
  db.createTable("occupiedSeat", {
    id: {type: "string", primaryKey: true},
    seat_number: {type: "string", notNull: true},
    schedule_id: {
      type: 'string',
      notNull: true,
      foreignKey: {
        name: 'occupiedSeat_schedule_id_fk',
        table: 'schedule',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    }
  });  
  return null;
};

exports.down = function(db) {
  db.dropTable("country");
  db.dropTable("state");
  db.dropTable("city");
  db.dropTable("cinema");
  db.dropTable("cinemaRoom");
  db.dropTable("schedule");
  db.dropTable("seat");
  return null;
};

exports._meta = {
  "version": 1
};
