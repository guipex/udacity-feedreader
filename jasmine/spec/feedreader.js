/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    // RSS Feeds test suite
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
            expect(allFeeds.length).not.toBe(0);
        });

         // loop through each feed that check if URL is defined and not empty.
         it('have valid URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

         // loop through each feed that check if name is defined and not empty.
         it('have valid name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });

    // Menu test suite
    describe('The menu', function() {

         // Ensures the menu is hidden by default, checking if body tag has the class 'menu-hidden'.
         it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
         });

          // Ensures the menu toggle visibility when menu icon is clicked.
          it('toggle visibility when clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
    });

    // Initial Entries test suite
    describe('Initial Entries', function() {

         // Ensures the loadFeed function is called
         beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            })
         });

         // Ensures the loadFeed function has at least 1 entry
         it('has at least one entry', function(done) {
            expect($('.feed .entry').length).not.toBe(0);
            done();
          });
    });

    // New Feed Selection test suite
    describe('New Feed Selection', function() {

         // declare 'entries' variable
         var entriesTitlesBefore, entriesTitlesAfter;

         // Ensures the content is refreshed when new feed is loaded
         beforeEach(function(done) {
            // Empty the feed list
            $('.feed').empty();

            // load the initial feed and save in the 'entriesTitlesBefore' variable to compare later
            loadFeed(0, function() {
                entriesTitlesBefore = $('.feed').find("h2").text();

                // load the feed again and save in the 'entriesTitlesAfter' variable to compare later
                loadFeed(1, function() {
                    entriesTitlesAfter = $('.feed').find("h2").text();
                    done();
                });
            });
         });

         it('content is refreshed when new feed is loaded', function(done) {
            // compare both feeds and ensure they're not equal
            expect(entriesTitlesAfter).not.toEqual(entriesTitlesBefore);
            done();
          });
    });
}());
