# LAMP.ActivitySpec

Method | HTTP request | Description
------------- | ------------- | -------------
[**all**](ActivitySpecApi.md#all) | **GET** /activity_spec | Get all ActivitySpecs registered.
[**create**](ActivitySpecApi.md#create) | **POST** /activity_spec | Create a new ActivitySpec.
[**delete**](ActivitySpecApi.md#delete) | **DELETE** /activity_spec/{activity_spec_name} | Delete an ActivitySpec.
[**update**](ActivitySpecApi.md#update) | **PUT** /activity_spec/{activity_spec_name} | Update an ActivitySpec.
[**view**](ActivitySpecApi.md#view) | **GET** /activity_spec/{activity_spec_name} | View an ActivitySpec.


# **all**
> array[object] all()

Get all ActivitySpecs registered.

Get all ActivitySpecs registered.

### Example
```javascript
import LAMP from 'lamp-core'

// Get all ActivitySpecs registered.
const result = LAMP.ActivitySpec.all()
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
> character create(activity.spec)

Create a new ActivitySpec.

Create a new ActivitySpec.

### Example
```javascript
import LAMP from 'lamp-core'

let activity.spec = ActivitySpec.new("name_example", "help_contents_example", "script_contents_example", 123, 123, 123) // ActivitySpec 

// Create a new ActivitySpec.
const result = LAMP.ActivitySpec.create(activity.spec)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activity.spec** | [**ActivitySpec**](ActivitySpec.md)|  | 

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
> character delete(activity.spec.name)

Delete an ActivitySpec.

Delete an ActivitySpec.

### Example
```javascript
import LAMP from 'lamp-core'

let activity.spec.name = 'activity.spec.name_example' // string 

// Delete an ActivitySpec.
const result = LAMP.ActivitySpec.delete(activity.spec.name)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activity.spec.name** | **string**|  | 

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
> character update(activity.spec.name, activity.spec)

Update an ActivitySpec.

Update an ActivitySpec.

### Example
```javascript
import LAMP from 'lamp-core'

let activity.spec.name = 'activity.spec.name_example' // string 
let activity.spec = ActivitySpec.new("name_example", "help_contents_example", "script_contents_example", 123, 123, 123) // ActivitySpec 

// Update an ActivitySpec.
const result = LAMP.ActivitySpec.update(activity.spec.name, activity.spec)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activity.spec.name** | **string**|  | 
 **activity.spec** | [**ActivitySpec**](ActivitySpec.md)|  | 

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
> character view(activity.spec.name)

View an ActivitySpec.

View an ActivitySpec.

### Example
```javascript
import LAMP from 'lamp-core'

let activity.spec.name = 'activity.spec.name_example' // string 

// View an ActivitySpec.
const result = LAMP.ActivitySpec.view(activity.spec.name)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **activity.spec.name** | **string**|  | 
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

