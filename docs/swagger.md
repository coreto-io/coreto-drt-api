# Coreto DRT API Documentation
An API used to interact with the Coreto DRT

## Version: 0.0.1

### /current_block_height

#### GET
##### Summary

Current block height

##### Description

Get the current block height from the blockchain

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | string |
| 400 | Bad Request | [Smart%20contract%20error%20response](#smart%20contract%20error%20response) |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### /balance/{account_id}

#### GET
##### Summary

Balance

##### Description

Get the balance of an account

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| account_id | path | The NEAR account ID of the user | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | string |
| 400 | Bad Request | [Smart%20contract%20error%20response](#smart%20contract%20error%20response) |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### /call

#### POST
##### Summary

Call

##### Description

Perform a call action on a smart contract

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Call%20payload](#call%20payload) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | string |
| 400 | Bad Request | [Smart%20contract%20error%20response](#smart%20contract%20error%20response) |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### /view

#### POST
##### Summary

View

##### Description

Perform a view action on a smart contract

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [View%20payload](#view%20payload) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | string |
| 400 | Bad Request | [Smart%20contract%20error%20response](#smart%20contract%20error%20response) |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### /did/create_did

#### POST
##### Summary

Create DID

##### Description

Generate a new DID based to a NEAR wallet

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | [Create%20DID%20response](#create%20did%20response) |
| 400 | Bad Request | string |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### /did/get_did

#### POST
##### Summary

Get DID

##### Description

Get the DID from the DID registry

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Get%2FHas%20DID%20payload](#get%2fhas%20did%20payload) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | The DID associated with the NEAR account ID | string |
| 400 | Bad Request | string |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### /did/has_did

#### POST
##### Summary

Has DID

##### Description

Check if a NEAR account has an associated DID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Get%2FHas%20DID%20payload](#get%2fhas%20did%20payload) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Boolean value indicating if the NEAR account has an associated DID | boolean |
| 400 | Bad Request | string |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### /did/put_did

#### POST
##### Summary

Put DID

##### Description

Add the DID into the DID registry

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Put%20DID%20payload](#put%20did%20payload) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | [Transaction%20response](#transaction%20response) |
| 400 | Bad Request | [Smart%20contract%20error%20response](#smart%20contract%20error%20response) |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### /did/transfer_did

#### POST
##### Summary

Transfer DID

##### Description

Transfer the DID to another wallet

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Transfer%20DID%20payload](#transfer%20did%20payload) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | [Transaction%20response](#transaction%20response) |
| 400 | Bad Request | [Smart%20contract%20error%20response](#smart%20contract%20error%20response) |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### /drt/get_source_action_types

#### POST
##### Summary

Get source action types

##### Description

Get a list of action types submitted by a source.

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Get%20source%20action%20types%20payload](#get%20source%20action%20types%20payload) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | string |
| 400 | Bad Request | [Smart%20contract%20error%20response](#smart%20contract%20error%20response) |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### /drt/get_user_actions

#### POST
##### Summary

Get user actions

##### Description

Get all actions done by a user submitted by a source

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Get%20user%20actions%20payload](#get%20user%20actions%20payload) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | string |
| 400 | Bad Request | [Smart%20contract%20error%20response](#smart%20contract%20error%20response) |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### /drt/get_user_performance_actions

#### POST
##### Summary

Get user performance actions

##### Description

Get all actions, that modifies the performance, done by a user submitted by a source

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Get%20user%20actions%20payload](#get%20user%20actions%20payload) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | string |
| 400 | Bad Request | [Smart%20contract%20error%20response](#smart%20contract%20error%20response) |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### /drt/get_user_trust_actions

#### POST
##### Summary

Get user trust actions

##### Description

Get all actions, that modifies the trust, done by a user submitted by a source

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Get%20user%20actions%20payload](#get%20user%20actions%20payload) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | string |
| 400 | Bad Request | [Smart%20contract%20error%20response](#smart%20contract%20error%20response) |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### /drt/save_action

#### POST
##### Summary

Save action

##### Description

Save an action made by a user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Save%20action%20payload](#save%20action%20payload) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | [Transaction%20response](#transaction%20response) |
| 400 | Bad Request | [Smart%20contract%20error%20response](#smart%20contract%20error%20response) |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### /drt/save_actions_batch

#### POST
##### Summary

Save actions batch

##### Description

Save a batch of actions from one source

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | [Save%20actions%20batch%20payload](#save%20actions%20batch%20payload) |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | [Transaction%20response](#transaction%20response) |
| 400 | Bad Request | [Smart%20contract%20error%20response](#smart%20contract%20error%20response) |
| 500 | Internal Server Error | [Internal%20server%20error%20response](#internal%20server%20error%20response) |

### Models

#### Smart contract error response

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| error | string | The error resulted from the smart contract | No |
| type | string | The error type resulted from the smart contract | No |

#### Internal server error response

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| error | string | The error resulted from the server | No |
| statusCode | number | The error status code resulted from the server | No |
| message | string | The error message resulted from the server | No |

#### params

The payload to send to the method

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| params | object | The payload to send to the method |  |

#### Call payload

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| account_id | string | The NEAR account ID that will be performing the call | Yes |
| private_key | string | The private key of the account id | Yes |
| contract | string | The NEAR account ID of contract | Yes |
| method | string | The method name to call | Yes |
| params | [params](#params) |  | Yes |
| attached_gas | string | The amount of gas you will be attaching to the call in TGas | Yes |
| attached_tokens | string | The amount of tokens to be sent to the contract you are calling in yoctoNEAR (10^-24 NEAR) | Yes |

#### View payload

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| contract | string | The NEAR account ID of contract | Yes |
| method | string | The method name to call | Yes |
| params | [params](#params) |  | Yes |

#### Create DID response

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| did | string | The DID generated | No |
| seed | string | The seed used to generate the DID | No |

#### Get/Has DID payload

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| account_id | string | The NEAR account ID of the DID owner | Yes |

#### Put DID payload

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| caller_account_id | string | The NEAR account ID of the caller | Yes |
| caller_private_key | string | The NEAR private key of the caller | Yes |
| account_id | string | The NEAR account ID of the DID owner | Yes |
| did | string | The DID to be added | Yes |

#### Transaction response

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| hash | string | The hash of the completed transaction | No |

#### Transfer DID payload

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| caller_account_id | string | The NEAR account ID of the caller | Yes |
| caller_private_key | string | The NEAR private key of the caller | Yes |
| old_account_id | string | The NEAR account ID of the DID owner | Yes |
| new_account_id | string | The NEAR account ID of the new DID owner | Yes |

#### Get source action types payload

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| source | string | The NEAR account ID of the source | Yes |

#### Get user actions payload

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| source_label | string | The label of the source that submitted the actions | Yes |
| account_did | string | The DID of the user | Yes |

#### Save action payload

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| caller_account_id | string | The NEAR account ID of the caller | Yes |
| caller_private_key | string | The NEAR private key of the caller | Yes |
| account_did | string | The DID of the account | Yes |
| action_date | date | The unix timestamp of the action | Yes |
| action_type | string | The type of the action | Yes |
| trust | number | The trust variation value of the action | Yes |
| performance | number | The performance variation value of the action | Yes |
| identifier | string |  | No |

#### Save actions batch item

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| account_did | string | The DID of the account | Yes |
| action_date | date | The unix timestamp of the action | Yes |
| action_type | string | The type of the action | Yes |
| trust | number | The trust variation value of the action | Yes |
| performance | number | The performance variation value of the action | Yes |
| identifier | string |  | No |

#### batch

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| batch | array |  |  |

#### Save actions batch payload

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| caller_account_id | string | The NEAR account ID of the caller | Yes |
| caller_private_key | string | The NEAR private key of the caller | Yes |
| batch | [batch](#batch) |  | Yes |
