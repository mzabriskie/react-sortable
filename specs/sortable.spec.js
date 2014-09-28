/** @jsx React.DOM */
var React = require('react/addons'),
	TestUtils = React.addons.TestUtils,
	Sortable = require('../lib/main');

describe('react-sortable', function () {
	describe('validation', function () {
		it('should result with invariant when there isn\'t any children', function () {
			var drag = (<Sortable/>);

			var error = false;
			try {
				TestUtils.renderIntoDocument(drag);
			} catch (e) {
				error = true;
			}

			expect(error).toEqual(true);
		});

		it('should result with invariant if there\'s more than a single child', function () {
			var drag = (<Sortable><ul/><ul/></Sortable>);

			var error = false;
			try {
				TestUtils.renderIntoDocument(drag);
			} catch (e) {
				error = true;
			}

			expect(error).toEqual(true);
		});
	});
});