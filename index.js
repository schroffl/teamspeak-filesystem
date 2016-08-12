'use strict';

const path = require('path');
const net = require('net');
const Readable = require('stream').Readable;

/**
 * Generate a random id to identify the file transfer
 *
 * @return     {Number}  Random ID between 0 and 255
 */
const generateFTID = () => Math.round(Math.random() * 0xFF);

/**
 * Wrapper to interface with the teamspeak filesystem
 *
 * @param      {Object}  query   Instance of teamspeak-query
 */
const TeamspeakFS = module.exports = query => ({

	/**
	 * Upload a file
	 *
	 * @memberof TeamspeakFS
	 *
	 * @param      {Number}   cid      The channel in which to upload the file
	 *                                 (given by its id)
	 * @param      {String}   name     The name of the file
	 * @param      {*}        data     The content of the file
	 * @param      {Object}   options  Any other options (passed to
	 *                                 TeamspeakQuery.send)
	 * @return     {Promise}  Resolves and rejects according to the success of
	 *                        the upload
	 */
	'upload': (cid, name, data, options) => {
		return new Promise((resolve, reject) => {
			query.send('ftinitupload', Object.assign({ 'clientftfid': generateFTID(), name, cid, 'cpw': '', 'size': data.length, 'overwrite': 0, 'resume': 0 }, options))
				.then(res => {
					if(res.status) throw res;

					let port = parseInt(res.port),
						sock = net.connect(port, query.host);

					sock.write(res.ftkey);
					sock.write(data, resolve);
				}).catch(reject);
		});
	},

	/**
	 * Download a file
	 *
	 * @memberof TeamspeakFS
	 *
	 * @param      {Number}      cid      The channel in which the file is saved
	 * @param      {String}      name     The name of the file
	 * @param      {Object}      options  Any other options (passed to
	 *                                    TeamspeakQuery.send)
	 * @return     {net.Socket}  A socket to read the files data from
	 */
	'download': (cid, name, options) => {
		return query.send('ftinitdownload', Object.assign({ 'clientftfid': generateFTID(), name, cid, 'cpw': '', 'seekpos': 0 }, options))
			.then(res => {
				if(res.status) throw res;

				let port = parseInt(res.port),
					sock = net.connect(port, query.host);

				sock.write(res.ftkey)
				return sock;
			})
	},

	/**
	 * Get a list of currently running file transfers
	 * 
	 * @memberof TeamspeakFS
	 */
	'currentTransfers': () => query.send('ftlist'),

	/**
	 * Get all files in a channel for a given path
	 * 
	 * @memberof TeamspeakFS
	 *
	 * @param      {Number}  cid     The channel of the file 
	 * @param      {String}  path    The path
	 * @param      {String}  cpw     The channel password (if needed)
	 * @return     {Array}   A list of files in the channel.
	 */
	'getFiles': (cid, path, cpw) => {
		return query.send('ftgetfilelist', { cid, 'cpw': cpw || '', path })
			.then(list => typeof list.name === 'string' ? 
				[ { 'name': list.name, 'path': list.path, 'size': list.size, 'datetime': list.datetime, 'type': list.type == 1 ? 'file' : 'dir' } ] : 
				list.name.map((file, i) => ({ 'name': file, 'path': list.path, 'size': list.size[i], 'datetime': list.datetime[i], 'type': list.type[i] == 1 ? 'file' : 'dir'})) );
	},

	/**
	 * Gets information about a given file
	 * 
	 * @memberof TeamspeakFS
	 *
	 * @param      {Number}  cid     The channel of the file
	 * @param      {String}  name    The path to the file
	 * @param      {String}  cpw     The channel password (if needed)
	 * @return     {Object}  The file information.
	 */
	'getFileInfo': (cid, name, cpw) => query.send('ftgetfileinfo', { cid, name, 'cpw': cpw || '' }),

	/**
	 * Delete a file
	 * 
	 * @memberof TeamspeakFS
	 *
	 * @param      {Number}  cid     The channel of the file
	 * @param      {String}  name    The path to the file
	 * @param      {String}  cpw     The channel password (if needed)
	 */
	'delete': (cid, name, cpw) => query.send('ftdeletefile', { cid, name, 'cpw': cpw || '' }),

	/**
	 * Create a directory
	 *
	 * @memberof TeamspeakFS
	 *
	 * @param      {Number}  cid      The channel of the file
	 * @param      {String}  dirname  The path of the directory
	 * @param      {String}  cpw      The channel password (if needed)
	 */
	'makeDir': (cid, dirname, cpw) => query.send('ftcreatedir', { cid, dirname, 'cpw': cpw || '' }),

	/**
	 * Rename a given file
	 * 
	 * @memberof TeamspeakFS
	 *
	 * @param      {Number}  cid      The channel of the file
	 * @param      {String}  oldname  The old/current name
	 * @param      {String}  newname  The new name
	 * @param      {Object}  options  Further options (passed to
	 *                                TeamspeakQuery.send)
	 */
	'rename': (cid, oldname, newname, options) => query.send('ftrenamefile', Object.assign({ cid, oldname, newname, 'cpw': '' }, options))
});

module.exports.generateFTID = generateFTID;