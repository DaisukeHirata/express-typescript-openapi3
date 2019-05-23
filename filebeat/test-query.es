GET  /cinemas/_search
{
  "query": {
    "term": {"cinema.INGEST_TO_ES" : true}
  }
}

GET  /movies/_search
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
        "field": ["input", "agent", "log", "ecs", "host", "message"]
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
}

GET _ingest/pipeline/mutating_functionbeat_log

DELETE _ingest/pipeline/mutating_functionbeat_log


GET  /filebeat-*/_search
{
  "query": {
    "query_string" : {"default_field" : "message", "query" : "*Outgoing*"}
  } 
}