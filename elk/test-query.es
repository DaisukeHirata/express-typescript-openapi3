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
"3km hits 1 cinemas, 5km hits 2. 100m, 250m, 500m, 1.0km, 2.0km"
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
              "distance" : "500m",
              "cinema.data.location" : {
                "lat" : -33.46,
                "lon" : -70.72
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

"Better than Average: Sort by Best Rating with Elasticsearch"
"https://www.elastic.co/jp/blog/better-than-average-sort-by-best-rating-with-elasticsearch"
"Step 1. Index product data in Elasticsearch"
PUT my_products/doc/1
{ "ratings": { "1": 0, "2": 0, "3": 0, "4": 0, "5": 1 }, "description": "5.00 star average, 1 review" }
PUT my_products/doc/2
{ "ratings": { "1": 0, "2": 0, "3": 0, "4": 1, "5": 14 }, "description": "4.93 star average, 15 reviews" }
PUT my_products/doc/3
{ "ratings": { "1": 0, "2": 0, "3": 0, "4": 5, "5": 5 }, "description": "4.50 star average, 10 reviews" }
PUT my_products/doc/4
{ "ratings": { "1": 0, "2": 0, "3": 0, "4": 18, "5": 12 }, "description": "4.40 star average, 30 reviews" }
PUT my_products/doc/5
{ "ratings": { "1": 0, "2": 0, "3": 0, "4": 1, "5": 0 }, "description": "4.0 star average, 1 review" }
PUT my_products/doc/6
{ "ratings": { "1": 5, "2": 1, "3": 0, "4": 1, "5": 0 }, "description": "1.85 star average, 7 reviews" }
PUT my_products/doc/7
{ "ratings": { "1": 8, "2": 0, "3": 4, "4": 0, "5": 0 }, "description": "1.66 star average, 12 reviews" }
PUT my_products/doc/8
{ "ratings": { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }, "description": "0.0 star average, 0 reviews" }


"Step 2. Write a script to calculate the Wilson score"
POST _scripts/wilson-score
{
  "script": {
    "lang": "painless",
    "source": "
    long s1 = doc['ratings.1'].value;
    long s2 = doc['ratings.2'].value;
    long s3 = doc['ratings.3'].value;
    long s4 = doc['ratings.4'].value;
    long s5 = doc['ratings.5'].value;
    double p = (s1 * 0.0) + (s2 * 0.25) + (s3 * 0.5) + (s4 * 0.75) + (s5 * 1.0);
    double n = (s1 * 1.0) + (s2 * 0.75) + (s3 * 0.5) + (s4 * 0.25) + (s5 * 0.0);
    double wilsonScore = p + n > 0 ? ((p + 1.9208) / (p + n) - 1.96 * Math.sqrt((p * n) / (p + n) + 0.9604) / (p + n)) / (1 + 3.8416 / (p + n)) : 0;
    return wilsonScore;
    "
  }
}

"Step 3: Run the Wilson score script in Elasticsearch Script sorting"
GET my_products/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    {
      "_script": {
        "order": "desc",
        "type": "number",
        "script": {
          "id": "wilson-score"
        }
      }
    }
  ]
}

"Optimization"
"Step 1: Index product data in Elasticsearch"
POST my_products_optimized/doc/1
{ "ratings": { "1": 0, "2": 0, "3": 0, "4": 6, "5": 5 }, "wilson-score": 0.5711633189974982 }
POST my_products_optimized/doc/2
{ "ratings": { "1": 0, "2": 0, "3": 0, "4": 4, "5": 5 }, "wilson-score": 0.5649937852319398 }
POST my_products_optimized/doc/3
{ "ratings": { "1": 0, "2": 0, "3": 0, "4": 6, "5": 3 }, "wilson-score": 0.5066959607619625 }
POST my_products_optimized/doc/4
{ "ratings": { "1": 0, "2": 0, "3": 0, "4": 3, "5": 1 }, "wilson-score": 0.34624349923225617 }
POST my_products_optimized/doc/5
{ "ratings": { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }, "wilson-score": 0.0 }

"View the initial results"
GET my_products_optimized/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    { "wilson-score": "desc" }
  ]
}

"Step 2: Write a script to update ratings and Wilson scores"
POST _scripts/update-product-rating-score
{
  "script" : {
    "lang": "painless",
    "source": "
    ctx._source.ratings[params.rating.toString()]++;
    long s1 = ctx._source.ratings['1'];
    long s2 = ctx._source.ratings['2'];
    long s3 = ctx._source.ratings['3'];
    long s4 = ctx._source.ratings['4'];
    long s5 = ctx._source.ratings['5'];
    double p = (s1 * 0.0) + (s2 * 0.25) + (s3 * 0.5) + (s4 * 0.75) + (s5 * 1.0);
    double n = (s1 * 1.0) + (s2 * 0.75) + (s3 * 0.5) + (s4 * 0.25) + (s5 * 0.0);
    double wilsonScore = p + n > 0 ? ((p + 1.9208) / (p + n) - 1.96 * Math.sqrt((p * n) / (p + n) + 0.9604) / (p + n)) / (1 + 3.8416 / (p + n)) : 0;
    ctx._source['wilson-score'] = wilsonScore;
    "
  }
}

"Step 3: Update a product document"
POST my_products_optimized/doc/2/_update
{
  "script" : {
    "id": "update-product-rating-score",
    "params": {
      "rating": 5
    }
  }
}

"View the results"
GET my_products_optimized/_search
{
  "query": {
    "match_all": {}
  },
  "sort": [
    { "wilson-score": "desc" }
  ]
}

GET my_products_optimized/_search

"The _all field"
GET  /cinemas/_search?q=Evil

