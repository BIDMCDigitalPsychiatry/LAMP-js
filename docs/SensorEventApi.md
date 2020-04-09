# LAMP.SensorEvent

Method | HTTP request | Description
------------- | ------------- | -------------
[**allByParticipant**](SensorEventApi.md#allByParticipant) | **GET** /participant/{participant_id}/sensor_event | Get all sensor events for a participant.
[**allByResearcher**](SensorEventApi.md#allByResearcher) | **GET** /researcher/{researcher_id}/sensor_event | Get all sensor events for a researcher by participant.
[**allByStudy**](SensorEventApi.md#allByStudy) | **GET** /study/{study_id}/sensor_event | Get all sensor events for a study by participant.
[**create**](SensorEventApi.md#create) | **POST** /participant/{participant_id}/sensor_event | Create a new SensorEvent for the given Participant.
[**delete**](SensorEventApi.md#delete) | **DELETE** /participant/{participant_id}/sensor_event | Delete a sensor event.


# **allByParticipant**
> array[object] allByParticipant(participant_id, origin=let origin, from=let from, to=let to)

Get all sensor events for a participant.

Get the set of all sensor events produced by the given participant.

### Example
```javascript
import LAMP from 'lamp-core'

let participant_id = 'participant_id_example' // string 
let origin = 'origin_example' // string 
let from = 3.4 // number 
let to = 3.4 // number 

// Get all sensor events for a participant.
const result = LAMP.SensorEvent.allByParticipant(participant_id, origin=let origin, from=let from, to=let to)
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

Get all sensor events for a researcher by participant.

Get the set of all sensor events produced by participants of any  study conducted by a researcher, by researcher identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let researcher_id = 'researcher_id_example' // string 
let origin = 'origin_example' // string 
let from = 3.4 // number 
let to = 3.4 // number 

// Get all sensor events for a researcher by participant.
const result = LAMP.SensorEvent.allByResearcher(researcher_id, origin=let origin, from=let from, to=let to)
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

Get all sensor events for a study by participant.

Get the set of all sensor events produced by participants of a  single study, by study identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let study_id = 'study_id_example' // string 
let origin = 'origin_example' // string 
let from = 3.4 // number 
let to = 3.4 // number 

// Get all sensor events for a study by participant.
const result = LAMP.SensorEvent.allByStudy(study_id, origin=let origin, from=let from, to=let to)
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
> character create(participant_id, sensor.event)

Create a new SensorEvent for the given Participant.

Create a new SensorEvent for the given Participant.

### Example
```javascript
import LAMP from 'lamp-core'

let participant_id = 'participant_id_example' // string 
let sensor.event = SensorEvent.new(123, "sensor_example", 123) // SensorEvent 

// Create a new SensorEvent for the given Participant.
const result = LAMP.SensorEvent.create(participant_id, sensor.event)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **participant_id** | **string**|  | 
 **sensor.event** | [**SensorEvent**](SensorEvent.md)|  | 

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

Delete a sensor event.

Delete a sensor event.

### Example
```javascript
import LAMP from 'lamp-core'

let participant_id = 'participant_id_example' // string 
let origin = 'origin_example' // string 
let from = 3.4 // number 
let to = 3.4 // number 

// Delete a sensor event.
const result = LAMP.SensorEvent.delete(participant_id, origin=let origin, from=let from, to=let to)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **participant_id** | **string**|  | 
 **origin** | **string**|  | [optional] 
 **from** | **number**|  | [optional] 
 **to** | **number**|  | [optional] 

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

