# Feedback

This is a basic feedback system made using node.js and React. This uses cloudinary and Sendgrid api system for fileupload and mail sending.

To run this project on you local machine:
*clone the repository
*run ```npm i``` in the terminal to include all the node modules packages.
* create .env files in both the client and server folder .
1. In the .env file of the client add these data
```
REACT_APP_API='http://localhost:8000/api'
REACT_APP_CLOUDINARY_CLOUD_NAME={CLOUDINARY CLOUD NAME}
REACT_APP_CLOUNDINARY_UPLOAD_SECRET={CLOUDINARY PRESET }
```
2. in the .env of the server folder add the following data
```
SENDGRID_API_KEY={SENDGRID API KEY}
EMAIL_TO={EMAIL ID WHO SHOULD RECIEVE THE MAIL}
EMAIL_FROM={EMAIL WITH MAIL SHOULD BE RECIEVED}
```
* AFTER ALL THE FOLLOWING PROCESS 
```javascript
npm start```
in both the client and server folder

ALL SET AFTER THIS
