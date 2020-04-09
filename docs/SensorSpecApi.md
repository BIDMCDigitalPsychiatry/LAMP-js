# LAMP.SensorSpec

Method | HTTP request | Description
------------- | ------------- | -------------
[**all**](SensorSpecApi.md#all) | **GET** /sensor_spec | Get all SensorSpecs registered.
[**create**](SensorSpecApi.md#create) | **POST** /sensor_spec | Create a new SensorSpec.
[**delete**](SensorSpecApi.md#delete) | **DELETE** /sensor_spec/{sensor_spec_name} | Delete an SensorSpec.
[**update**](SensorSpecApi.md#update) | **PUT** /sensor_spec/{sensor_spec_name} | Update an SensorSpec.
[**view**](SensorSpecApi.md#view) | **GET** /sensor_spec/{sensor_spec_name} | Get a SensorSpec.


# **all**
> array[object] all()

Get all SensorSpecs registered.

Get all SensorSpecs registered by any Researcher.

### Example
```javascript
import LAMP from 'lamp-core'

// Get all SensorSpecs registered.
const result = LAMP.SensorSpec.all()
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

# **create**
> character create(sensor.spec)

Create a new SensorSpec.

Create a new SensorSpec.

### Example
```javascript
import LAMP from 'lamp-core'

let sensor.spec = SensorSpec.new("name_example", 123) // SensorSpec 

// Create a new SensorSpec.
const result = LAMP.SensorSpec.create(sensor.spec)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sensor.spec** | [**SensorSpec**](SensorSpec.md)|  | 

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
> character delete(sensor.spec.name)

Delete an SensorSpec.

Delete an SensorSpec.

### Example
```javascript
import LAMP from 'lamp-core'

let sensor.spec.name = 'sensor.spec.name_example' // string 

// Delete an SensorSpec.
const result = LAMP.SensorSpec.delete(sensor.spec.name)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sensor.spec.name** | **string**|  | 

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
> character update(sensor.spec.name, sensor.spec)

Update an SensorSpec.

Update an SensorSpec.

### Example
```javascript
import LAMP from 'lamp-core'

let sensor.spec.name = 'sensor.spec.name_example' // string 
let sensor.spec = SensorSpec.new("name_example", 123) // SensorSpec 

// Update an SensorSpec.
const result = LAMP.SensorSpec.update(sensor.spec.name, sensor.spec)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sensor.spec.name** | **string**|  | 
 **sensor.spec** | [**SensorSpec**](SensorSpec.md)|  | 

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
> array[object] view(sensor.spec.name)

Get a SensorSpec.

Get a SensorSpec.

### Example
```javascript
import LAMP from 'lamp-core'

let sensor.spec.name = 'sensor.spec.name_example' // string 

// Get a SensorSpec.
const result = LAMP.SensorSpec.view(sensor.spec.name)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sensor.spec.name** | **string**|  | 
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

