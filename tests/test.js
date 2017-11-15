var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;

var mongoose = require('mongoose');
require('sinon-mongoose');

//Importing our interest model for our unit testing.
var Interest = require('../models/interest');

describe("Get all interests", function(){
	// Test will pass if we get all interests
	it("should return all interests", function(done){
	    var InterestMock = sinon.mock(Interest);
	    var expectedResult = {status: true, interests: []};
	    InterestMock.expects('find').yields(null, expectedResult);
	    Interest.find(function (err, result) {
	        InterestMock.verify();
	        InterestMock.restore();
	        expect(result.status).to.be.true;
	        done();
	    });
	});

	// Test will pass if we fail to get a interest
	it("should return error", function(done){
	    var InterestMock = sinon.mock(Interest);
	    var expectedResult = {status: false, error: "Something went wrong"};
	    InterestMock.expects('find').yields(expectedResult, null);
	    Interest.find(function (err, result) {
	        InterestMock.verify();
	        InterestMock.restore();
	        expect(err.status).to.not.be.true;
	        done();
	    });
	});
});

// Test will pass if the interest is saved
describe("Post a new interest", function(){
    it("should create new interest", function(done){
        var InterestMock = sinon.mock(new Interest({ interest: 'Save new interest from mock'}));
        var interest = InterestMock.object;
        var expectedResult = { status: true };
        InterestMock.expects('save').yields(null, expectedResult);
        interest.save(function (err, result) {
            InterestMock.verify();
            InterestMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the interest is not saved
    it("should return error, if interest not saved", function(done){
        var InterestMock = sinon.mock(new Interest({ interest: 'Save new interest from mock'}));
        var interest = InterestMock.object;
        var expectedResult = { status: false };
        InterestMock.expects('save').yields(expectedResult, null);
        interest.save(function (err, result) {
            InterestMock.verify();
            InterestMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

// Test will pass if the interest is updated based on an ID
describe("Update a new interest by id", function(){
	it("should updated a interest by id", function(done){
	  var InterestMock = sinon.mock(new Interest());
	  var interest = InterestMock.object;
	  var expectedResult = { status: true };
	  InterestMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult);
	  interest.save(function (err, result) {
	    InterestMock.verify();
	    InterestMock.restore();
	    expect(result.status).to.be.true;
	    done();
	  });
	});
	// Test will pass if the interest is not updated based on an ID
	it("should return error if update action is failed", function(done){
	  var InterestMock = sinon.mock(new interest());
	  var interest = InterestMock.object;
	  var expectedResult = { status: false };
	  InterestMock.expects('save').withArgs({_id: 12345}).yields(expectedResult, null);
	  interest.save(function (err, result) {
	    InterestMock.verify();
	    InterestMock.restore();
	    expect(err.status).to.not.be.true;
	    done();
	  });
	});
});

// Test will pass if the interest is deleted based on an ID
describe("Delete a interest by id", function(){
    it("should delete a interest by id", function(done){
        var InterestMock = sinon.mock(interest);
        var expectedResult = { status: true };
        InterestMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);
        interest.remove({_id: 12345}, function (err, result) {
            interestMock.verify();
            interestMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });
    // Test will pass if the interest is not deleted based on an ID
    it("should return error if delete action is failed", function(done){
        var InterestMock = sinon.mock(interest);
        var expectedResult = { status: false };
        InterestMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);
        interest.remove({_id: 12345}, function (err, result) {
            InterestMock.verify();
            InterestMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});