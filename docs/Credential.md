# LAMP.Credential

Every object can have one or more credential(s) associated with it. (i.e. `my_researcher.credentials = ['person A', 'person B', 'api A'', 'person C', 'api B']`)
## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**origin** | **string** | The root object this credential is attached to. The scope of this credential is limited to the object itself and any children. | [optional] 
**access_key** | **string** | Username or machine-readable public key (access). | [optional] 
**secret_key** | **string** | SALTED HASH OF Password or machine-readable private key (secret). | [optional] 
**description** | **string** | The user-visible description of the credential. | [optional] 


