# JavaScript & TypeScript API client for the LAMP Platform

## Overview
This API client is used to connect to the LAMP Platform from the JavaScript and TypeScript programming languages. [Visit our documentation for more information about the LAMP Platform.](https://docs.lamp.digital/)

## Installation

### Prerequisites

Install the package directly from the GitHub repository.

```sh
npm i lamp-core
```

### Configuration

Ensure your `serverAddress` is set correctly. If using the default server, it will be `api.lamp.digital`. Keep your `accessKey` (sometimes an email address) and `secretKey` (sometimes a password) private and do not share them with others.

To make requests using `http`, enable dev mode before attempting to connect to a server. 

**Warning:** Dev mode should only be used for local development!

```javascript
import LAMP from 'lamp-core'
LAMP.enableDevMode()    // optional
await LAMP.connect({ serverAddress: '...', accessKey: '...', secretKey: '...' })
```

## API Endpoints

All URIs are relative to the `serverAddress` (by default, `api.lamp.digital`).

The protocol defaults to `https` but `http` can be used with dev mode enabled.

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*LAMP.API* | [**query**](docs/APIApi.md#query) | **POST** / | Query the LAMP Database.
*LAMP.API* | [**schema**](docs/APIApi.md#schema) | **GET** / | View the API schema document.
*LAMP.Activity* | [**all**](docs/ActivityApi.md#all) | **GET** /activity | Get the set of all activities.
*LAMP.Activity* | [**allByParticipant**](docs/ActivityApi.md#allByParticipant) | **GET** /participant/{participant_id}/activity | Get all activities for a participant.
*LAMP.Activity* | [**allByResearcher**](docs/ActivityApi.md#allByResearcher) | **GET** /researcher/{researcher_id}/activity | Get all activities for a researcher.
*LAMP.Activity* | [**allByStudy**](docs/ActivityApi.md#allByStudy) | **GET** /study/{study_id}/activity | Get all activities in a study.
*LAMP.Activity* | [**create**](docs/ActivityApi.md#create) | **POST** /study/{study_id}/activity | Create a new Activity under the given Study.
*LAMP.Activity* | [**delete**](docs/ActivityApi.md#delete) | **DELETE** /activity/{activity_id} | Delete an Activity.
*LAMP.Activity* | [**update**](docs/ActivityApi.md#update) | **PUT** /activity/{activity_id} | Update an Activity's settings.
*LAMP.Activity* | [**view**](docs/ActivityApi.md#view) | **GET** /activity/{activity_id} | Get a single activity, by identifier.
*LAMP.ActivityEvent* | [**allByParticipant**](docs/ActivityEventApi.md#allByParticipant) | **GET** /participant/{participant_id}/activity_event | Get all activity events for a participant.
*LAMP.ActivityEvent* | [**allByResearcher**](docs/ActivityEventApi.md#allByResearcher) | **GET** /researcher/{researcher_id}/activity_event | Get all activity events for a researcher by participant.
*LAMP.ActivityEvent* | [**allByStudy**](docs/ActivityEventApi.md#allByStudy) | **GET** /study/{study_id}/activity_event | Get all activity events for a study by participant.
*LAMP.ActivityEvent* | [**create**](docs/ActivityEventApi.md#create) | **POST** /participant/{participant_id}/activity_event | Create a new ActivityEvent for the given Participant.
*LAMP.ActivityEvent* | [**delete**](docs/ActivityEventApi.md#delete) | **DELETE** /participant/{participant_id}/activity_event | Delete a ActivityEvent.
*LAMP.ActivitySpec* | [**all**](docs/ActivitySpecApi.md#all) | **GET** /activity_spec | Get all ActivitySpecs registered.
*LAMP.ActivitySpec* | [**create**](docs/ActivitySpecApi.md#create) | **POST** /activity_spec | Create a new ActivitySpec.
*LAMP.ActivitySpec* | [**delete**](docs/ActivitySpecApi.md#delete) | **DELETE** /activity_spec/{activity_spec_name} | Delete an ActivitySpec.
*LAMP.ActivitySpec* | [**update**](docs/ActivitySpecApi.md#update) | **PUT** /activity_spec/{activity_spec_name} | Update an ActivitySpec.
*LAMP.ActivitySpec* | [**view**](docs/ActivitySpecApi.md#view) | **GET** /activity_spec/{activity_spec_name} | View an ActivitySpec.
*LAMP.Credential* | [**create**](docs/CredentialApi.md#create) | **POST** /type/{type_id}/credential | 
*LAMP.Credential* | [**delete**](docs/CredentialApi.md#delete) | **DELETE** /type/{type_id}/credential/{access_key} | 
*LAMP.Credential* | [**list**](docs/CredentialApi.md#list) | **GET** /type/{type_id}/credential | 
*LAMP.Credential* | [**update**](docs/CredentialApi.md#update) | **PUT** /type/{type_id}/credential/{access_key} | 
*LAMP.Participant* | [**all**](docs/ParticipantApi.md#all) | **GET** /participant | Get the set of all participants.
*LAMP.Participant* | [**allByResearcher**](docs/ParticipantApi.md#allByResearcher) | **GET** /researcher/{researcher_id}/participant | Get the set of all participants under a single researcher.
*LAMP.Participant* | [**allByStudy**](docs/ParticipantApi.md#allByStudy) | **GET** /study/{study_id}/participant | Get the set of all participants in a single study.
*LAMP.Participant* | [**create**](docs/ParticipantApi.md#create) | **POST** /study/{study_id}/participant | Create a new Participant for the given Study.
*LAMP.Participant* | [**delete**](docs/ParticipantApi.md#delete) | **DELETE** /participant/{participant_id} | Delete a participant AND all owned data or event streams.
*LAMP.Participant* | [**update**](docs/ParticipantApi.md#update) | **PUT** /participant/{participant_id} | Update a Participant's settings.
*LAMP.Participant* | [**view**](docs/ParticipantApi.md#view) | **GET** /participant/{participant_id} | Get a single participant, by identifier.
*LAMP.Researcher* | [**all**](docs/ResearcherApi.md#all) | **GET** /researcher | Get the set of all researchers.
*LAMP.Researcher* | [**create**](docs/ResearcherApi.md#create) | **POST** /researcher | Create a new Researcher.
*LAMP.Researcher* | [**delete**](docs/ResearcherApi.md#delete) | **DELETE** /researcher/{researcher_id} | Delete a researcher.
*LAMP.Researcher* | [**update**](docs/ResearcherApi.md#update) | **PUT** /researcher/{researcher_id} | Update a Researcher's settings.
*LAMP.Researcher* | [**view**](docs/ResearcherApi.md#view) | **GET** /researcher/{researcher_id} | Get a single researcher, by identifier.
*LAMP.Sensor* | [**all**](docs/SensorApi.md#all) | **GET** /sensor | Get the set of all sensors.
*LAMP.Sensor* | [**allByParticipant**](docs/SensorApi.md#allByParticipant) | **GET** /participant/{participant_id}/sensor | Get all sensors for a participant.
*LAMP.Sensor* | [**allByResearcher**](docs/SensorApi.md#allByResearcher) | **GET** /researcher/{researcher_id}/sensor | Get all sensors for a researcher.
*LAMP.Sensor* | [**allByStudy**](docs/SensorApi.md#allByStudy) | **GET** /study/{study_id}/sensor | View all sensors in a study.
*LAMP.Sensor* | [**create**](docs/SensorApi.md#create) | **POST** /study/{study_id}/sensor | Create a new Sensor under the given Study.
*LAMP.Sensor* | [**delete**](docs/SensorApi.md#delete) | **DELETE** /sensor/{sensor_id} | Delete a Sensor.
*LAMP.Sensor* | [**update**](docs/SensorApi.md#update) | **PUT** /sensor/{sensor_id} | Update an Sensor's settings.
*LAMP.Sensor* | [**view**](docs/SensorApi.md#view) | **GET** /sensor/{sensor_id} | Get a single sensor, by identifier.
*LAMP.SensorEvent* | [**allByParticipant**](docs/SensorEventApi.md#allByParticipant) | **GET** /participant/{participant_id}/sensor_event | Get all sensor events for a participant.
*LAMP.SensorEvent* | [**allByResearcher**](docs/SensorEventApi.md#allByResearcher) | **GET** /researcher/{researcher_id}/sensor_event | Get all sensor events for a researcher by participant.
*LAMP.SensorEvent* | [**allByStudy**](docs/SensorEventApi.md#allByStudy) | **GET** /study/{study_id}/sensor_event | Get all sensor events for a study by participant.
*LAMP.SensorEvent* | [**create**](docs/SensorEventApi.md#create) | **POST** /participant/{participant_id}/sensor_event | Create a new SensorEvent for the given Participant.
*LAMP.SensorEvent* | [**delete**](docs/SensorEventApi.md#delete) | **DELETE** /participant/{participant_id}/sensor_event | Delete a sensor event.
*LAMP.SensorSpec* | [**all**](docs/SensorSpecApi.md#all) | **GET** /sensor_spec | Get all SensorSpecs registered.
*LAMP.SensorSpec* | [**create**](docs/SensorSpecApi.md#create) | **POST** /sensor_spec | Create a new SensorSpec.
*LAMP.SensorSpec* | [**delete**](docs/SensorSpecApi.md#delete) | **DELETE** /sensor_spec/{sensor_spec_name} | Delete an SensorSpec.
*LAMP.SensorSpec* | [**update**](docs/SensorSpecApi.md#update) | **PUT** /sensor_spec/{sensor_spec_name} | Update an SensorSpec.
*LAMP.SensorSpec* | [**view**](docs/SensorSpecApi.md#view) | **GET** /sensor_spec/{sensor_spec_name} | Get a SensorSpec.
*LAMP.Study* | [**all**](docs/StudyApi.md#all) | **GET** /study | Get the set of all studies.
*LAMP.Study* | [**allByResearcher**](docs/StudyApi.md#allByResearcher) | **GET** /researcher/{researcher_id}/study | Get the set of studies for a single researcher.
*LAMP.Study* | [**create**](docs/StudyApi.md#create) | **POST** /researcher/{researcher_id}/study | Create a new Study for the given Researcher.
*LAMP.Study* | [**delete**](docs/StudyApi.md#delete) | **DELETE** /study/{study_id} | Delete a study.
*LAMP.Study* | [**update**](docs/StudyApi.md#update) | **PUT** /study/{study_id} | Update the study.
*LAMP.Study* | [**view**](docs/StudyApi.md#view) | **GET** /study/{study_id} | Get a single study, by identifier.
*LAMP.Type* | [**getAttachment**](docs/TypeApi.md#getAttachment) | **GET** /type/{type_id}/attachment/{attachment_key} | 
*LAMP.Type* | [**getDynamicAttachment**](docs/TypeApi.md#getDynamicAttachment) | **GET** /type/{type_id}/attachment/dynamic/{attachment_key} | 
*LAMP.Type* | [**listAttachments**](docs/TypeApi.md#listAttachments) | **GET** /type/{type_id}/attachment | 
*LAMP.Type* | [**parent**](docs/TypeApi.md#parent) | **GET** /type/{type_id}/parent | Find the owner(s) of the resource.
*LAMP.Type* | [**setAttachment**](docs/TypeApi.md#setAttachment) | **PUT** /type/{type_id}/attachment/{attachment_key}/{target} | 
*LAMP.Type* | [**setDynamicAttachment**](docs/TypeApi.md#setDynamicAttachment) | **PUT** /type/{type_id}/attachment/dynamic/{attachment_key}/{target} | 


## Documentation for Models

 - [AccessCitation](docs/AccessCitation.md)
 - [Activity](docs/Activity.md)
 - [ActivityEvent](docs/ActivityEvent.md)
 - [ActivitySpec](docs/ActivitySpec.md)
 - [Credential](docs/Credential.md)
 - [Document](docs/Document.md)
 - [DurationInterval](docs/DurationInterval.md)
 - [DurationIntervalLegacy](docs/DurationIntervalLegacy.md)
 - [DynamicAttachment](docs/DynamicAttachment.md)
 - [Error](docs/Error.md)
 - [Metadata](docs/Metadata.md)
 - [Participant](docs/Participant.md)
 - [Researcher](docs/Researcher.md)
 - [Sensor](docs/Sensor.md)
 - [SensorEvent](docs/SensorEvent.md)
 - [SensorSpec](docs/SensorSpec.md)
 - [Study](docs/Study.md)
 - [TemporalSlice](docs/TemporalSlice.md)

