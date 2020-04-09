# LAMP.DynamicAttachment

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**key** | **string** | The key. | [optional] 
**from** | **string** | A globally unique reference for objects. | [optional] 
**to** | **string** | Either \&quot;me\&quot; to apply to the attachment owner only, the ID of an object owned  by the attachment owner, or a string representing the child object type to apply to. | [optional] 
**triggers** | **array[object]** | The API triggers that activate script execution. These will be event stream types  or object types in the API, or, if scheduling execution periodically, a cron-job string  prefixed with \&quot;!\&quot; (exclamation point). | [optional] 
**language** | **string** | The script language. | [optional] 
**contents** | **string** | The script contents. | [optional] 
**requirements** | **array[object]** | The script requirements. | [optional] 


