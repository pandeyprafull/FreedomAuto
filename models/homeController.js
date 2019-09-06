exports.getHome = (req, res, next) =>{
    res.status(200).json({message: 'Inside home route'})
}