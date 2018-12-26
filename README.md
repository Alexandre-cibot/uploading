## Context 
_This repository was created in order to_:
- Be able to capture and display the upload's progression.
- Be able to abort the transfer when the user decide to.

#### Technos used for HTTP tranfer: AXIOS
Axios provide and `onUploadProgress` API to track and work with the `progressEvent`
Fetch API doesn't provide such thing.

Axios also provide a way to abort a request.
(Fetch either)


#### Technos

Back-end: Nodejs, Express          
Front-end: JavaScript, React, Axios

### How to use ?

_Back-end_
- Install dependencies    
Move to `./api` and launch `yarn`
- Launch the Server   
Launch `yarn start`

_Front-end_
- Install dependencies    
Move to `./front` and launch `yarn`
- Launch `yarn start`
