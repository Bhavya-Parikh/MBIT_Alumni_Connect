function homeController(){
    return {
        moreinfo(req,res){
            res.render('tell-us-more')
        }
    }
}

module.exports = homeController