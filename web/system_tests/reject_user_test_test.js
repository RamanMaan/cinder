Feature('Testing rejecting a recommended user');

Scenario('Test rejecting a recommended user', (I) => {
  I.amOnPage('/login');
  I.see('Log In');
  I.fillField('#email', 'al@email.com');
  I.fillField('#password', 'password');
  I.click('Log In');
  I.amOnPage('/');
  I.see('cinder');
  I.see('User Bio');
  I.click('NOT');
  I.see('User Bio');
});