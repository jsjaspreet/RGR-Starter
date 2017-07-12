import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import Cookie from 'js-cookie'

const source = new RecordSource();
const store = new Store(source);

let csrfToken = Cookie.get('_csrf')

const headers = {
  // Add authentication and other headers here
  'content-type': 'application/json',
  'pulse-app': Cookie.get('pulse-app'),
  'csrf-token': csrfToken
}

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function
fetchQuery(
  operation,
  variables,) {
  // If CSRF token not found, get it before sending request to server
  if (!csrfToken) {
    csrfToken = Cookie.get('_csrf')
    headers['csrf-token'] = csrfToken
  }

  return fetch('/graphql', {
    method: 'POST',
    credentials: 'same-origin',
    headers,
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);

const environment = new Environment({
  network,
  store,
});

export default environment