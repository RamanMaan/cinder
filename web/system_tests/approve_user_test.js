Feature('Testing approving a recommended user');

Scenario('Test approving a recommended user', I => {
  I.amOnPage('/login');
  I.waitForElement('.login-form', 3);
  I.see('Log In');
  I.fillField('#email', 'al@email.com');
  I.fillField('#password', 'password');
  I.click('Log In');
  I.amOnPage('/');
  I.waitForElement('.Home', 2);
  I.see('cinder');
  I.seeElement('.UserDetail');
  I.click('HOT');
  I.waitForElement('.Home', 2);
  I.seeElement('.UserDetail');
});
