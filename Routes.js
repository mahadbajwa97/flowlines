'use strict';
module.exports = function (app) {
   
    var exp = require("./controllers/API");
    //Rendering Rountes
    app.route('/privacyPolicy').get(function (req, res) {     
        res.sendFile('privacy_policy.html', { root: '.' });
    });
   
   app.route('/Home').get(function (req, res) {     
        res.sendFile('index.html', { root: './landing/' });
    });
   
    app.route('/AboutUs').get(function (req, res) {
        res.render('https://github.com/NBAMIR/Syrup.Website/blob/master/public/index.html');
    });
    //APIs
    app.route('/profileView/:currentID/:id').get(function (req, res) {
        exp.getProfileView(req, res, req.params.id, req.params.currentID);
    });
     app.route('/GetUserFeed/:id').get(function (req, res) {
        exp.getUserfeed(req, res, req.params.id);
    });
    app.route('/getFollowRequests/:id').get(function (req, res) {
        exp.getFollowRequests(req, res, req.params.id);
    });
    app.route('/register').post(function (req, res) {
        exp.Registers(req, res, req.body);
    });
    app.route('/login').post(function (req, res) {

        exp.Login(req, res, req.body);
    });
    app.route('/verify/:token').get(async (req, res, next) => {
        // Find Account which matches secret token
        exp.verify(req, res, req.params.token);
    });


    app.route('/changeDP/:id').put(function (req, res) {
        exp.changeDP(req, res, req.params.id, req.body.photoURL);
    });
    app.route('/postFlow').post(function (req, res) {
        exp.postFlow(req, res, req.body);
    });
    app.route('/like').post(function (req, res) {
        exp.like(req, res, req.body);
    });
    app.route('/comment').post(function (req, res) {
        exp.comment(req, res, req.body);
    });
    app.route('/getComments/:flowID').get(function (req, res) {
        exp.returnComments(req, res, req.params.flowID);
    });
    app.route('/getLikes/:flowID').get(function (req, res) {
        exp.returnLikes(req, res, req.params.flowID);
    });
    app.route('/postBookmark').post(function (req, res) {
        exp.postBookmarks(req, res, req.body);
    });
    app.route('/returnBookmarks/:userID').get(function (req, res) {
        exp.returnBookmarks(req, res, req.params.userID);
    });
    app.route('/DeleteFlow/:flowID').delete(function (req, res) {
        exp.deleteFlows(req, res, req.params.flowID);
    });
    app.route('/EditDesc/:flowID').put(function (req, res) {
        exp.editDesc(req, res, req.params.flowID, req.body.Desc);
    });
    app.route('/getFollowers/:userID').get(function (req, res) {
        exp.getFollowers(req, res, req.params.userID);
    });
    app.route('/sendFollowRequest').post(function (req, res) {
        exp.sendFollowRequest(req, res, req.body);
    });
    app.route('/acceptFollowRequest').post(function (req, res) {
        
        exp.acceptFollowRequest(req, res, req.body);
    });
    app.route('/searchBar/:key').get(function (req, res) {
        exp.searchBar(req, res, req.params.key);
    });
     app.route('/NewsFeed/:userID/:offset').get(function (req, res) {
        exp.NewsFeed(req, res, req.params.userID, req.params.offset);
    });
     app.route('/EditProfile/:userID').put(function (req, res) {
        exp.editProfile(req, res, req.params.userID, req.body);
    });

};
