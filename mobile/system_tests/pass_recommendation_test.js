
Feature('Pressing the Pass Button on a Recommendation');

Scenario('I Do NOT like My Recommendation, I will press the pass button', (I) => {
	I.runOnAndroid(() => {
		I.seeAppIsInstalled("com.group7.cinder");
	});
	//Allow application to initialize.
	I.wait(10);
	//Check for pass button
	I.seeElement('~pass_button');
	I.click('~pass_button');
	//Check for pass button to make sure we're on the home page still.
	I.seeElement('~pass_button');
});
