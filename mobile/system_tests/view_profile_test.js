
Feature('Profile Screen on Mobile');

Scenario('I wish to view my profile, I will press the button to view it', (I) => {
	I.runOnAndroid(() => {
		I.seeAppIsInstalled("com.group7.cinder");
	});
	//Allow application to initialize.
	I.wait(10);
	//Check for pass button
	I.seeElement('~profile_button');
	I.click('~profile_button');
	I.wait(15);
	//Verify we're on the profile page.
	I.seeElement('~profile_image');
	I.seeElement('~profile_name');
});
