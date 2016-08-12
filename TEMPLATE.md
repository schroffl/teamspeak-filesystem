# teamspeak-filesystem [![npm version](https://badge.fury.io/js/teamspeak-filesystem.svg)](https://badge.fury.io/js/teamspeak-filesystem)
Wrapper built around [teamspeak-query](https://github.com/schroffl/teamspeak-query) to interface with the teamspeak filesystem.

# Installation
```javascript
$ npm install teamspeak-filesystem
```

# Example
```javascript
const fs = require('fs');

const TeamspeakQuery = require('teamspeak-query');
const TeamspeakFS = require('teamspeak-filesystem');

const query = new TeamspeakQuery();
const tsfs = TeamspeakFS(query); // Requires an instance of teamspeak-query

query.send('login', 'username', 'password')
    .then(() => query.send('use', 1))
    .then(() => tsfs.upload(1, '/filename', 'Hello World!\n'))
    .then(() => tsfs.download(1, '/filename'))
    .then(data => data.pipe(fs.createWriteStream('./hello'))
    .catch(console.error)
```

# API Reference
{{#module name="TeamspeakFS"}}
{{>body~}}
{{>member-index~}}
{{>separator~}}
{{>members~}}
{{/module}}