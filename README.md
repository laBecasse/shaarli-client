# Shaarli-api

a client in node.js for a [shaarli](https://github.com/shaarli/Shaarli) api.

## Installing

To utilize shaarli-api client, install the the `npm` module:

```bash
npm install shaarli-api
```

After installing the `npm` package you can now start request shaarli instance like so:

```js
var shaarliApi = require('shaarli-api');

var client = new shaarliApi(url,secret);
```

## Get Info

Get information about this instance

```js
client.getInfo(function(err,info){
	console.log(info);
})
```

## Get Links 

Get a collection of links ordered by creation date.
	
`params` is a collection wich can have the following keys:
	
- `offset` (`int`) - Offset from which to start listing links
- `limit` (`int` | "all") - Number of links to retrieve or 'all'
- `searchtags` (`Array`) - List of tags
- `searchterm` (`Array`) - Search terms across all links fields
- `visibility` ("all" | "private" | "public") - Filter links by visibility

```js 
var params = {
	"offset": 0,
	"limit": 10,
	"searchtags": ["gif","cat"],
	"searchterm": ["looks","at"],
	"visibility": "all"
};

client.getLinks(params,function(err,links){
	console.log(links);
})
```

# Post Link

Create a new link or note.

`params` is a collection wich can have the following keys:

- `description` (`string`) - Link description
- `private` (`boolean`) - Link visibility
- `tags` (`Array`) - List of tags associated with the link
- `title` (`string`) - Link title
- `url` (`string`) - Link URL

```js
var params = {
	"description": "blabla",
	"private": false,
	"tags": ["cat","image"],
	"title": "jumping cats",
	"url": "http://jumpin.cat/"
};

client.postLink(params,function(err,newLink){
	console.log(newLink);
});
```

