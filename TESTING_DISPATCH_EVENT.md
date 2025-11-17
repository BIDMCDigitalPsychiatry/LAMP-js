# Testing LAMP.dispatchEvent in Browser Console

## Overview
`LAMP.dispatchEvent` is an event system that allows components to communicate via custom events. You can test it directly from the browser console when the LAMP-dashboard is running.

## Basic Usage

### 1. Add an Event Listener
```javascript
// Listen for a custom event
LAMP.addEventListener("MY_TEST_EVENT", (event) => {
  console.log("Event received:", event.detail);
});

// Listen for LOGIN events (already used by LAMP)
LAMP.addEventListener("LOGIN", (event) => {
  console.log("Login event:", event.detail);
  console.log("Identity:", event.detail.identityObject);
  console.log("Server:", event.detail.serverAddress);
});

// Listen for LOGOUT events
LAMP.addEventListener("LOGOUT", (event) => {
  console.log("Logout event:", event.detail);
});
```

### 2. Dispatch a Test Event
```javascript
// Dispatch a simple test event
LAMP.dispatchEvent("MY_TEST_EVENT", { message: "Hello from console!" });

// Dispatch with more complex data
LAMP.dispatchEvent("MY_TEST_EVENT", {
  timestamp: Date.now(),
  data: { key: "value" },
  user: "test-user"
});
```

### 3. Remove an Event Listener
```javascript
// Create a named function for the listener
const myHandler = (event) => {
  console.log("Event:", event.detail);
};

// Add listener
LAMP.addEventListener("MY_TEST_EVENT", myHandler);

// Remove listener
LAMP.removeEventListener("MY_TEST_EVENT", myHandler);
```

## Testing Existing Events

### Test LOGIN Event
```javascript
// Add listener first
LAMP.addEventListener("LOGIN", (event) => {
  console.log("LOGIN Event Details:", event.detail);
});

// Trigger login (this will also dispatch LOGIN event automatically)
// But you can also manually test it:
LAMP.dispatchEvent("LOGIN", {
  authorizationToken: "test:token",
  identityObject: { id: "test-user", name: "Test User" },
  serverAddress: "https://api.lamp.digital",
  accessToken: "access-token",
  refreshToken: "refresh-token"
});
```

### Test LOGOUT Event
```javascript
// Add listener
LAMP.addEventListener("LOGOUT", (event) => {
  console.log("LOGOUT Event:", event.detail);
});

// Dispatch logout
LAMP.dispatchEvent("LOGOUT", {
  deleteCache: true
});
```

## Complete Testing Example

```javascript
// Step 1: Set up listeners for all events you want to test
const eventLog = [];

// Generic event logger
const logEvent = (eventName) => (event) => {
  const logEntry = {
    event: eventName,
    timestamp: new Date().toISOString(),
    detail: event.detail
  };
  eventLog.push(logEntry);
  console.log(`[${eventName}]`, logEntry);
};

// Add listeners
LAMP.addEventListener("LOGIN", logEvent("LOGIN"));
LAMP.addEventListener("LOGOUT", logEvent("LOGOUT"));
LAMP.addEventListener("MY_TEST_EVENT", logEvent("MY_TEST_EVENT"));

// Step 2: Dispatch test events
LAMP.dispatchEvent("MY_TEST_EVENT", { test: "data" });
LAMP.dispatchEvent("LOGIN", { 
  identityObject: { id: "test" },
  serverAddress: "https://test.com"
});

// Step 3: View all logged events
console.log("All Events:", eventLog);

// Step 4: Check if LAMP object is available
console.log("LAMP object:", LAMP);
console.log("LAMP.dispatchEvent:", LAMP.dispatchEvent);
console.log("LAMP.addEventListener:", LAMP.addEventListener);
```

## Debugging Tips

### Check if LAMP is loaded
```javascript
// In browser console
typeof LAMP !== 'undefined' && LAMP.dispatchEvent
// Should return: function dispatchEvent() { ... }
```

### Monitor all dispatched events
```javascript
// Override dispatchEvent temporarily to log all events
const originalDispatch = LAMP.dispatchEvent;
LAMP.dispatchEvent = function(event, detail) {
  console.log("Dispatching:", event, detail);
  return originalDispatch.call(this, event, detail);
};

// Now all events will be logged
LAMP.dispatchEvent("TEST", { data: "test" });

// Restore original
LAMP.dispatchEvent = originalDispatch;
```

### Check event bus
```javascript
// The internal event bus is a DOM element
// You can inspect it (though it's private)
// Events are dispatched using CustomEvent API
```

## Common Use Cases

### 1. Test Activity Completion Events
```javascript
LAMP.addEventListener("ACTIVITY_COMPLETE", (event) => {
  console.log("Activity completed:", event.detail);
});

LAMP.dispatchEvent("ACTIVITY_COMPLETE", {
  activityId: "test-activity-123",
  participantId: "test-participant",
  timestamp: Date.now()
});
```

### 2. Test Data Sync Events
```javascript
LAMP.addEventListener("DATA_SYNC", (event) => {
  console.log("Data synced:", event.detail);
});

LAMP.dispatchEvent("DATA_SYNC", {
  type: "activities",
  count: 10,
  timestamp: Date.now()
});
```

## Notes
- Events use the browser's native CustomEvent API
- The event bus is an internal HTMLElement (`_bus`)
- Events are synchronous - listeners are called immediately
- Multiple listeners can be attached to the same event
- Event details are passed in the `detail` property of the event object

