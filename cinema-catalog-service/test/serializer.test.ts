import * as jsonapiSerializer from "jsonapi-serializer";

const dataSet = {
  id: "1",
  firstName: 'Sandro',
  lastName: 'Munda',
  address: [{
    id: '2',
    type: 'home',
    street: 'Dogwood Way',
    zip: '12345'
  },{
    id: '3',
    type: 'work',
    street: 'Dogwood Way',
    zip: '12345'
  }]
};

const testCinemaId = {
  '_id': '588ac3a02d029a6d15d0b5c4',
  'name': 'Plaza Morelia',
  'cinemaPremieres': [
    {
      'id': '1',
      'title': 'Assasins Creed',
      'runtime': 115,
      'plot': 'Lorem ipsum dolor sit amet',
      'poster': 'link to poster...'
    },
    {
      'id': '2',
      'title': 'Aliados',
      'runtime': 124,
      'plot': 'Lorem ipsum dolor sit amet',
      'poster': 'link to poster...'
    },
    {
      'id': '3',
      'title': 'xXx: Reactivado',
      'runtime': 107,
      'plot': 'Lorem ipsum dolor sit amet',
      'poster': 'link to poster...'
    }
  ]
};

const testSchedulesMovie = [
  {
    "id": "588ac3a02d029a6d15d0b5c4",
    "name": "Plaza Morelia",
    "movie": {
      "id": "1",
      "name": "Assasins Creed"
    },
    "rooms": [
      {
        "id": "688ac3a02d029a6d15d0b5c6",
        "name": "2.0",
        "capacity": 100,
        "schedules": [
          {
            "time": "10:15",
            "price": "100"
          },
          {
            "time": "11:15",
            "price": "200"
          }
        ]
      },
      {
        "id": "688ac3a02d029a6d15d0b5c7",
        "name": "3.0",
        "capacity": 90,
        "schedules": [
          {
            "time": "12:15",
            "price": "300"
          }
        ]
      }
    ]
  }
];

const json = new jsonapiSerializer.Serializer("cinemaMovieSchedules", {
  attributes: ["name", "movie", "rooms"],
  movie: {
    ref: (cinema, movie) => {
      return movie.id;
    },
    attributes: ["name"]
  },
  rooms: {
    ref: (cinema, rooms) => {
      return rooms.id;
    },
    attributes: ["name", "schedules"]
  },
  typeForAttribute: (attribute, record) => {
    return (record && record.type) ? record.type : attribute;
  }
}).serialize(testSchedulesMovie);

console.log(JSON.stringify(json));
