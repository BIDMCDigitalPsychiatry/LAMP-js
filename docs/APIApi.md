# LAMP.API

Method | HTTP request | Description
------------- | ------------- | -------------
[**query**](APIApi.md#query) | **POST** / | Query the LAMP Database.
[**schema**](APIApi.md#schema) | **GET** / | View the API schema document.


# **query**
> object query(body)

Query the LAMP Database.

Query the LAMP Database using a transformation document. All GET operations in this API schema document are available by replacing the period with an underscore (i.e. `.Participant_view(...)` instead of `Participant.view(...)`). The `origin`, `from`, and `to` parameters of EventStream functions are preserved but the `transform` parameter is not.

### Example
```javascript
import LAMP from 'lamp-core'

// Query the LAMP Database.
const result = LAMP.API.query(`jsonata_query_example`)
console.dir(result)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | **string**|  | 

### Return type

**object**

### HTTP request headers

 - **Content-Type**: text/plain, application/json
 - **Accept**: `application/json`

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 Success |  -  |
| **0** | 400 Bad Request |  -  |

# **schema**
> object schema()

View the API schema document.

View this API schema document from a live server instance.

### Example
```javascript
import LAMP from 'lamp-core'

// View the API schema document.
const result = LAMP.API.schema()
console.dir(result)
```

### Parameters
This endpoint does not need any parameter.

### Return type

**object**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: `application/json`
 - **Accept**: `application/json`

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
| **200** | 200 Success |  -  |

