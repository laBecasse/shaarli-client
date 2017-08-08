# Shaarli-client

a client in node.js for a [shaarli](https://github.com/shaarli/Shaarli) api.

## Installing

To utilize shaarli-client, install the the `npm` module:

```bash
npm install shaarli-client
```

After installing the `npm` package you can now start request shaarli instance like so:

```js
var shaarliClient = require('shaarli-client');

var client = new shaarliClient(url,secret);
```

## Get Info

Get information about this instance.

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

## Get Link

Get a link with its `id`.
	

```js 

client.getLink(id,function(err,link){
	console.log(link);
})
```

## Post Link

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

## Put Link

Update an existing link with provided request data. Keep in mind that all link’s fields will be updated.

`params` is a collection wich can have the following keys:

- `description` (`string`) - Link description
- `private` (`boolean`) - Link visibility
- `tags` (`Array`) - List of tags associated with the link
- `title` (`string`) - Link title
- `url` (`string`) - Link URL

```js
var params = {
	"description": "bloblo",
	"private": false,
	"tags": ["image","truc"],
	"title": "jumping cats calendar",
	"url": "http://jumpin.cat/post"
};

client.putLink(id,params,function(err,updateLink){
	console.log(updateLink);
});
```

## Delete Link

Delete a link.
	
```js 
client.deleteLink(id,function(err){
});
```

