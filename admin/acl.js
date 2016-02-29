var mongoose = require('mongoose');
var acl = require('acl');
var permission = new acl(new acl.mongodbBackend(mongoose.connection.db));

var checkPermission = function(resource, action){
    return function(req, res, next){
        var uid = '';
        if(req.session.hasOwnProperty('userId')){
            uid = req.session.userId;
        }

        // perform permissions check
        permission.isAllowed(uid, resource, action, function(err, result){
            console.log('[' + action + '] permission status on: ' + resource + ' and user: ' + uid + " = " + result);
            if(result){
                next();
            } else {
                var checkError = new Error("user does not have permission to perform this action on this resource");
                next(checkError);
            }
            return;
        });
    }
}

var editContent = function(post, req, res){
    if(!checkPermission(post, "edit")(req, res)){
        return new Error("sorry you don't have permission to edit this post");
    }

    // user has required access permission so it is ok
    // to go ahead and run code to perform the content edit
    // ....
}

var aclCheck = {
    permissionCheck:checkPermission,
    editCheck:editContent
}

module.exports = checkPermission;