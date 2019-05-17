GET  /cinemas/_search
{
  "query": {
    "query_string"
     : {"default_field" : "cinema", "query" : "*INGEST_TO_ES*"}

  }
}

GET  /movies/_search
{
  "query": {
    "query_string" : {"default_field" : "cinema", "query" : "*Incoming*"}
  } 
}

POST /_ingest/pipeline/_simulate
{
  "pipeline": {
    "description" : "mutating filebeat log",
    "processors": [
      {
        "json" : {
          "field" : "message",
          "target_field" : "message"
        }
      },
      {
        "json" : {
          "field" : "message.log",
          "target_field" : "cinema"
        }
      },
      {
        "set": {
          "field": "_id",
          "value": "{{cinema.id}}"
        }
      },
      {
        "remove": {
          "field": ["message", "input", "agent", "log", "ecs", "host"]
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
        "message": "{\"log\":\"{\\\"id\\\":\\\"1b1252c8d280\\\",\\\"abc\\\":\\\"Outgoing\\\",\\\"def\\\":\\\"hofgehoge\\\"}\\n\",\"stream\":\"stdout\",\"time\":\"2019-05-17T11:41:32.234033825Z\"}",
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
  "processors": [
    {
      "json" : {
        "field" : "message",
        "target_field" : "message"
      }
    },
    {
      "json" : {
        "field" : "message.log",
        "target_field" : "cinema"
      }
    },
    {
      "set": {
        "field": "_id",
        "value": "{{cinema.id}}"
      }
    },
    {
      "remove": {
        "field": ["message", "input", "agent", "log", "ecs", "host"]
      }
    }
  ]
}

GET _ingest/pipeline/mutating_filebeat_log

DELETE _ingest/pipeline/mutating_filebeat_log


GET  /filebeat-*/_search
{
  "query": {
    "query_string" : {"default_field" : "message", "query" : "*Outgoing*"}
  } 
}