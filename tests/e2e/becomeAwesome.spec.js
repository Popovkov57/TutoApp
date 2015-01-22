"use strict";

/* Tests */

describe('Show users in list view', function(){
	var userList, buttonShowUser, buttonAddUser, backButton;

	beforeEach(function() {
		browser.get('http://localhost:8100/#/users');
		userList = element.all(by.repeater('user in users'));
	});

	it('show list have 5 items', function(){
		expect(userList.count()).toEqual(5);
	});

	describe('when i click on the first user', function() {
		beforeEach(function() {
			buttonShowUser = userList.get(0);
			buttonShowUser.click();
		});

		it('shows this user', function(){

			element(by.id('fullname')).getText().then(function(txt){
				expect(txt).not.toEqual('');
			})
		});

		describe('when i click on the back button', function(){
			beforeEach(function(){
				backButton = element(by.id('back-button'));
				backButton.click();
			})

			it('shows the next view', function(){

				element(by.id('fullname')).getText().then(function(txt){
					expect(txt).not.toEqual('');
				})
			});

		})

	});


	// it('show user list if click back button', function(){
	//
	// 	element(by.id('back-button')).click().then(function(){
	// 		expect(1).toEqual(1);
	// 	})
	//
	// });

	// describe('when i click on one user', function() {
	// 	beforeEach(function() {
	// 		// click sur le user
	//
	// 	});
	//
	// 	it('show a back button',function() {
	//
	// 	});
	//
	// 	describe('when i click on the back button', function() {
	// 		beforeEach(function() {
	// 			// click sur le back button
	// 		});
	//
	// 		it('returns to the users lists', function() {
	//
	// 		});
	// 	});
	// });



});
