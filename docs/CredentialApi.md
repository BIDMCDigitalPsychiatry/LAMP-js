# LAMP.Credential

Method | HTTP request | Description
------------- | ------------- | -------------
[**create**](CredentialApi.md#create) | **POST** /type/{type_id}/credential | 
[**delete**](CredentialApi.md#delete) | **DELETE** /type/{type_id}/credential/{access_key} | 
[**list**](CredentialApi.md#list) | **GET** /type/{type_id}/credential | 
[**update**](CredentialApi.md#update) | **PUT** /type/{type_id}/credential/{access_key} | 


# **create**
> object create(type_id, body)



### Example
```javascript
import LAMP from 'lamp-core'

let type_id = 'type_id_example' // string 
let body = null // object 

const result = LAMP.Credential.create(type_id, body)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type_id** | **string**|  | 
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

# **delete**
> object delete(type_id, access_key)



### Example
```javascript
import LAMP from 'lamp-core'

let type_id = 'type_id_example' // string 
let access_key = 'access_key_example' // string 

const result = LAMP.Credential.delete(type_id, access_key)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type_id** | **string**|  | 
 **access_key** | **string**|  | 

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

# **list**
> object list(type_id)



### Example
```javascript
import LAMP from 'lamp-core'

let type_id = 'type_id_example' // string 

const result = LAMP.Credential.list(type_id)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type_id** | **string**|  | 
 **transform** | **string**|  | [optional] 

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

# **update**
> object update(type_id, access_key, body)



### Example
```javascript
import LAMP from 'lamp-core'

let type_id = 'type_id_example' // string 
let access_key = 'access_key_example' // string 
let body = null // object 

const result = LAMP.Credential.update(type_id, access_key, body)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **type_id** | **string**|  | 
 **access_key** | **string**|  | 
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

