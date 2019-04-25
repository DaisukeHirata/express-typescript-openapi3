import * as jsonapiSerializer from "jsonapi-serializer";

const testCinemaPremieresById = {
  id: "588ac3a02d029a6d15d0b5c4",
  name: "Plaza Morelia",
  movies: [
    {
      id: "1",
      title: "Assasins Creed",
      runtime: 115,
      plot: "Lorem ipsum dolor sit amet",
      poster: "link to poster..."
    },
    {
      id: "2",
      title: "Aliados",
      runtime: 124,
      plot: "Lorem ipsum dolor sit amet",
      poster: "link to poster..."
    },
    {
      id: "3",
      title: "xXx: Reactivado",
      runtime: 107,
      plot: "Lorem ipsum dolor sit amet",
      poster: "link to poster..."
    }
  ]
};

const json2 = new jsonapiSerializer.Serializer("cinemaPremieresById", {
  attributes: ["name", "movies"],
  movies: {
    ref: (cinema, movie) => {
      return movie.id;
    },
    attributes: ["title", "runtime", "plot", "poster"]
  },
  typeForAttribute: (attribute, record) => {
    return (record && record.type) ? record.type : attribute;
  }
}).serialize(testCinemaPremieresById);

console.log(JSON.stringify(json2));

const testSchedulesMovie = [
  {
    id: "588ac3a02d029a6d15d0b5c4",
    name: "Plaza Morelia",
    movie: {
      id: "1",
      title: "Assasins Creed"
    },
    rooms: [
      {
        id: "688ac3a02d029a6d15d0b5c6",
        name: "2.0",
        capacity: 100,
        schedules: [
          {
            time: "10:15",
            price: 100
          },
          {
            time: "11:15",
            price: 200
          }
        ]
      },
      {
        id: "688ac3a02d029a6d15d0b5c7",
        name: "3.0",
        capacity: 90,
        schedules: [
          {
            time: "12:15",
            price: 300
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
    attributes: ["title"]
  },
  rooms: {
    ref: (cinema, rooms) => {
      return rooms.id;
    },
    attributes: ["name", "schedules"]
  },
  typeForAttribute: (attribute, record) => {
    if (attribute === "movie") { return "movies"; }
    return (record && record.type) ? record.type : attribute;
  }
}).serialize(testSchedulesMovie);

console.log(JSON.stringify(json));
