var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

var local = require('./local.json');

describe('Shaarli', function() {
  var api = require("../index.js");
  var client = new api(local.url,local.secret);
  
  describe('#getInfo()', function() {
    it('should return info without error', function(done) {
      client.getInfo(function(err){
	if(err) return done(err);
	return done();
      });
    });
  });

  describe('#getLinks() without params', function() {
    it('should return links without error', function(done) {
      client.getLinks({},function(err){
	if(err) return done(err);
	return done();
      });
    });
  });

  describe('#getLinks() without full params', function() {
    it('should return links without error', function(done) {

      var params = {
	"offset": 0,
	"limit": 10,
	"searchtags": ["gif"],
	"searchterm": [],
	"visibility": "all"
      };
      
      client.getLinks(params,function(err){
	if(err) return done(err);
	return done();
      });
    });
  });

  describe('#postLink()', function() {
    var id;

    var params = {
      "description": "blabla",
      "private": true,
      "tags": ["cat","image"],
      "title": "jumping cats",
      "url": "http://jumpin.cat/"
    };

    
    it('should port links without error', function(done) {      
      client.postLink(params,function(err,link){
	if(err) return done(err);
	expect(link).to.deep.include(params);
	id = link.id;
	return done();
      });
    });

    after(function(){
      
      if(id == undefined) return;

      describe('#getLink()', function() {

	it('should get the posted link', function(done) {
          
	  client.getLink(id,function(err,link){
	    if(err) return done(err);
	    expect(link).to.deep.include(params);
	    return done();
	  });
	});
      });

      describe('#putLink()', function() {
	
	var modifier = {
	  "description": "bloblo",
	  "private": false,
	  "tags": ["image","truc"],
	  "title": "jumping cats calendar",
	  "url": "http://jumpin.cat/post"
	};

	it('should modify the posted link', function(done) {
          
	  client.putLink(id,modifier,function(err,link){
	    if(err) return done(err);
	    expect(link).to.deep.include(modifier);
	    return done();
	  });
	});
      });

      describe('#deleteLink()', function() {

	it('should delete a posted link', function(done) {
          
	  client.deleteLink(id,function(err){
	    if(err) return done(err);
	    return done();
	  });
	});
      });

      describe('#getTags() without params', function () {
        it('should return links without error', function (done) {
          client.getTags({},function (err) {
            if (err) return done(err)
            return done()
          })
        })
      })
    })
  })
})
