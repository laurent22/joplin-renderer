const { asyncTest } = require('./test-utils');
const MdToHtml = require('../MdToHtml');

describe('MdToHtml', function() {

	beforeEach(async (done) => {
		done();
	});

	it('should convert Markdown to HTML', asyncTest(async () => {
		const mdToHtml = new MdToHtml({
			ResourceModel: null,	
		});
	}));

});
