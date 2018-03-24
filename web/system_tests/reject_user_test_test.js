Feature('Testing rejecting a recommended user');

Scenario('Test rejecting a recommended user', I => {
  I.amOnPage('/login');
  I.waitForElement('.login-form', 4);
  I.see('Log In');
  I.fillField('#email', 'al@email.com');
  I.fillField('#password', 'password');
  I.click('Log In');
  I.amOnPage('/');
  I.see('cinder');
  I.seeElement('.UserDetail');
  I.click('NOT');
  I.seeElement('.UserDetail');
});
