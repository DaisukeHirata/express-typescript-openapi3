""
GET  /cinemas/_search
{
  "query": {
    "term": {"data.ingest" : "ingest_to_index_cinemas"}
  }
}

"all documents"
GET  /_search
{
  "query": {
    "match_all": {}
  }
}

"all documents in one index"
GET  /cinemas/_search
{
  "query": {
    "match_all": {}
  }
}

"find cinemas that show Big Hero 6"
GET  /cinemas/_search
{
  "query": {
    "nested": {
      "path": "cinema.data",
      "query": {
        "match": { "cinema.data.title": "Big Hero 6"}
      }
    }
  }
}


"nested https://medium.com/hello-elasticsearch/elasticsearch-nested-type-vs-array-objects-2ea7bac68ed8"
GET  /cinemas/_search
{
  "query": {
    "nested": {
      "path": "cinema.data",
      "query": {
        "bool": {
          "must" : [
            { 
              "match": {"cinema.data.format": "4DX"}
            },
            { 
              "match": {"cinema.data.title": "xXx: Reactivado"}
            }
          ]
        }
      }
    }
  }
}


"search Hayuelos Colombia by geo_point"
GET /cinemas/_search
{
  "query": {
    "geo_bounding_box": { 
      "data.location": {
        "top_left": {
          "lat": 5,
          "lon": -75
        },
        "bottom_right": {
          "lat": 4,
          "lon": -74
        }
      }
    }
  }
}

"Geo Distance Query https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-geo-distance-query.html"
"3km hits 1 cinemas, 5km hits 2."
GET /cinemas/_search
{
  "query": {
    "nested": {
      "path": "cinema.data",
      "query": {
        "bool" : {
          "must" : {
            "match_all" : {}
          },
          "filter" : {
            "geo_distance" : {
              "distance" : "5km",
              "cinema.data.location" : {
                "lat" : -33.46,
                "lon" : -70.7
              }
            }
          }
        }
      }
    }
  }
}

"IN equivalent operator"
GET  /cinemas/_search
{
  "query": {
    "nested": {
      "path": "cinema.data",
      "query" : {
        "bool" : {
          "filter" : {
            "terms" : {
              "cinema.data.id" : ["588ac3a02d029a6d15d0b5ca", "588ac3a02d029a6d15d0b5c6"]
            }
          }
        }
      }
    }
  }
}

"DELETE documents which timestamp are less than equal to 5 hours from now"
POST /cinemas/_delete_by_query
{
  "query": {
    "range": {
      "@timestamp": {
        "lte": "now-5h"
      }
    }
  }
}

"pagenation"
GET  /cinemas/_search
{
  "from": 5,
  "size": 5
}


"testing analyzer"
POST _analyze
{
  "analyzer": "standard",
  "text":     "The quick brown fox."
}


"plugin"
GET /_nodes/plugin=true&pretty

"get mapping"
GET /cinemas/_mapping/

"delete index"
DELETE /cinemas

"create mapping"
PUT /cinemas
{
  "mappings": {
    "properties": {
        "cinema": {
            "properties": {
                "data": {
                  "type": "nested",
                  "properties": {
                    "location": {
                        "type": "geo_point"
                    }
                  }
                }
            }
        }
    }
  }
}

GET  /movies/_search/
{
  "query": {
    "query_string" : {"default_field" : "message", "query" : "*Incoming*"}
  } 
}

POST /_ingest/pipeline/_simulate
{
  "pipeline": {
    "description" : "mutating filebeat log",
    "processors": [
      {
        "rename": {
          "field": "message",
          "target_field": "cinema"
        }
      },    
      {
        "json" : {
          "field" : "cinema",
          "target_field" : "data"
        }
      },
      {
        "json" : {
          "field" : "data.log",
          "target_field" : "data"
        }
      },
      {
        "json" : {
          "field" : "data.message",
          "target_field" : "data"
        }
      },
      {
        "set": {
          "field": "_id",
          "value": "{{data.id}}"
        }
      },
      {
        "remove": {
          "field": ["input", "agent", "log", "ecs", "host"]
        }
      }
    ]
  },
  "docs": [
    {
      "_source": {
        "@timestamp": "2019-05-17T10:19:37.534Z",
        "host": {
          "name": "1b1252c8d280"
        },
        "agent": {
          "version": "7.0.1",
          "type": "filebeat",
          "ephemeral_id": "d86d0dd9-00c5-40b5-81dd-d5df46bc99d4",
          "hostname": "1b1252c8d280",
          "id": "91b7f2fa-3720-4f4d-80d6-820c5f2a48f2"
        },
        "log": {
          "offset": 158294,
          "file": {
            "path": "/usr/share/filebeat/dockerlogs/72f687078e715882386bea772b92bb673a97381fb7b0bbaf880913eb85effb0d/72f687078e715882386bea772b92bb673a97381fb7b0bbaf880913eb85effb0d-json.log"
          }
        },
        "message": "{\"log\":\"{\\\"message\\\":\\\"{\\\\\\\"INGEST_TO_ES\\\\\\\":true,\\\\\\\"id\\\\\\\":\\\\\\\"1b1252c8d280\\\\\\\",\\\\\\\"abc\\\\\\\":\\\\\\\"Outgoing\\\\\\\",\\\\\\\"def\\\\\\\":\\\\\\\"furafura\\\\\\\",\\\\\\\"deleted_at\\\\\\\":true}\\\",\\\"level\\\":\\\"ingest\\\"}\\n\",\"stream\":\"stdout\",\"time\":\"2019-05-23T06:27:58.502699815Z\"}",
        "input": {
          "type": "log"
        },
        "ecs": {
          "version": "1.0.0"
        }
      }
    }
  ]
}

