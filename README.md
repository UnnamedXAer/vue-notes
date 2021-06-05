# Vue Notes

 Demo app build with Vue + Bootstrap-Vue & elasticsearch
 ----------
 
> Since there in no api for this app we will use elasticsearch server as our api.
## Build Setup

``` bash

# navigate to the project folder
cd /vue-notes

# start elasticsearch
# you may need to set the CORS settings in elasticsearch config file
## file `./elasticstuff/elasticsearch.yml` contains an example

# create index
curl -XPUT "http://127.0.0.1:9200/notes" -H "Content-Type: application/json" --data-binary "@elasticstuff/notesindex.json"

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```