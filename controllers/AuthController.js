var DB = require('../db');

var UserController = {
    checkPermission: function (req, res, authorityName, callback) {

        // get userCtrl
        var $this = this;

        // put req and res in object body
        this.req = req;
        this.res = res;
        this.callback = callback;

        // Get token if it exists
        var authHeader = req.headers['x-adc'];

        if(!authHeader){
            var roleId = 1;
            $this.hasUserAuthorize(roleId, authorityName);
        }else{
            /**
             * get rolesId sql
             * @type {string}
             */
            var $sql = 'SELECT UR.rolesREF ' +
                'FROM user U ' +
                'JOIN user_roles UR ON UR.userREF = U.id ' +
                'WHERE U.authHash = ' + DB.escape(authHeader) + " " +
                'GROUP BY U.id';

            DB.query($sql, function (err, roleREF) {
                if (err) throw err;

                if(undefined == roleREF[0]){
                    return $this.noPermission();
                }

                $this.hasUserAuthorize(roleREF[0].rolesREF, authorityName);
            });
        }
    },
    /**
     * @param roleId
     * @param authorityName
     */
    hasUserAuthorize: function (roleId, authorityName) {

        // get userCtrl
        var $this = this;

        // get authority
        DB.query("SELECT * FROM authorities WHERE name =" + DB.escape(authorityName), function (err, authority) {
            if (err) throw err;

            // to json
            authority = authority[0];

            // if there is no authority send 403
            if(!authority){
                return $this.noPermission();
            }

            /**
             * check if this user has permission for this authority
             */
            var $sql = "SELECT * " +
                "FROM `roles_authorities` " +
                "WHERE authoritiesREF = " + DB.escape(authority.id) + " "+
                "AND rolesREF = " + DB.escape(roleId);


            DB.query($sql, function (err, permission) {
                if (err) throw err;


                if(!permission){
                    return $this.noPermission();
                }else{
                    $this.callback();
                }
            });
        });
    },
    noPermission: function(){
        this.res.status(403);
        this.res.send('User not permitted!');
    }
};

module.exports = UserController;