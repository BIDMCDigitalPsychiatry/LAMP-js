# LAMP.ActivitySpec

The ActivitySpec determines the parameters and properties of an Activity and its corresponding generated ActivityEvents.
## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | The name of the activity spec. | [optional] 
**help_contents** | **string** | Either a binary blob containing a document or video, or a string containing  instructional aid about the Activity. | [optional] 
**script_contents** | **string** | The WebView-compatible script that provides this Activity on mobile or desktop (IFrame) clients. | [optional] 
**static_data_schema** | [**object**](.md) | The static data definition of an ActivitySpec. | [optional] 
**temporal_event_schema** | [**object**](.md) | The temporal event data definition of an ActivitySpec. | [optional] 
**settings_schema** | [**object**](.md) | The Activity settings definition of an ActivitySpec. | [optional] 


