# LAMP.Type

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAttachment**](TypeApi.md#getAttachment) | **GET** /type/{type_id}/attachment/{attachment_key} | 
[**getDynamicAttachment**](TypeApi.md#getDynamicAttachment) | **GET** /type/{type_id}/attachment/dynamic/{attachment_key} | 
[**listAttachments**](TypeApi.md#listAttachments) | **GET** /type/{type_id}/attachment | 
[**parent**](TypeApi.md#parent) | **GET** /type/{type_id}/parent | Find the owner(s) of the resource.
[**setAttachment**](TypeApi.md#setAttachment) | **PUT** /type/{type_id}/attachment/{attachment_key}/{target} | 
[**setDynamicAttachment**](TypeApi.md#setDynamicAttachment) | **PUT** /type/{type_id}/attachment/dynamic/{attachment_key}/{target} | 


# **getAttachment**
> object getAttachment(type_id, attachment_key)



### Example
```javascript
import LAMP from 'lamp-core'

let type_id = 'type_id_example' // string 
let attachment_key = 'attachment_key_example' // string 

const result = LAMP.Type.getAttachment(type_id, attachment_key)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type_id** | **string**|  | 
 **attachment_key** | **string**|  | 

### Return type

**object**

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

# **getDynamicAttachment**
> object getDynamicAttachment(type_id, attachment_key, invoke_always, include_logs, ignore_output)



### Example
```javascript
import LAMP from 'lamp-core'

let type_id = 'type_id_example' // string 
let attachment_key = 'attachment_key_example' // string 
let invoke_always = false // boolean 
let include_logs = false // boolean 
let ignore_output = false // boolean 

const result = LAMP.Type.getDynamicAttachment(type_id, attachment_key, invoke_always, include_logs, ignore_output)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type_id** | **string**|  | 
 **attachment_key** | **string**|  | 
 **invoke_always** | **boolean**|  | 
 **include_logs** | **boolean**|  | 
 **ignore_output** | **boolean**|  | 

### Return type

**object**

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

# **listAttachments**
> object listAttachments(type_id)



### Example
```javascript
import LAMP from 'lamp-core'

let type_id = 'type_id_example' // string 

const result = LAMP.Type.listAttachments(type_id)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type_id** | **string**|  | 

### Return type

**object**

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

# **parent**
> character parent(type_id)

Find the owner(s) of the resource.

Get the parent type identifier of the data structure referenced by the identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let type_id = 'type_id_example' // string 

// Find the owner(s) of the resource.
const result = LAMP.Type.parent(type_id)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type_id** | **string**|  | 
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

# **setAttachment**
> object setAttachment(type_id, target, attachment_key, body)



### Example
```javascript
import LAMP from 'lamp-core'

let type_id = 'type_id_example' // string 
let target = 'target_example' // string 
let attachment_key = 'attachment_key_example' // string 
let body = null // object 

const result = LAMP.Type.setAttachment(type_id, target, attachment_key, body)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type_id** | **string**|  | 
 **target** | **string**|  | 
 **attachment_key** | **string**|  | 
 **body** | **object**|  | 

### Return type

**object**

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

# **setDynamicAttachment**
> object setDynamicAttachment(type_id, target, attachment_key, invoke_once, dynamic.attachment)



### Example
```javascript
import LAMP from 'lamp-core'

let type_id = 'type_id_example' // string 
let target = 'target_example' // string 
let attachment_key = 'attachment_key_example' // string 
let invoke_once = 'invoke_once_example' // string 
let dynamic.attachment = DynamicAttachment.new("key_example", "from_example", "to_example", list(123), "language_example", "contents_example", list(123)) // DynamicAttachment 

const result = LAMP.Type.setDynamicAttachment(type_id, target, attachment_key, invoke_once, dynamic.attachment)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type_id** | **string**|  | 
 **target** | **string**|  | 
 **attachment_key** | **string**|  | 
 **invoke_once** | **string**|  | 
 **dynamic.attachment** | [**DynamicAttachment**](DynamicAttachment.md)|  | 

### Return type

**object**

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

