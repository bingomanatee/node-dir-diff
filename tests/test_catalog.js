'use strict';

var tap = require('tap');
var path = require('path');
var util = require('util');
var ndd = require('./../index');

var _DEBUG = false;

/* *********************** TEST SCAFFOLDING ********************* */

var root = path.resolve(__dirname, '../test_resources');

/* ************************* TESTS ****************************** */

	tap.test('test catalog', function (t) {

		var catalog = new ndd.Catalog(path.resolve(root, 'test_1'));

		catalog.scan(function () {
			if (_DEBUG) console.log('catalog: %s', util.inspect(catalog, true, 4));

			var files = catalog.files;
			for(var i = 0;i < files.length;++i) {
				files[i] = path.relative(path.resolve(__dirname, '..'), files[i]);
			}
			files.sort();

			var dirs = catalog.dirs;
			for(i = 0;i < dirs.length;++i) {
				dirs[i] = path.relative(path.resolve(__dirname, '..'), dirs[i]);
			}
			dirs.sort();

			t.deepEqual(files, [
				'test_resources/test_1/bar/Fred.txt',
				'test_resources/test_1/bar/barney.txt',
				'test_resources/test_1/bar/clothes/blue_fir.json',
				'test_resources/test_1/bar/clothes/red_fur.json',
				'test_resources/test_1/bar/clothes/white_fir.json',
				'test_resources/test_1/foo/Barney.txt',
				'test_resources/test_1/foo/Moe.txt',
			], 'found all files');
			t.deepEqual(dirs, [
					'test_resources/test_1/bar',
					'test_resources/test_1/bar/clothes',
					'test_resources/test_1/foo',
			], 'found all dirs');
			t.end();
		})

	});
