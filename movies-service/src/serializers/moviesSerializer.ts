import * as jsonapiSerializer from "jsonapi-serializer";

const attr = ["title", "genre", "runtime", "format", "plot", "plot_ja", "plot_cn", "released_at", "created_at", "updated_at"];

export const movieSerializer = new jsonapiSerializer.Serializer("movies", {
  attributes: attr
});

export const moviePagerSerializer = (url: string, movies: any[], pageSize: number) => {
  return new jsonapiSerializer.Serializer("movies", {
    topLevelLinks: {
      self: `${url}?page[size]=${pageSize}`,
      prev: `${url}?page[before]=${movies[0].created_at}&page[size]=${pageSize}`,
      next: `${url}?page[after]=${movies.slice(-1)[0].created_at}&page[size]=${pageSize}`
    },
    attributes: attr
  });
};
