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
Wrapper to interface with the teamspeak filesystem


| Param | Type                | Description                 |
| ----- | ------------------- | --------------------------- |
| query | <code>Object</code> | Instance of teamspeak-query |

**Example**  
```js
const TeamspeakQuery = require('teamspeak-query');
const TeamspeakFS = require('teamspeak-filesystem');

const query = new TeamspeakQuery(); 
const tsfs = TeamspeakFS(query);
```

* [TeamspeakFS](#module_TeamspeakFS)
    * [.upload(cid, name, data, options)](#module_TeamspeakFS.upload) ⇒ <code>Promise</code>
    * [.download(cid, name, options)](#module_TeamspeakFS.download) ⇒ <code>net.Socket</code>
    * [.currentTransfers()](#module_TeamspeakFS.currentTransfers)
    * [.getFiles(cid, path, cpw)](#module_TeamspeakFS.getFiles) ⇒ <code>Array</code>
    * [.getFileInfo(cid, name, cpw)](#module_TeamspeakFS.getFileInfo) ⇒ <code>Object</code>
    * [.delete(cid, name, cpw)](#module_TeamspeakFS.delete)
    * [.makeDir(cid, dirname, cpw)](#module_TeamspeakFS.makeDir)
    * [.rename(cid, oldname, newname, options)](#module_TeamspeakFS.rename)

<a name="module_TeamspeakFS.upload"></a>

### TeamspeakFS.upload(cid, name, data, options) ⇒ <code>Promise</code>
Upload a file

**Kind**: static method of <code>[TeamspeakFS](#module_TeamspeakFS)</code>  
**Returns**: <code>Promise</code> - Resolves and rejects according to the success of
                       the upload  

| Param   | Type                | Description                                               |
| ------- | ------------------- | --------------------------------------------------------- |
| cid     | <code>Number</code> | The channel in which to upload the file (given by its id) |
| name    | <code>String</code> | The name of the file                                      |
| data    | <code>Any</code>    | The content of the file                                   |
| options | <code>Object</code> | Any other options (passed to TeamspeakQuery.send)         |

<a name="module_TeamspeakFS.download"></a>

### TeamspeakFS.download(cid, name, options) ⇒ <code>net.Socket</code>
Download a file

**Kind**: static method of <code>[TeamspeakFS](#module_TeamspeakFS)</code>  
**Returns**: <code>net.Socket</code> - A stream containing the files content  

| Param   | Type                | Description                                       |
| ------- | ------------------- | ------------------------------------------------- |
| cid     | <code>Number</code> | The channel in which the file is saved            |
| name    | <code>String</code> | The name of the file                              |
| options | <code>Object</code> | Any other options (passed to TeamspeakQuery.send) |

<a name="module_TeamspeakFS.currentTransfers"></a>

### TeamspeakFS.currentTransfers()
Get a list of currently running file transfers

**Kind**: static method of <code>[TeamspeakFS](#module_TeamspeakFS)</code>  
<a name="module_TeamspeakFS.getFiles"></a>

### TeamspeakFS.getFiles(cid, path, cpw) ⇒ <code>Array</code>
Get all files in a channel for a given path

**Kind**: static method of <code>[TeamspeakFS](#module_TeamspeakFS)</code>  
**Returns**: <code>Array</code> - A list of files in the channel.  

| Param | Type                | Description                      |
| ----- | ------------------- | -------------------------------- |
| cid   | <code>Number</code> | The channel of the file          |
| path  | <code>String</code> | The path                         |
| cpw   | <code>String</code> | The channel password (if needed) |

<a name="module_TeamspeakFS.getFileInfo"></a>

### TeamspeakFS.getFileInfo(cid, name, cpw) ⇒ <code>Object</code>
Gets information about a given file

**Kind**: static method of <code>[TeamspeakFS](#module_TeamspeakFS)</code>  
**Returns**: <code>Object</code> - The file information.  

| Param | Type                | Description                      |
| ----- | ------------------- | -------------------------------- |
| cid   | <code>Number</code> | The channel of the file          |
| name  | <code>String</code> | The path to the file             |
| cpw   | <code>String</code> | The channel password (if needed) |

<a name="module_TeamspeakFS.delete"></a>

### TeamspeakFS.delete(cid, name, cpw)
Delete a file

**Kind**: static method of <code>[TeamspeakFS](#module_TeamspeakFS)</code>  

| Param | Type                | Description                      |
| ----- | ------------------- | -------------------------------- |
| cid   | <code>Number</code> | The channel of the file          |
| name  | <code>String</code> | The path to the file             |
| cpw   | <code>String</code> | The channel password (if needed) |

<a name="module_TeamspeakFS.makeDir"></a>

### TeamspeakFS.makeDir(cid, dirname, cpw)
Create a directory

**Kind**: static method of <code>[TeamspeakFS](#module_TeamspeakFS)</code>  

| Param   | Type                | Description                      |
| ------- | ------------------- | -------------------------------- |
| cid     | <code>Number</code> | The channel of the file          |
| dirname | <code>String</code> | The path of the directory        |
| cpw     | <code>String</code> | The channel password (if needed) |

<a name="module_TeamspeakFS.rename"></a>

### TeamspeakFS.rename(cid, oldname, newname, options)
Rename a given file

**Kind**: static method of <code>[TeamspeakFS](#module_TeamspeakFS)</code>  

| Param   | Type                | Description                                     |
| ------- | ------------------- | ----------------------------------------------- |
| cid     | <code>Number</code> | The channel of the file                         |
| oldname | <code>String</code> | The old/current name                            |
| newname | <code>String</code> | The new name                                    |
| options | <code>Object</code> | Further options (passed to TeamspeakQuery.send) |

