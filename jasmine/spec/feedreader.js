/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        //Cycles though each feed and checks whether it has a defined URL of length greater than 0
        it('have a URL', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        //Cycles through each feed and checks whether it has a defined name of length greater than 0
        it('have a name', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });

    describe('the menu', function() {

         //Sets variables for teh relevant DOM elements
         var menu = $('.menu');
         var body = $('body');

         //Checks to see if the menu is hidden.
         it('is hidden by default', function() {
            expect(body.hasClass("menu-hidden")).toBe(true);
         });

         //Clicks, then checks if the body no longer has the menu-hidden class, then clicks again and checks the opposite
         it('changes the menu visibility when clicked', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect(body.hasClass('menu-hidden')).toBe(true);
         });
    });



    describe('Initial Entries', function() {

        //Load the feed before running the test
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        //Checks to see if the feed loaded
        it('has at least 1 entry in feed container', function() {
            expect($('.feed > .entry-link').length).not.toBe(0);
        });
    });

    describe('New Feed Selection', function() {

        var info;
        //Load the feed, get the DOM element, then load a different feed
        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(0, function() {
                info = $('.feed').html();
                loadFeed(1, done);
            });
        });

        //Check the feed to see if it's different from the original feed
        it('ensures when a new feed loads that the content changes', function() {
            var newInfo = $('.feed').html();
            expect(newInfo).not.toBe(info);
        });
    });
}());
