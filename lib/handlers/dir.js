'use strict';

var loader = require('hive-loader');
var Handler = loader.handler;
var _DEBUG = false;

var _mixins = {
	name:    'dir_hander',
	respond: function (params) {
		var latch = params.gate.latch();
		if (_DEBUG) console.log('responding to dir %s', params.file_path);
		this.dirs.push(params.file_path);
		var ds = require('./../loaders/dir_scanner')(
			{target: this, name_filter: this.get_config('name_filter')});

		ds.load(latch, params.file_path);
	}
};

module.exports = function (config, cb) {
	return new Handler(_mixins, [{dir: true}, config, {name_filter: /.*/}], cb);
}