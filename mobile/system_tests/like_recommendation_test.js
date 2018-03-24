
Feature('Pressing the Like Button on a Recommendation');

Scenario('I like my recommendation, therefore I will press the like button', (I) => {
	I.runOnAndroid(() => {
		I.seeAppIsInstalled("com.group7.cinder");
	});
	//Allow application to initialize.
	I.wait(10);
	//Check for like button
	I.seeElement('~like_button');
	I.click('~like_button');
	//Check for like button to make sure we're on the home page still.
	I.seeElement('~like_button');
});
