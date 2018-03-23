Feature('View match details');

Scenario('View match details', I => {
  I.amOnPage('/login');
  I.see('Log In');
  I.fillField('#email', 'al@email.com');
  I.fillField('#password', 'password');
  I.click('Log In');
  I.amOnPage('/');
  I.see('cinder');
  I.seeElement('.MatchesList');
  I.seeElement('.MatchesListItem');
  I.click('.MatchesListItem');
  I.seeElement('.UserDetail');
  I.click('Back to finding love');
});
