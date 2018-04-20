import createHistory from "history/createBrowserHistory";

const history = createHistory();

// Listen for changes to the current location.
export const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, history.location.pathname, history.location.state)
});

export default history;
