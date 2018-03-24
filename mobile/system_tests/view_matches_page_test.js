
Feature('Matches Screen on Mobile');

Scenario('I am very attractive, I want to view my plentiful matches by pressing the matches button', (I) => {
	I.runOnAndroid(() => {
		I.seeAppIsInstalled("com.group7.cinder");
	});
	//Allow application to initialize.
	I.wait(10);
	//Check for matches button
	I.seeElement('~matches_button');
	I.click('~matches_button');
	I.wait(10);
	//Verify we're on the matches page.
	I.seeElement('~matches_element');
});
