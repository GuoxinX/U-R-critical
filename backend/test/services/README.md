** Unit and Integration Testing of Backend **

A list of requests and expected sample responses can be found here: https://documenter.getpostman.com/view/7292515/S1LyVoGK?version=latest#64bc1ef1-8e90-4967-bfa4-b36bde847331

Much of the unit and integration testing will involve sending a given query to the backend, and examining the response to ensure it fits the correct structure and contents required. An example of this is logging in as an administrator
and creating a new user. 

Testing of the backend will be done from an outside-in process, by looking at the behaviour of the backend with respect to handling of HTTP outside the Feathers.js framework. As such, tests are run through simple Node scripts, as shown:

`node admin-user-integration-test.js`

The tests in this directory do not form all of the tests conducted on the backend of the system. Many tests with regard to usability and compatibility were conducted manually


For details of more detailed integration tests, please see the Confluence sections of Usability and Compatibility Testing 
