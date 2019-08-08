## Design & implement, Notes Application as a personal productivity tool for quickly taking (& saving) notes, organize notes efficiently. Below are its endpoints those you need to design.

- Core features
	- As a user, i should be able to register.
	- As a user, i should be able to login.
	- As a user, i should be able to create a note.
	- As a user, i should be able to list all created notes by me.
	- As a user, i should be able to update note's **title**, **text** and **state** (**started**, **not-started**, **completed**)

- What must be implemented:- 
	- NodeJS based server side application (server part only of the application)
	- Automated test cases to test the server side application
	- Must be able to interface & integrate with any web based clients
	- Implement the application using TDD approach


- Instructions for implementation and submission
	- Successful submission must have a well document README.md, which explain how to build, run & test the application, you can also add a DESIGN.MD to explain your data model & design
	- Source code must be integrated with ESLint with standard ESLint recommended JS rules, and should not have any lint errors open
	- Ensure you have exposed method 'initializeMongooseConnection' which initializes the mongoose connection, from ./server/modules.js else app will be in hung state.
	- Ensure you have exposed notes and user entity form ./server/modules.js else app will be in hung state.
	- Seed code can be cloned form https://gitlab-cts.stackroute.in/stack_nodejs/nodejs-keep-level-1-assignment.git

- API for user registration **/api/v1/users/register**
	- Registration API will insert **username** and **password** into database
	- **bcryptjs** npm module should be used to store **password** in bycript form.
- API for login  **/api/v1/users/login**
	- User should be able to login into system using **username** and **password**
- API for creating a note **/api/v1/notes/**
	- Note model will have **id**, **title**, **text**, **state**, **userId**, **createdOn**, **modifiedOn** attributes
	- **userId** will be passed as query param into request and will be used to store notes by **userId**.
- API for getting all notes of a user **/api/v1/notes/**
	- **userId** will be passed as **query param** into request and will be used to fetch notes by **userId**.
- API for updating a note **/api/v1/notes/:noteId**
	- **noteId** will be passed as route parameters into url and will be used to update note by **id**

## MENTORS TO BEGIN REVIEW YOUR WORK ONLY AFTER 

- You add the respective Mentor as a Reporter/Master into your Assignment Repository
- You have checked your Assignment on the Automated Evaluation Tool - Hobbes (Check for necessary steps in your Boilerplate - README.md/PROBLEM.md file. ) and got the required score - Check with your mentor about the Score you must achieve before it is accepted for Manual Submission. 
- Intimate your Mentor on Slack and/or Send an Email to learner.support@stackroute.in - with your Git URL - Once you done working and is ready for final submission.