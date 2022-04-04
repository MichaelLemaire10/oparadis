const { cloudCreatePhoto, cloudCreateAvatar, cloudDelete } = require('../services/cloud');

module.exports = async (req, res, next) => {
    try {
        if(req.method === "POST"){
            if(req.body.photo){
                req.body.photo = await cloudCreatePhoto(req.body.photo);
                next();
            } else if (req.body.avatar){
                req.body.avatar = await cloudCreateAvatar(req.body.avatar);
                next();
            }else {
                next();
            }
        } else if (req.method === "PATCH"){
            if(req.body.photo){
                if(req.body.url){
                    await cloudDelete(req.body.url);
                    req.body.photo = await cloudCreatePhoto(req.body.photo);
                    delete req.body.url;
                    next();
                }else{
                    req.body.photo = await cloudCreatePhoto(req.body.photo);
                    delete req.body.url;
                    next();
                }
            } else if (req.body.avatar) {
                if(req.body.url){
                    await cloudDelete(req.body.url);
                    req.body.avatar = await cloudCreateAvatar(req.body.avatar);
                    delete req.body.url;
                    next();
                }else{
                    req.body.avatar = await cloudCreateAvatar(req.body.avatar);
                    delete req.body.url;
                    next();
                }
            } else {
                next();
            }
        }
        else if (req.method === "DELETE"){
            if(req.body.url){
                await cloudDelete(req.body.url);
                next();
            } else{
                next();
            }
        } else{
            next();
        }
    } catch (err) {
		// console.log('cloudMW', err);
        res.status(err.http_code).json(err.message);
    }
};