const Unirest = require('unirest');
const Url = require('url');
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
  }
};

class ShaarliApi {

  constructor(url,secret){
    this.URL = url;
    this.SECRET = secret;
  }
  
  getInfo(next){
    return request(this.URL,'get-info',{},this.SECRET,next);
  };

  getLinks(params,next){
    return request(this.URL,'get-links',params,this.SECRET,next);
  };

  postLink(params,next){
    return request(this.URL,'post-link',params,this.SECRET,next);
  };
}

function request(url,endpoint,params,secret,next){
  
  const token = Jws.sign({
    header: {
      alg: 'HS512',
      typ: 'JWT' },
    payload:{
      iat: Math.floor(Date.now()/1000)},
      secret: secret });

  const uri = ''+Url.resolve(url,'api/v1/'+ endpoints[endpoint].path);
  const method = endpoints[endpoint].method.toLowerCase();
  
  if(method == 'get'){
    Unirest[method](uri)
      .headers({authorization: 'Bearer ' + token})
      .query(paramsFormater(params,endpoint))
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
