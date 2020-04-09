# LAMP.Sensor

Method | HTTP request | Description
------------- | ------------- | -------------
[**all**](SensorApi.md#all) | **GET** /sensor | Get the set of all sensors.
[**allByParticipant**](SensorApi.md#allByParticipant) | **GET** /participant/{participant_id}/sensor | Get all sensors for a participant.
[**allByResearcher**](SensorApi.md#allByResearcher) | **GET** /researcher/{researcher_id}/sensor | Get all sensors for a researcher.
[**allByStudy**](SensorApi.md#allByStudy) | **GET** /study/{study_id}/sensor | View all sensors in a study.
[**create**](SensorApi.md#create) | **POST** /study/{study_id}/sensor | Create a new Sensor under the given Study.
[**delete**](SensorApi.md#delete) | **DELETE** /sensor/{sensor_id} | Delete a Sensor.
[**update**](SensorApi.md#update) | **PUT** /sensor/{sensor_id} | Update an Sensor&#39;s settings.
[**view**](SensorApi.md#view) | **GET** /sensor/{sensor_id} | Get a single sensor, by identifier.


# **all**
> array[object] all()

Get the set of all sensors.

Get the set of all sensors.

### Example
```javascript
import LAMP from 'lamp-core'

// Get the set of all sensors.
const result = LAMP.Sensor.all()
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

Get all sensors for a participant.

Get the set of all sensors available to a participant, by participant  identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let participant_id = 'participant_id_example' // string 

// Get all sensors for a participant.
const result = LAMP.Sensor.allByParticipant(participant_id)
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

Get all sensors for a researcher.

Get the set of all sensors available to participants of any study conducted  by a researcher, by researcher identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let researcher_id = 'researcher_id_example' // string 

// Get all sensors for a researcher.
const result = LAMP.Sensor.allByResearcher(researcher_id)
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

View all sensors in a study.

Get the set of all sensors available to participants of a single  study, by study identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let study_id = 'study_id_example' // string 

// View all sensors in a study.
const result = LAMP.Sensor.allByStudy(study_id)
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
> character create(study_id, sensor)

Create a new Sensor under the given Study.

Create a new Sensor under the given Study.

### Example
```javascript
import LAMP from 'lamp-core'

let study_id = 'study_id_example' // string 
let sensor = Sensor.new("id_example", "spec_example", "name_example", 123) // Sensor 

// Create a new Sensor under the given Study.
const result = LAMP.Sensor.create(study_id, sensor)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **study_id** | **string**|  | 
 **sensor** | [**Sensor**](Sensor.md)|  | 

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
> character delete(sensor_id)

Delete a Sensor.

Delete a Sensor.

### Example
```javascript
import LAMP from 'lamp-core'

let sensor_id = 'sensor_id_example' // string 

// Delete a Sensor.
const result = LAMP.Sensor.delete(sensor_id)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sensor_id** | **string**|  | 

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
> character update(sensor_id, sensor)

Update an Sensor's settings.

Update an Sensor's settings.

### Example
```javascript
import LAMP from 'lamp-core'

let sensor_id = 'sensor_id_example' // string 
let sensor = Sensor.new("id_example", "spec_example", "name_example", 123) // Sensor 

// Update an Sensor's settings.
const result = LAMP.Sensor.update(sensor_id, sensor)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sensor_id** | **string**|  | 
 **sensor** | [**Sensor**](Sensor.md)|  | 

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
> array[object] view(sensor_id)

Get a single sensor, by identifier.

Get a single sensor, by identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let sensor_id = 'sensor_id_example' // string 

// Get a single sensor, by identifier.
const result = LAMP.Sensor.view(sensor_id)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sensor_id** | **string**|  | 
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

