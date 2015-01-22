"use strict";

/* Tests */

describe('Show users in list view', function(){

	var userList;

	beforeEach(function() {
		browser.get('http://localhost:8100/#/users');
		userList = element.all(by.repeater('user in users'));
	});

	it('should list have 5 items', function(){
		expect(userList.count()).toEqual(5);
	});

});
