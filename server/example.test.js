// "test" test so the jest wouldn't return as failed
test('jest works on the server project', () => {
  expect(process.env.NODE_ENV).toBe('test');
});