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
      "path": "data",
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
      "path": "data",
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
      "path": "data",
      "query": {
        "bool" : {
          "must" : {
            "match_all" : {}
          },
          "filter" : {
            "geo_distance" : {
              "distance" : "500m",
              "data.location" : {
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

"In JavaScript"
/* const s = await search("http://elk:9200/cinemas/_search",
  {
    "query": {
      "nested": {
        "path": "data",
        "query": {
          "bool" : {
            "must" : {
              "match_all" : {}
            },
            "filter" : {
              "geo_distance" : {
                "distance" : "500m",
                "data.location" : {
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
);
console.dir(JSON.stringify(s)); */

"IN equivalent operator"
GET  /cinemas/_search
{
  "query": {
    "nested": {
      "path": "data",
      "query" : {
        "bool" : {
          "filter" : {
            "terms" : {
              "data.id" : ["588ac3a02d029a6d15d0b5ca", "588ac3a02d029a6d15d0b5c6"]
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

"1つだけのフィールドを使用するStandard Analyzer"
DELETE mono
PUT /mono
{
  "mappings": {
    "properties": {
      "body": {
        "type": "text"
      }
    }
  }
}

PUT /mono/_doc/1
{
  "body" : "세계인의 축제, 제23회 동계올림픽대회는 대한민국 강원도 평창에서 2018년 2월 9일부터 25일까지 17일간 개최됩니다. 대한민국 평창은 세 번의 도전 끝에 지난 2011년 7월 6일 열린 제123차 IOC 총회에서 과반 표를 획득하며 2018년 동계올림픽 개최지로 선정되었습니다. 이로써 대한민국에서는 1988년 서울 올림픽 이후 30년 만에, 평창에서 개∙폐회식과 대부분의 설상 경기가 개최되며, 강릉에서는 빙상 종목 전 경기가, 그리고 정선에서는 알파인 스키 활강 경기가 개최될 예정입니다."
}
PUT /mono/_doc/2
{
  "body" : "The XXIII Olympic Winter Games will be held for 17 days from 9 to 25 February 2018 in PyeongChang, Gangwon Province, the Republic of Korea. PyeongChang was selected as the host city of the 2018 Olympic Winter Games after receiving a majority vote at the 123rd IOC Session held on 6 July 2011 after three consecutive bids. The Olympic Winter Games will be held in Korea for the first time in 30 years after the Seoul Olympic Games in 1988. PyeongChang will be the stage for the Opening and Closing Ceremonies and most snow sports. Alpine speed events will take place in Jeongseon, and all ice sports will be competed in the coastal city of Gangneung."
}
PUT /mono/_doc/3
{
  "body" : "第23届冬季奥运会将于2018年2月9日-25日在韩国江原道平昌展开。韩国平昌在第三次申奥之后，于2011年7月6日召开的第123届国际奥委会全会上被选定为2018年冬季奥运会的主办地。由此，韩国自1988年举办首尔夏季奥运会以后，时隔30年，将首次举办冬季奥运会。该届冬奥会的开·闭幕式以及大部分的雪上运动将在平昌进行，而所有冰上运动将在江陵、高山滑雪滑降比赛则将在旌善进行。"}PUT /mono/docs/4{  "body" : "世界の人々の祝祭、第23回冬季オリンピック大会は大韓民国江原道平昌で2018年2月9日から25日までの17日間、開催されます。大韓民国・平昌は三度の挑戦の末、2011年7月7日に開かれた第123回IOC総会で過半数票を獲得し、2018年冬季オリンピック及びパラリンピックの開催地に選ばれました。これにより1988年ソウルオリンピック開催後30年の時を経てついに、大韓民国で最初の冬季パラリンピックの舞台が繰り広げられます。平昌で開・閉会式とほぼ全ての雪上競技が開催され、江陵では氷上種目全競技が、そして旌善ではアルペンスキー滑降競技が開催される予定です。"
}

GET /mono/_search
{
  "query": {
    "multi_match": {
      "query": "Olympic Games",
      "fields": [
        "body"
      ]
    }
  }
}

POST /mono/_search
{
  "query": {
    "multi_match": {
      "query": "オリンピック大会",
      "fields": [
        "body"
      ]
    }
  }
}

POST /mono/_search
{
  "query": {
    "multi_match": {
      "query": "奥运会",
      "fields": [
        "body"
      ]
    }
  }
}

POST /mono/_search
{
  "query": {
    "multi_match": {
      "query": "올림픽대회",
      "fields": [
        "body"
      ]
    }
  }
}

DELETE /test
PUT /test
{
  "mappings": {
    "properties": {
      "body": {
        "type": "text",
        "fields": {
          "japanese_field": {
            "analyzer": "kuromoji",
            "type": "text"
          },
          "chinese_field": {
            "analyzer": "smartcn",
            "type": "text"
          }
        }
      }
    }
  }
}

PUT /test/_doc/2
{
  "body" : "The XXIII Olympic Winter Games will be held for 17 days from 9 to 25 February 2018 in PyeongChang, Gangwon Province, the Republic of Korea. PyeongChang was selected as the host city of the 2018 Olympic Winter Games after receiving a majority vote at the 123rd IOC Session held on 6 July 2011 after three consecutive bids. The Olympic Winter Games will be held in Korea for the first time in 30 years after the Seoul Olympic Games in 1988. PyeongChang will be the stage for the Opening and Closing Ceremonies and most snow sports. Alpine speed events will take place in Jeongseon, and all ice sports will be competed in the coastal city of Gangneung."
}
PUT /test/_doc/3
{
  "body" : "第23届冬季奥运会将于2018年2月9日-25日在韩国江原道平昌展开。韩国平昌在第三次申奥之后，于2011年7月6日召开的第123届国际奥委会全会上被选定为2018年冬季奥运会的主办地。由此，韩国自1988年举办首尔夏季奥运会以后，时隔30年，将首次举办冬季奥运会。该届冬奥会的开·闭幕式以及大部分的雪上运动将在平昌进行，而所有冰上运动将在江陵、高山滑雪滑降比赛则将在旌善进行。"
}
PUT /test/_doc/4
{
  "body" : "世界の人々の祝祭、第23回冬季オリンピック大会は大韓民国江原道平昌で2018年2月9日から25日までの17日間、開催されます。大韓民国・平昌は三度の挑戦の末、2011年7月7日に開かれた第123回IOC総会で過半数票を獲得し、2018年冬季オリンピック及びパラリンピックの開催地に選ばれました。これにより1988年ソウルオリンピック開催後30年の時を経てついに、大韓民国で最初の冬季パラリンピックの舞台が繰り広げられます。平昌で開・閉会式とほぼ全ての雪上競技が開催され、江陵では氷上種目全競技が、そして旌善ではアルペンスキー滑降競技が開催される予定です。"
}

POST /test/_search
{
  "query": {
    "multi_match": {
      "query": "Olympic Games",
      "fields": [
        "body"
      ]
    }
  }
}

POST /test/_search
{
  "query": {
    "multi_match": {
      "query": "オリンピック大会",
      "fields": [
        "body.japanese_field"
      ]
    }
  }
}

POST /test/_search
{
  "query": {
    "multi_match": {
      "query": "奥运会",
      "fields": [
        "body.chinese_field"
      ]
    }
  }
}

POST _scripts/update-restaurant-reviews-rating-score
{
  "script" : {
    "lang": "painless",
    "source": "
    double calcWilsonScore(def s1, def s2, def s3, def s4, def s5) {
      double p = (s1 * 0.0) + (s2 * 0.25) + (s3 * 0.5) + (s4 * 0.75) + (s5 * 1.0);
      double n = (s1 * 1.0) + (s2 * 0.75) + (s3 * 0.5) + (s4 * 0.25) + (s5 * 0.0);
      wilsonScore = p + n > 0 ? ((p + 1.9208) / (p + n) - 1.96 * Math.sqrt((p * n) / (p + n) + 0.9604) / (p + n)) / (1 + 3.8416 / (p + n)) : 0;
      wilsonScore;
    }

    ctx._source.overall_rating[params.overall_rating.toString()]++;
    long o_s1 = ctx._source.overall_rating['1'];
    long o_s2 = ctx._source.overall_rating['2'];
    long o_s3 = ctx._source.overall_rating['3'];
    long o_s4 = ctx._source.overall_rating['4'];
    long o_s5 = ctx._source.overall_rating['5'];
    double o_wilsonScore = calcWilsonScore(o_s1, o_s2, o_s3, o_s4, o_s5);
    ctx._source['overall-wilson-score'] = o_wilsonScore;
    "
  }
}


GET my_products_optimized/_search

"The _all field"
GET  /cinemas/_search?q=Evil

