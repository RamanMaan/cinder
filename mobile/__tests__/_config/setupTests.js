// Mock fetch
global.fetch = jest.fn();

// Helper to mock a success response (only once)
fetch.mockResponseSuccess = (body) => {
  fetch.mockImplementationOnce(() => Promise.resolve({ ok: true, json: () => Promise.resolve(JSON.parse(body)) }));
};

// Helper to mock a failure response (only once)
fetch.mockResponseFailure = (error) => {
  fetch.mockImplementationOnce(() => Promise.reject(error));
};
