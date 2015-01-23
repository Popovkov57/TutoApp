"use strict";

/* Tests */

describe('Show users in list view', function(){
	var userList, buttonShowUser, buttonAddUser, backButton, buttonAddUser;

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
			it('shows the next view', function(){
				// On récupère la liste de tous les back buttons et on trie pour
				// récupérer seulement le bouton visible, afin de cliquer dessus
				// et revenir à la page de la liste des utilisateurs
				element.all(by.className('back-button')).filter(function(elem, index) {
					return elem.getAttribute('class').then(function(className) {
						return !(/hide/.test(className));
					});
				}).then(function(filteredElements) {
					filteredElements[0].click().then(function() {
						userList = element.all(by.repeater('user in users'));
						expect(userList.count()).toEqual(5);
					})
				});
			});
		});
	});

	it('load a random user and open modal', function(){

		element.all(by.id('userButtonAdd')).filter(function(elem, index) {
			return elem.getText().then(function(txt) {
				return txt === '+';
			});
		}).then(function(filteredElements) {
			filteredElements[0].click().then(function() {
				element(by.className('modal-title')).getText().then(function(txt){
					expect(txt).toEqual('Add Gypsy');
				});
			});
		});
	});

});
