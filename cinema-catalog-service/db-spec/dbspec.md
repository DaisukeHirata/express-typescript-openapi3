# posible collections for the cinemas db

## For locations

- countries
- states
- cities

```uml
@startuml erd
title locations
left to right direction

frame "locations" {
  entity "country" {
      + id:string [PK]
      ==
      name:string
  }

  entity "state" {
      + id:string [PK]
      ==
      # country_id [FK]
      name:string
  }

  entity "city" {
      + id:string [PK]
      ==
      # state_id [FK]
      name:string
  }
}

country ---{ state
"state" ---{ city

@enduml
```

## For cinemas

- cinemas
- cinemaPremieres
- cinemaRooms
- schedules
- emptySeat
- occupiedSeat

```uml
@startuml erd
title cinemas
left to right direction

frame "locations" {
  entity "city" {
      + id:string [PK]
      ==
      # state_id [FK]
      name:string
  }
}

frame "cinemas" {
  entity "cinema" {
      + id:string [PK]
      ==
      # city_id [FK]
      name:string
  }

  entity "cinemaPremiere" {
      + id:string [PK]
      ==
      # cinema_id [FK]
      movie_id:id
  }  

  entity "cinemaRoom" {
      + id:string [PK]
      ==
      # cinema_id [FK]
      name:string
      capacity:int
      format:string
  }

  entity "schedule" {
      + id:string [PK]
      ==
      # cinemaRoom_id [FK]
      time:timestamp
      price:real
      movie_id:id
  }

  entity "emptySeat" {
      + id:string [PK]
      ==
      # schedule_id [FK]
      seat_number:string
  }

  entity "occupiedSeat" {
      + id:string [PK]
      ==
      # schedule_id [FK]
      seat_number:string
  }  
}

city ---{ cinema
cinema ---{ cinemaRoom
cinema ---{ cinemaPremiere
cinemaRoom ---{ schedule
schedule ---{ emptySeat
schedule ---{ occupiedSeat

@enduml
```

## To see ERD in github

- install chrome extension [Pegmatite](https://chrome.google.com/webstore/detail/pegmatite/jegkfbnfbfnohncpcfcimepibmhlkldo)
