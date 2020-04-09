# LAMP.Study

Method | HTTP request | Description
------------- | ------------- | -------------
[**all**](StudyApi.md#all) | **GET** /study | Get the set of all studies.
[**allByResearcher**](StudyApi.md#allByResearcher) | **GET** /researcher/{researcher_id}/study | Get the set of studies for a single researcher.
[**create**](StudyApi.md#create) | **POST** /researcher/{researcher_id}/study | Create a new Study for the given Researcher.
[**delete**](StudyApi.md#delete) | **DELETE** /study/{study_id} | Delete a study.
[**update**](StudyApi.md#update) | **PUT** /study/{study_id} | Update the study.
[**view**](StudyApi.md#view) | **GET** /study/{study_id} | Get a single study, by identifier.


# **all**
> array[object] all()

Get the set of all studies.

Get the set of all studies.

### Example
```javascript
import LAMP from 'lamp-core'

// Get the set of all studies.
const result = LAMP.Study.all()
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

Get the set of studies for a single researcher.

Get the set of studies for a single researcher.

### Example
```javascript
import LAMP from 'lamp-core'

let researcher_id = 'researcher_id_example' // string 

// Get the set of studies for a single researcher.
const result = LAMP.Study.allByResearcher(researcher_id)
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

# **create**
> character create(researcher_id, study)

Create a new Study for the given Researcher.

Create a new Study for the given Researcher.

### Example
```javascript
import LAMP from 'lamp-core'

let researcher_id = 'researcher_id_example' // string 
let study = Study.new("id_example", "name_example", list(123), list(123)) // Study 

// Create a new Study for the given Researcher.
const result = LAMP.Study.create(researcher_id, study)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **researcher_id** | **string**|  | 
 **study** | [**Study**](Study.md)|  | 

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
> character delete(study_id)

Delete a study.

Delete a study.

### Example
```javascript
import LAMP from 'lamp-core'

let study_id = 'study_id_example' // string 

// Delete a study.
const result = LAMP.Study.delete(study_id)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **study_id** | **string**|  | 

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
> character update(study_id, study)

Update the study.

Update the study.

### Example
```javascript
import LAMP from 'lamp-core'

let study_id = 'study_id_example' // string 
let study = Study.new("id_example", "name_example", list(123), list(123)) // Study 

// Update the study.
const result = LAMP.Study.update(study_id, study)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **study_id** | **string**|  | 
 **study** | [**Study**](Study.md)|  | 

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
> array[object] view(study_id)

Get a single study, by identifier.

Get a single study, by identifier.

### Example
```javascript
import LAMP from 'lamp-core'

let study_id = 'study_id_example' // string 

// Get a single study, by identifier.
const result = LAMP.Study.view(study_id)
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

