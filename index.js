const Unirest = require('unirest');
const Url = require('url');
const Path = require('path');
const Jws = require('jws');
const _ = require('lodash');

const endpoints = {
  'get-info': {
    'path': 'info',
    'method': 'GET',
    'params': {}
  },
  'get-links': {
    'path': 'links',
    'method': 'GET',
    'params': {
      'offset': {},
      'limit' : {},
      'searchtags' : {},
      'searchterm' : {},
      'visibility': {
        'choices': ['all', 'private', 'public']
      }
    }
  },
  'get-link': {
    'path': 'links',
    'method': 'GET',
    'resource': {},
    'params': {}
  },
  'post-link': {
    'path': 'links',
    'method': 'POST',
    'params': {
      'description': {},
      'private': {},
      'tags': {},
      'title': {},
      'url': {}
    }
  },
  'put-link': {
    'path': 'links',
    'method': 'PUT',
    'ressource' : {},
    'params': {
      'description': {},
      'private': {},
      'tags': {},
      'title': {},
      'url': {}
    }
  },
  'delete-link': {
    'path': 'links',
    'method': 'DELETE',
    'resource': {},
    'params': {}
  }
};

class ShaarliApi {

  constructor(url,secret){
    this.URL = url;
    this.SECRET = secret;
  }
  
  getInfo(next){
    
    const endpoint = 'get-info';
    const path = this.buildPath(endpoint);
    const method = endpoints[endpoint].method.toLowerCase();
    
    return this.request(path,method,{},next);
  };

  getLinks(params,next){

    const endpoint = "get-links";
    const path = this.buildPath(endpoint);
    const method = endpoints[endpoint].method.toLowerCase();
    const parameters = paramsFormater(params,endpoint);

    return this.request(path,method,parameters,next);
  };

  getLink(id,next){
  
    const endpoint = "get-link";
    const path = Path.join(this.buildPath(endpoint),String(id));
    const method = endpoints[endpoint].method.toLowerCase();

    return this.request(path,method,{},next);
  };

  postLink(params,next){

    const endpoint = "post-link";
    const path = this.buildPath(endpoint);
    const method = endpoints[endpoint].method.toLowerCase();
    
    return this.request(path,method,params,next);
  };

  putLink(id,params,next){
    
    const endpoint = "put-link";
    const path = Path.join(this.buildPath(endpoint),String(id));
    const method = endpoints[endpoint].method.toLowerCase();
    
    return this.request(path,method,params,next);
  }
  
  deleteLink(id,next){
  
    const endpoint = "delete-link";
    const path = Path.join(this.buildPath(endpoint),String(id));
    const method = endpoints[endpoint].method.toLowerCase();

    return this.request(path,method,{},next);
  };

};

ShaarliApi.prototype.request = function(path,method,params,next){
  
    const token = Jws.sign({
      header: {
	alg: 'HS512',
	typ: 'JWT' },
      payload:{
	iat: Math.floor(Date.now()/1000)},
      secret: this.SECRET
    });

    const uri = ''+Url.resolve(this.URL,path);

    if(method == 'get'){
      Unirest[method](uri)
	.headers({authorization: 'Bearer ' + token})
	.query(params)
	.end(function(res){
	  handleStatus(res,next);
	});
    }else{
      Unirest[method](uri)
	.headers({authorization: 'Bearer ' + token})
	.type('application/json')
	.send(params)
	.end(function(res){
	  handleStatus(res,next);
	});
    }
};

ShaarliApi.prototype.buildPath = function(endpoint){
  return 'api/v1/'+ endpoints[endpoint].path;
};

function paramsFormater(params,endpoint){
  const selectedParams = _.pick(params,Object.keys(endpoints[endpoint].params));

  _.forEach(selectedParams,function(p,key){
    if(p.constructor === Array)
      selectedParams[key] = p.join(',');
  });

  return selectedParams;
}

function handleStatus(res,next){

  if(!res.error)
    return next(null,res.body);
  else
    return next(res.error);
}

module.exports = ShaarliApi;
