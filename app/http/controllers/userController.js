function userController(){
    return {
        profile(req,res){
            res.render('profile')
        }
    }
}

module.exports = userController