PUT _ingest/pipeline/mutating_filebeat_log
{
  "description" : "mutating filebeat log",
  "processors": [
    {
      "json" : {
        "field" : "message",
        "target_field" : "cinema"
      }
    },
    {
      "json" : {
        "field" : "cinema.log",
        "target_field" : "cinema",
        "on_failure" : [
          {
            "set" : {
              "field" : "error",
              "value" : "json cinema.log"
            }
          }
        ]
      }
    },
    {
      "json" : {
        "field" : "cinema.message",
        "target_field" : "cinema",
        "on_failure" : [
          {
            "set" : {
              "field" : "error",
              "value" : "json cinema.message"
            }
          }
        ]
      }
    },
    {
      "set": {
        "field": "_id",
        "value": "{{cinema.id}}",
        "on_failure" : [
          {
            "set" : {
              "field" : "error",
              "value" : "set _id"
            }
          }
        ]
      }
    },
    {
      "remove": {
        "field": ["input", "agent", "log", "ecs", "host", "message"],
        "on_failure" : [
          {
            "set" : {
              "field" : "error",
              "value" : "remove items"
            }
          }
        ]
      }
    }
  ]
}

GET _ingest/pipeline/mutating_filebeat_log

DELETE _ingest/pipeline/mutating_filebeat_log


POST /_ingest/pipeline/_simulate
{
  "pipeline": {
    "description" : "mutating functionbeat log",
    "processors": [
    {
      "rename": {
        "field": "message",
        "target_field": "cinema",
        "on_failure" : [
          {
            "set" : {
              "field" : "error",
              "value" : "rename message"
            }
          }
        ]
      }
    },
    {
      "json" : {
        "field" : "cinema",
        "target_field" : "data",
        "on_failure" : [
          {
            "set" : {
              "field" : "error",
              "value" : "json message"
            }
          }
        ]
      }
    },
    {
      "json" : {
        "field" : "data.message",
        "target_field" : "data",
        "on_failure" : [
          {
            "set" : {
              "field" : "error",
              "value" : "json message"
            }
          }
        ]
      }
    },    
    {
      "set": {
        "field": "_id",
        "value": "{{data.id}}",
        "on_failure" : [
          {
            "set" : {
              "field" : "error",
              "value" : "set _id"
            }
          }
        ]
      }
    },    
    {
      "remove": {
        "field": ["host", "ecs", "id", "subscription_filters", "cinema"],
        "on_failure" : [
          {
            "set" : {
              "field" : "error",
              "value" : "remove fields"
            }
          }
        ]
      }
    }
    ]
  },
  "docs": [
    {
      "_source": {
        "@timestamp": "2019-05-17T10:19:37.534Z",
        "host": {
          "name": "1b1252c8d280"
        },
        "agent": {
          "version": "7.0.1",
          "type": "filebeat",
          "ephemeral_id": "d86d0dd9-00c5-40b5-81dd-d5df46bc99d4",
          "hostname": "1b1252c8d280",
          "id": "91b7f2fa-3720-4f4d-80d6-820c5f2a48f2"
        },
        "log": {
          "offset": 158294,
          "file": {
            "path": "/usr/share/filebeat/dockerlogs/72f687078e715882386bea772b92bb673a97381fb7b0bbaf880913eb85effb0d/72f687078e715882386bea772b92bb673a97381fb7b0bbaf880913eb85effb0d-json.log"
          }
        },
        "message" : "{\"message\":\"{\\\"INGEST_TO_ES\\\":true,\\\"id\\\":\\\"1b1252c8d280\\\",\\\"abc\\\":\\\"Outgoing\\\",\\\"def\\\":\\\"furafura\\\",\\\"deleted_at\\\":true}\",\"level\":\"ingest\"}",
        "input": {
          "type": "log"
        },
        "ecs": {
          "version": "1.0.0"
        }
      }
    }
  ]
}

PUT _ingest/pipeline/mutating_functionbeat_log
{
  "description" : "mutating functionbeat log",
  "processors": [
  ]
}

GET _ingest/pipeline/mutating_functionbeat_log

DELETE _ingest/pipeline/mutating_functionbeat_log


GET  /filebeat-*/_search
{
  "query": {
    "query_string" : {"default_field" : "message", "query" : "*Outgoing*"}
  } 
}

"The _all field"
GET  /cinemas/_search?q=Evil

