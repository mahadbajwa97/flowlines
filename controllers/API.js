var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var encryption = require("./encryption");
var randomstring = require("randomstring");
const mailer = require("./mailer");
const crypto = require('crypto');
exports.getProfileView = function (req, res, ID, currentID) {
    db.executeSql("exec Profile_view @userID="+ID+",currentUserID="+currentID, function (data, err) 
     {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
            res.json(data);
        }
    });
}
exports.getUserfeed = function (req, res, ID) {
    db.executeSql("exec UserFeed @userID="+ID, function (data, err) {
        if (err) {
            console.log(err);
        }
        else {
           
            res.json(data);
        }


    });
}
exports.Registers = function (req, res, User) {
    try {

        if (!User) throw new error("Input not valid");
        var data = User;

        if (data) {
            //randomString
            const SecretToken = randomstring.generate(12);


            let hash = crypto.createHash('md5').update(data.password).digest("hex");
           
            db.executeSql("exec Register @userName='" + data.userName + "', @emailAddress ='" + data.emailAddress + "', @fullName='" + data.fullName + "', @password ='" + hash + "', @ValidationCode ='" + SecretToken + "'", function (data, err) {
                console.log(data);
                if (err) {
                    httpMsgs.show500(req, res, err);
                }
                else {
                    console.log(data);
                    res.json({
                        "success": 1
                    });
                    //Create New Email
                    //mailer.Mail(User.fullName, User.emailAddress, SecretToken);
                    mailer.Mail_1(User.emailAddress, User.fullName, SecretToken);
                }
            });
        }
    }
    catch (exc) {
        httpMsgs.show500(req, res, exc);
    }
}

exports.Login = function (req, res, User) {
    try {
        if (!User) throw new error("Input not valid");

        if (User) {
            
                
                 
                    let hash = crypto.createHash('md5').update(User.password).digest("hex");
                    
                    db.executeSql("exec login @userName='" + User.userName+"', @password='"+hash+"'", function (data, err) {
                      if(data){  
                        if (err) 
                        {
                            console.log(3);
                            res.send(hash);
                            
                        }
                        else if(data[0].isValidated) {
                            console.log(data);
                            console.log("The email is verified");
                            res.send(data[0]);
                        }
                        
                        else if (!data[0].isValidated) {
                            console.log(data);
                            console.log("The email is not verified");
                            res.json(data[0]);
                        }
                        
                      }
                        else{
                            res.json({"success":0})
                        }
                        
                    });
                }
        
                

           
        
    }
    catch (exc) {
        httpMsgs.show500(req, res, exc);
    }

}


exports.verify = function (req, res, token) {
    const { secretToken } = req.params.token;
    // Find Account which matches secret token
    console.log(secretToken);
    try {
        if (!token) throw new error("Input not valid");

        if (token) {
            db.executeSql("exec EditStatus @ValidationCode='" + token + "'", function (data, err) {
                if (err) {
                    console.log("No user found");
                    httpMsgs.show500(req, res, err);
                }
                else {
                    console.log("Email Verified");
                    res.json({ "status": "verified" });
                 
                }
            });
        }
    }
    catch (exc) {
        httpMsgs.show500(req, res, exc);
    }
}

exports.changeDP = function (req, res, Id, photoURL) {
    try {
        if (!photoURL) throw new error("Input not valid");
        console.log(Id);
        console.log(photoURL);
        if (photoURL) {
            db.executeSql("exec changeDP @userId=" + Id + ", @photoURL ='" + photoURL + "'", function (data, err) {
                if (err) {
                    httpMsgs.show500(req, res, err);
                }
                else {
                    console.log(data);
                    httpMsgs.sendJson(req, res, data);
                }
            });
        }
    }
    catch (exc) {
        httpMsgs.show500(req, res, exc);
    }
}


exports.postFlow = function (req, res, Flow) {
    try {
        if (!Flow) throw new error("Input not valid");
        console.log(Flow);

        if (Flow) 
        {
            db.executeSql("exec postFlow @desc ='" + Flow.desc + "', @anchorID ='" + Flow.anchorID + "', @videoPath ='" + Flow.videoPATH + "', @lat ='" + Flow.lat + "', @lng='" + Flow.lng + "', @flowType=" + Flow.flowType + ", @userID =" + Flow.userID, function (data, err) {

                if (err) {
       
                    res.json({"error":err});
                }
                else {
                    if (Flow.flowType === 2 || Flow.flowType === 3) {
                        db.executeSql("exec addDrawing @flowID=" + data[0].ID + ",@strokes='"+Flow.strokes+"'", function (data, err) {

                            if (err) {
                                res.json({"Error":err});
                            }
                            else {
                                console.log("Done");
                            }
                        });
                    }
                    res.json({"success":1})
                }
            });
        }
    }
    catch (exc) {
        httpMsgs.show500(req, res, exc);
    }
}

exports.like = function (req, res, likeRequest) {
    try {

        if (!likeRequest) throw new error("Input not valid");


        if (likeRequest) {
            db.executeSql("exec liked @userID=" + likeRequest.userID + ", @flowID =" + likeRequest.flowID, function (data, err) {

                if (err) {
                    httpMsgs.show500(req, res, err);
                }
                else {
                    console.log(data);
                    httpMsgs.send200(req, res);
                }
            });
        }
    }
    catch (exc) {
        httpMsgs.show500(req, res, exc);
    }
}

