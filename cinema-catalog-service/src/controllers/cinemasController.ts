import { Request, Response } from "express";
import * as P from "bluebird";
import { cinemaSerializer, cinemaPremieresByIdSerializer, cinemaSchedulesSerializer } from "../serializers/cinemasSerializer";
import { ICinemaRepository } from "../inversify/interfaces";
// import { TDebug } from "../log";
// const debug = new TDebug("app:src:controllers:cinemas");

export class CinemasController {
  private repo: ICinemaRepository;

  constructor(repo: ICinemaRepository) {
    this.repo = repo;
  }

  public async getCinemasByCity(req: Request, res: Response): P<any> {
    const id = req.swagger.params.city_id.value;
    const cinemas = await this.repo.getCinemasByCity(id);

    if (cinemas.length === 0) {
      res.status(404).send({
        message: "Sorry, can not find that!!"
      });
      return;
    }

    const serializedCinemas = cinemaSerializer.serialize(cinemas);
    res.send(serializedCinemas);
  }

  public async getCinemaById(req: Request, res: Response): P<any> {
    const cinemaId = req.swagger.params.cinema_id.value;
    const cinema = await this.repo.getCinemaById(cinemaId).catch((err) => {
      res.status(err.statusCode).send({ message: err.message });
      return;
    });

    if (cinema.movies.length === 0) {
      res.status(404).send({
        message: "Sorry, can not find that!!"
      });
      return;
    }

    const serializedCinemaPremieres = cinemaPremieresByIdSerializer.serialize(cinema);
    res.send(serializedCinemaPremieres);
  }

  public async getCinemaScheduleByMovie(req: Request, res: Response): P<any> {
    const cinemaId = req.swagger.params.cinema_id.value;
    const movieId = req.swagger.params.movie_id.value;
    const cinemaSchedule = await this.repo.getCinemaScheduleByMovie(cinemaId, movieId).catch((err) => {
      res.status(err.statusCode).send({ message: err.message });
      return;
    });

    if (cinemaSchedule.length === 0) {
      res.status(404).send({
        message: "Sorry, can not find that!!"
      });
      return;
    }

    const serializedCinemaSchedules = cinemaSchedulesSerializer.serialize(cinemaSchedule);
    res.send(serializedCinemaSchedules);
  }

  public async ingestAllCinemasToES(req: Request, res: Response): P<any> {
    await this.repo.ingestAllCinemasToES();
    res.send({"msg": "done"});
  }

  public async sendTestDataToEs(req: Request, res: Response): P<any> {
    // test filebeat and ingest Node pipeline
    const log = require("../log").default;
    log.ingest(JSON.stringify({
      id: "1b1252c8d280",
      abc: "Outgoing",
      def: "furafura",
      deleted_at: true
    }));
    res.send({"msg": "done"});
  }
}
