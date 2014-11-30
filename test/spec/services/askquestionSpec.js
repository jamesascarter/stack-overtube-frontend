'use strict'; 

describe('Service: AskquestionService', function() {

	beforeEach(module('stackOverTubeApp'));

	it('check the existence of AskquestionService factory', 
		inject(function(AskquestionService) {
			expect(AskquestionService).toBeDefined();
		}));
});
