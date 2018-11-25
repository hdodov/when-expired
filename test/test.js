var assert = require('assert');
var whenExpired = require('../index');

describe('whenExpired', function () {
	it('should resolve', function (done) {
		whenExpired('test', Date.now() + 100).then(done);
	});

	it('should resolve once when called multiple times', function (done) {
		whenExpired('test_multiple', Date.now() + 200).then(done);
		whenExpired('test_multiple', Date.now() + 400).then(done);
		whenExpired('test_multiple', Date.now() + 600).then(done);
	});

	it('should return the same Promise when called with the same date', function () {
		var date = Date.now() + 200,
			p1 = whenExpired('test_promise', date),
			p2 = whenExpired('test_promise', date);

		assert.equal(p1 === p2, true);
	});

	it('should immediately resolve when called with past date', function (done) {
		var start = process.hrtime();

		whenExpired('test_past', Date.now() - 200).then(function () {
			var finish = process.hrtime(start);

			if (finish[1] < 1e6) { // check if less than 1ms
				done();
			} else {
				done(false);
			}
		});
	});

	it('should reject when date is invalid', function (done) {
		whenExpired('test_invalid', null).then(() => {
			done(new Error());
		}).catch((err) => {
			done();
		});
	});
});
