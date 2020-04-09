# LAMP.ActivityEvent

Method | HTTP request | Description
------------- | ------------- | -------------
[**allByParticipant**](ActivityEventApi.md#allByParticipant) | **GET** /participant/{participant_id}/activity_event | Get all activity events for a participant.
[**allByResearcher**](ActivityEventApi.md#allByResearcher) | **GET** /researcher/{researcher_id}/activity_event | Get all activity events for a researcher by participant.
[**allByStudy**](ActivityEventApi.md#allByStudy) | **GET** /study/{study_id}/activity_event | Get all activity events for a study by participant.
[**create**](ActivityEventApi.md#create) | **POST** /participant/{participant_id}/activity_event | Create a new ActivityEvent for the given Participant.
[**delete**](ActivityEventApi.md#delete) | **DELETE** /participant/{participant_id}/activity_event | Delete a ActivityEvent.


# **allByParticipant**
> array[object] allByParticipant(participant_id, origin=let origin, from=let from, to=let to)

Get all activity events for a participant.

Get the set of all activity events produced by a given participant,  by identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let participant_id = 'participant_id_example' // string 
let origin = 'origin_example' // string 
let from = 3.4 // number 
let to = 3.4 // number 

// Get all activity events for a participant.
const result = LAMP.ActivityEvent.allByParticipant(participant_id, origin=let origin, from=let from, to=let to)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **participant_id** | **string**|  | 
 **origin** | **string**|  | [optional] 
 **from** | **number**|  | [optional] 
 **to** | **number**|  | [optional] 
 **transform** | **string**|  | [optional] 

### Return type

**array[object]**

### HTTP request headers

 - **Content-Type**: `application/json`
 - **Accept**: `application/json`

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 Success |  -  |
| **400** | 400 Bad Request |  -  |
| **403** | 403 Authorization Failed |  -  |
| **404** | 404 Not Found |  -  |
| **0** | 500 Internal Error |  -  |

# **allByResearcher**
> array[object] allByResearcher(researcher_id, origin=let origin, from=let from, to=let to)

Get all activity events for a researcher by participant.

Get the set of all activity events produced by participants of any  study conducted by a researcher, by researcher identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let researcher_id = 'researcher_id_example' // string 
let origin = 'origin_example' // string 
let from = 3.4 // number 
let to = 3.4 // number 

// Get all activity events for a researcher by participant.
const result = LAMP.ActivityEvent.allByResearcher(researcher_id, origin=let origin, from=let from, to=let to)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **researcher_id** | **string**|  | 
 **origin** | **string**|  | [optional] 
 **from** | **number**|  | [optional] 
 **to** | **number**|  | [optional] 
 **transform** | **string**|  | [optional] 

### Return type

**array[object]**

### HTTP request headers

 - **Content-Type**: `application/json`
 - **Accept**: `application/json`

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 Success |  -  |
| **400** | 400 Bad Request |  -  |
| **403** | 403 Authorization Failed |  -  |
| **404** | 404 Not Found |  -  |
| **0** | 500 Internal Error |  -  |

# **allByStudy**
> array[object] allByStudy(study_id, origin=let origin, from=let from, to=let to)

Get all activity events for a study by participant.

Get the set of all activity events produced by participants of a  single study, by study identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let study_id = 'study_id_example' // string 
let origin = 'origin_example' // string 
let from = 3.4 // number 
let to = 3.4 // number 

// Get all activity events for a study by participant.
const result = LAMP.ActivityEvent.allByStudy(study_id, origin=let origin, from=let from, to=let to)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **study_id** | **string**|  | 
 **origin** | **string**|  | [optional] 
 **from** | **number**|  | [optional] 
 **to** | **number**|  | [optional] 
 **transform** | **string**|  | [optional] 

### Return type

**array[object]**

### HTTP request headers

 - **Content-Type**: `application/json`
 - **Accept**: `application/json`

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 Success |  -  |
| **400** | 400 Bad Request |  -  |
| **403** | 403 Authorization Failed |  -  |
| **404** | 404 Not Found |  -  |
| **0** | 500 Internal Error |  -  |

# **create**
> character create(participant_id, activity.event)

Create a new ActivityEvent for the given Participant.

Create a new ActivityEvent for the given Participant.

### Example
```javascript
import LAMP from 'lamp-core'

let participant_id = 'participant_id_example' // string 
let activity.event = ActivityEvent.new(123, 123, "activity_example", 123, list(123)) // ActivityEvent 

// Create a new ActivityEvent for the given Participant.
const result = LAMP.ActivityEvent.create(participant_id, activity.event)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **participant_id** | **string**|  | 
 **activity.event** | [**ActivityEvent**](ActivityEvent.md)|  | 

### Return type

**string**

### HTTP request headers

 - **Content-Type**: `application/json`
 - **Accept**: `application/json`

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 Success |  -  |
| **400** | 400 Bad Request |  -  |
| **403** | 403 Authorization Failed |  -  |
| **404** | 404 Not Found |  -  |
| **0** | 500 Internal Error |  -  |

# **delete**
> character delete(participant_id, origin=let origin, from=let from, to=let to)

Delete a ActivityEvent.

Delete a ActivityEvent.

### Example
```javascript
import LAMP from 'lamp-core'

let participant_id = 'participant_id_example' // string 
let origin = 'origin_example' // string 
let from = 3.4 // number 
let to = 3.4 // number 

// Delete a ActivityEvent.
const result = LAMP.ActivityEvent.delete(participant_id, origin=let origin, from=let from, to=let to)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **participant_id** | **string**|  | 
 **origin** | **string**|  | [optional] 
 **from** | **number**|  | [optional] 
 **to** | **number**|  | [optional] 
 **transform** | **string**|  | [optional] 

### Return type

**string**

### HTTP request headers

 - **Content-Type**: `application/json`
 - **Accept**: `application/json`

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 Success |  -  |
| **400** | 400 Bad Request |  -  |
| **403** | 403 Authorization Failed |  -  |
| **404** | 404 Not Found |  -  |
| **0** | 500 Internal Error |  -  |

