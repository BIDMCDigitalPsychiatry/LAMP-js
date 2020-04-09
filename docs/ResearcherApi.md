# LAMP.Researcher

Method | HTTP request | Description
------------- | ------------- | -------------
[**all**](ResearcherApi.md#all) | **GET** /researcher | Get the set of all researchers.
[**create**](ResearcherApi.md#create) | **POST** /researcher | Create a new Researcher.
[**delete**](ResearcherApi.md#delete) | **DELETE** /researcher/{researcher_id} | Delete a researcher.
[**update**](ResearcherApi.md#update) | **PUT** /researcher/{researcher_id} | Update a Researcher&#39;s settings.
[**view**](ResearcherApi.md#view) | **GET** /researcher/{researcher_id} | Get a single researcher, by identifier.


# **all**
> array[object] all()

Get the set of all researchers.

Get the set of all researchers.

### Example
```javascript
import LAMP from 'lamp-core'

// Get the set of all researchers.
const result = LAMP.Researcher.all()
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
> character create(researcher)

Create a new Researcher.

Create a new Researcher.

### Example
```javascript
import LAMP from 'lamp-core'

let researcher = Researcher.new("id_example", "name_example", "email_example", "address_example", list(123)) // Researcher 

// Create a new Researcher.
const result = LAMP.Researcher.create(researcher)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **researcher** | [**Researcher**](Researcher.md)|  | 

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
> character delete(researcher_id)

Delete a researcher.

Delete a researcher.

### Example
```javascript
import LAMP from 'lamp-core'

let researcher_id = 'researcher_id_example' // string 

// Delete a researcher.
const result = LAMP.Researcher.delete(researcher_id)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **researcher_id** | **string**|  | 

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
> character update(researcher_id, researcher)

Update a Researcher's settings.

Update a Researcher's settings.

### Example
```javascript
import LAMP from 'lamp-core'

let researcher_id = 'researcher_id_example' // string 
let researcher = Researcher.new("id_example", "name_example", "email_example", "address_example", list(123)) // Researcher 

// Update a Researcher's settings.
const result = LAMP.Researcher.update(researcher_id, researcher)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **researcher_id** | **string**|  | 
 **researcher** | [**Researcher**](Researcher.md)|  | 
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

# **view**
> array[object] view(researcher_id)

Get a single researcher, by identifier.

Get a single researcher, by identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let researcher_id = 'researcher_id_example' // string 

// Get a single researcher, by identifier.
const result = LAMP.Researcher.view(researcher_id)
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

