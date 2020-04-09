# LAMP.Activity

Method | HTTP request | Description
------------- | ------------- | -------------
[**all**](ActivityApi.md#all) | **GET** /activity | Get the set of all activities.
[**allByParticipant**](ActivityApi.md#allByParticipant) | **GET** /participant/{participant_id}/activity | Get all activities for a participant.
[**allByResearcher**](ActivityApi.md#allByResearcher) | **GET** /researcher/{researcher_id}/activity | Get all activities for a researcher.
[**allByStudy**](ActivityApi.md#allByStudy) | **GET** /study/{study_id}/activity | Get all activities in a study.
[**create**](ActivityApi.md#create) | **POST** /study/{study_id}/activity | Create a new Activity under the given Study.
[**delete**](ActivityApi.md#delete) | **DELETE** /activity/{activity_id} | Delete an Activity.
[**update**](ActivityApi.md#update) | **PUT** /activity/{activity_id} | Update an Activity&#39;s settings.
[**view**](ActivityApi.md#view) | **GET** /activity/{activity_id} | Get a single activity, by identifier.


# **all**
> array[object] all()

Get the set of all activities.

Get the set of all activities.

### Example
```javascript
import LAMP from 'lamp-core'

// Get the set of all activities.
const result = LAMP.Activity.all()
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

# **allByParticipant**
> array[object] allByParticipant(participant_id)

Get all activities for a participant.

Get the set of all activities available to a participant, by  participant identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let participant_id = 'participant_id_example' // string 

// Get all activities for a participant.
const result = LAMP.Activity.allByParticipant(participant_id)
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

# **allByResearcher**
> array[object] allByResearcher(researcher_id)

Get all activities for a researcher.

Get the set of all activities available to participants of any study  conducted by a researcher, by researcher identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let researcher_id = 'researcher_id_example' // string 

// Get all activities for a researcher.
const result = LAMP.Activity.allByResearcher(researcher_id)
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

Get all activities in a study.

Get the set of all activities available to  participants of a single  study, by study identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let study_id = 'study_id_example' // string 

// Get all activities in a study.
const result = LAMP.Activity.allByStudy(study_id)
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
> character create(study_id, activity)

Create a new Activity under the given Study.

Create a new Activity under the given Study.

### Example
```javascript
import LAMP from 'lamp-core'

let study_id = 'study_id_example' // string 
let activity = Activity.new("id_example", "spec_example", "name_example", DurationIntervalLegacy.new("repeat_type_example", 123, list(123)), 123) // Activity 

// Create a new Activity under the given Study.
const result = LAMP.Activity.create(study_id, activity)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **study_id** | **string**|  | 
 **activity** | [**Activity**](Activity.md)|  | 

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
> character delete(activity_id)

Delete an Activity.

Delete an Activity.

### Example
```javascript
import LAMP from 'lamp-core'

let activity_id = 'activity_id_example' // string 

// Delete an Activity.
const result = LAMP.Activity.delete(activity_id)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activity_id** | **string**|  | 

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
> character update(activity_id, activity)

Update an Activity's settings.

Update an Activity's settings.

### Example
```javascript
import LAMP from 'lamp-core'

let activity_id = 'activity_id_example' // string 
let activity = Activity.new("id_example", "spec_example", "name_example", DurationIntervalLegacy.new("repeat_type_example", 123, list(123)), 123) // Activity 

// Update an Activity's settings.
const result = LAMP.Activity.update(activity_id, activity)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activity_id** | **string**|  | 
 **activity** | [**Activity**](Activity.md)|  | 

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
> array[object] view(activity_id)

Get a single activity, by identifier.

Get a single activity, by identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let activity_id = 'activity_id_example' // string 

// Get a single activity, by identifier.
const result = LAMP.Activity.view(activity_id)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activity_id** | **string**|  | 
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

