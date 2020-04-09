# LAMP.Participant

Method | HTTP request | Description
------------- | ------------- | -------------
[**all**](ParticipantApi.md#all) | **GET** /participant | Get the set of all participants.
[**allByResearcher**](ParticipantApi.md#allByResearcher) | **GET** /researcher/{researcher_id}/participant | Get the set of all participants under a single researcher.
[**allByStudy**](ParticipantApi.md#allByStudy) | **GET** /study/{study_id}/participant | Get the set of all participants in a single study.
[**create**](ParticipantApi.md#create) | **POST** /study/{study_id}/participant | Create a new Participant for the given Study.
[**delete**](ParticipantApi.md#delete) | **DELETE** /participant/{participant_id} | Delete a participant AND all owned data or event streams.
[**update**](ParticipantApi.md#update) | **PUT** /participant/{participant_id} | Update a Participant&#39;s settings.
[**view**](ParticipantApi.md#view) | **GET** /participant/{participant_id} | Get a single participant, by identifier.


# **all**
> array[object] all()

Get the set of all participants.

Get the set of all participants.

### Example
```javascript
import LAMP from 'lamp-core'

// Get the set of all participants.
const result = LAMP.Participant.all()
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
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
> array[object] allByResearcher(researcher_id)

Get the set of all participants under a single researcher.

Get the set of all participants under a single researcher.

### Example
```javascript
import LAMP from 'lamp-core'

let researcher_id = 'researcher_id_example' // string 

// Get the set of all participants under a single researcher.
const result = LAMP.Participant.allByResearcher(researcher_id)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **researcher_id** | **string**|  | 
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
> array[object] allByStudy(study_id)

Get the set of all participants in a single study.

Get the set of all participants in a single study.

### Example
```javascript
import LAMP from 'lamp-core'

let study_id = 'study_id_example' // string 

// Get the set of all participants in a single study.
const result = LAMP.Participant.allByStudy(study_id)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **study_id** | **string**|  | 
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
> character create(study_id, participant)

Create a new Participant for the given Study.

Create a new Participant for the given Study.

### Example
```javascript
import LAMP from 'lamp-core'

let study_id = 'study_id_example' // string 
let participant = Participant.new("id_example", "study_code_example", "language_example", "theme_example", "emergency_contact_example", "helpline_example") // Participant 

// Create a new Participant for the given Study.
const result = LAMP.Participant.create(study_id, participant)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **study_id** | **string**|  | 
 **participant** | [**Participant**](Participant.md)|  | 

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
> character delete(participant_id)

Delete a participant AND all owned data or event streams.

Delete a participant AND all owned data or event streams.

### Example
```javascript
import LAMP from 'lamp-core'

let participant_id = 'participant_id_example' // string 

// Delete a participant AND all owned data or event streams.
const result = LAMP.Participant.delete(participant_id)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **participant_id** | **string**|  | 

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

# **update**
> character update(participant_id, participant)

Update a Participant's settings.

Update a Participant's settings.

### Example
```javascript
import LAMP from 'lamp-core'

let participant_id = 'participant_id_example' // string 
let participant = Participant.new("id_example", "study_code_example", "language_example", "theme_example", "emergency_contact_example", "helpline_example") // Participant 

// Update a Participant's settings.
const result = LAMP.Participant.update(participant_id, participant)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **participant_id** | **string**|  | 
 **participant** | [**Participant**](Participant.md)|  | 

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

# **view**
> array[object] view(participant_id)

Get a single participant, by identifier.

Get a single participant, by identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let participant_id = 'participant_id_example' // string 

// Get a single participant, by identifier.
const result = LAMP.Participant.view(participant_id)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **participant_id** | **string**|  | 
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

