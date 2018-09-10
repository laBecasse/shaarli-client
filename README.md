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

## Get Tags 

Get a collection of tags
	
`params` is a collection wich can have the following keys:
	
- `offset` (`int`) - Offset from which to start listing tags
- `limit` (`int` | "all") - Number of tags to retrieve or 'all'
- `visibility` ("all" | "private" | "public") - Filter tags by visibility

```js 
var params = {
	"offset": 0,
	"limit": 10,
	"visibility": "private"
};

client.getTags(params,function(err,tags){
	console.log(tags);
})
```

## Get Tag

Get a tag with its `tagName`.
	

```js 

client.getTag(tagName,function(err,tag){
	console.log(tag);
})
```

## Put Tag

Rename an existing tag.

`params` is a collection wich can have the following keys:

- `name` (`string`) - new tag name

```js
var params = {
	"name": "kitty"
};

client.putTag(tagName, params, function(err, updateTag){
	console.log(updateTag);
});
```

## Delete Tag

Delete a tag.
	
```js 
client.deleteTag(tagName,function(err){
});
```

## Get History

Retrieve the last actions made by the user, even in the web version, including:

- `CREATED`: A new link has been created.
- `UPDATED`: An existing link has been updated.
- `DELETED`: A link has been deleted.
- `SETTINGS`: Shaarli settings have been updated.

`params` is a collection wich can have the following keys:

- `since` (`string`) - Get all event since this datetime (format ISO ISO8601). Note: the + should be encoded to %2B.
- `offset` (`int`) - Offset from which to start listing events
- `limit` (`int` | "all") - Number of event to retrieve or 'all'


```js
var params = {
    "since": "2015-05-05T12:30:00%2B03:00",
	"offset": 0,
	"limit": 10,
};

client.getHistory(params, function(err, history){
	console.log(history);
});
```
