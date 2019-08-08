
1. Bulk upload of notes

Clone 'nodejs-keep-level-2-assignment' solution repo and create a json file as 'mock_notes.json' inside server folder. It will have array of note objects. Note objects will have all attributes those are defined inside notes.entity.js file.
'mock_notes.json' file will be used to load the data from given file to DB as stream.
Develop an API HTTP POST api/v1/notes/stream, which inserts the complete notes as a stream.
Develop an API HTTP GET api/v1/notes/stream, which returns the complete notes as a stream.
'stream-to-mongo-db' and 'JSONStream' npm modules can be used to insert notes as a stream into database.

2. Share notes

User should be able to share one or multiple notes with another users (using their email ID).
Users can share notes with other users with specified access type.
Push notify users on when someone shares a note with them.
Develop an API HTTP POST api/v1/notes/share, which shares one or multiple notes with other users.


Instructions

Implement the application using TDD approach.
Automated test cases to test the whole functionality of the application.