exports.comment = function (req, res, commentRequest) {
    try {

        if (!commentRequest) throw new error("Input not valid");


        if (commentRequest) {
            db.executeSql("exec comment @userID=" + commentRequest.userID + ", @flowID =" + commentRequest.flowID + ", @comments='" + commentRequest.comment + "'", function (data, err) {

                if (err) {
                    httpMsgs.show500(req, res, err);
                }
                else {
                    console.log(data);
                    httpMsgs.send200(req, res);
                }
            });
        }
    }
    catch (exc) {
        httpMsgs.show500(req, res, exc);
    }
}

exports.returnComments = function (req, res, flowID) {
    db.executeSql("exec Getcomment  @flowID=" + flowID, function (data, err) {

        if (err) {
            httpMsgs.show500(req, res, err);
        }
        else {
            console.log(data);
            httpMsgs.sendJson(req, res, data);
        }
    });
}

exports.returnLikes = function (req, res, flowID) {
    db.executeSql("exec GetLikes  @flowID=" + flowID, function (data, err) {

        if (err) {
            httpMsgs.show500(req, res, err);
        }
        else {
            console.log(data);
            httpMsgs.sendJson(req, res, data);
        }


    });
}

exports.postBookmarks = function (req, res, Bookmark) {
    try {
        if (!Bookmark) throw new error("Input not valid");

        if (Bookmark) {
            db.executeSql("exec postBookmarks @userId=" + Bookmark.userID + ", @flowID ='" + Bookmark.flowID + "'", function (data, err) {
                if (err) {
                    httpMsgs.show500(req, res, err);
                }
                else {
                    console.log(data);
                    httpMsgs.send200(req, res);
                }
            });
        }
    }
    catch (exc) {
        httpMsgs.show500(req, res, exc);
    }
}

exports.returnBookmarks = function (req, res, userID) {
    db.executeSql("exec returnBookmarks  @userID=" + userID, function (data, err) {

        if (err) {
            httpMsgs.show500(req, res, err);
        }
        else {
            console.log(data);
            httpMsgs.sendJson(req, res, data);
        }


    });
}
exports.deleteFlows = function (req, res, flowID) {
    db.executeSql("exec DeleteFlow  @flowID=" + flowID, function (data, err) {

        if (err) {
            httpMsgs.show500(req, res, err);
        }
        else {
            console.log(data);
            httpMsgs.send200(req, res);
        }
    });
}

exports.editDesc = function (req, res, flowID, Desc) {
    try {
        if (!Desc) throw new error("Input not valid");

        if (Desc) {
            db.executeSql("exec EditDesc @flowID=" + flowID + ", @desc ='" + Desc + "'", function (data, err) {
                if (err) {
                    httpMsgs.show500(req, res, err);
                }
                else {
                    console.log(data);
                    httpMsgs.sendJson(req, res, data);
                }
            });
        }
    }
    catch (exc) {
        httpMsgs.show500(req, res, exc);
    }
}

exports.getFollowers = function (req, res, userID) {
    db.executeSql("exec getFollowers @userID=" + userID, function (data, err) {

        if (err) {
            httpMsgs.show500(req, res, err);
        }
        else {
            console.log(data);
            httpMsgs.sendJson(req, res, data);
        }


    });
}

exports.sendFollowRequest = function (req, res, Request) {
    try {
        if (!Request) throw new error("Input not valid");

        if (Request) {
            db.executeSql("exec sendFollowRequest @userID=" + Request.userID + ", @followID =" + Request.followID + "", function (data, err) {
                if (err) {
                    res.json({"success":0});
                }
                else {
                    console.log(data);
                    res.json({"success":1});
                }
            });
        }
    }
    catch (exc) {
        httpMsgs.show500(req, res, exc);
    }
}
exports.acceptFollowRequest = function (req, res, Request) {
    try {
        if (!Request) throw new error("Input not valid");

        if (Request) {
            db.executeSql("exec acceptFollowRequest @userID=" + Request.userID + ", @followID =" + Request.friendID + "", function (data, err) {
                if (err) {
                    httpMsgs.show500(req, res, err);
                }
                else {
                    console.log(data);
                    res.json({"success":1});
                }
            });
        }
    }
    catch (exc) {
        httpMsgs.show500(req, res, exc);
    }
}



exports.searchBar = function (req, res, letters) {
    db.executeSql("exec searchBar @userLetters='" + letters + "'", function (data, err) {

        if (err) {
            httpMsgs.show500(req, res, err);
        }
        else {
            console.log(data);
            res.json(data);
        }
    });
}

exports.NewsFeed = function (req, res, userID, offset) {
    db.executeSql("exec NewsFeed @userID=" + userID+ ", @offset_rows="+offset, function (data, err) {

        if (err) {
            httpMsgs.show500(req, res, err);
        }
        else {
            console.log(data);
            res.json(data);
        }
    });
}
exports.editProfile = function (req, res, userID, User) {
    try {
        if (!User) throw new error("Input not valid");

        if (User) {
            db.executeSql("exec UpdateUserProfile @userID=" + userID + ", @bio ='" + User.bio + "', @userName='"+User.userName+"', @photoURL='"+User.photoURL+"',@fullName='"+User.fullName+"'", function (data, err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(data);
                    res.json({"success":1});
                }
            });
        }
    }
    catch (exc) {
        httpMsgs.show500(req, res, exc);
    }
}
