import "mocha";
import * as jsonapiSerializer from "jsonapi-serializer";

describe("Links inside data", () => {
  it("just run serializer to see input", () => {
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
  });

  it("just run serializer to see input2", () => {
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

    const json2 = new jsonapiSerializer.Serializer("cinemaMovieSchedules", {
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
    console.log(JSON.stringify(json2));
  });

  it("just run deserializer to see output", () => {
    const linksTest = {
      data: {
        type: "users",
        attributes: { "first-name": "Sandro", "last-name": "Munda" }
      },
      links: {
        self: "/articles/1/relationships/tags",
        related: "/articles/1/tags"
      }
    };

    const desLinks = async () => {
      const des = new jsonapiSerializer.Deserializer();
      const ret = await des.deserialize(linksTest);
      console.log(ret);
      return ret;
    };

    console.log(desLinks());
  });

  it("just run deserializer to see output", () => {
    const dataSet = [{
      id: "54735750e16638ba1eee59cb",
      firstName: "Sandro",
      lastName: "Munda"
    }, {
      id: "5490212e69e49d0c4f9fc6b4",
      firstName: "Lawrence",
      lastName: "Bennett"
    }];

    const json2 = new jsonapiSerializer.Serializer("users", {
      topLevelLinks: {
        self: "http://localhost:3000/api/users?page[after]=last-created-at&page[size]=1",
        prev: "http://localhost:3000/api/users?page[before]=2&page[size]=1",
        next: "http://localhost:3000/api/users?"
      },
      dataLinks: {
        self: "http://localhost:3000/api/datalinks"
      },
      attributes: ["firstName", "lastName"]
    }).serialize(dataSet);

    console.log(JSON.stringify(json2));
  });
});
