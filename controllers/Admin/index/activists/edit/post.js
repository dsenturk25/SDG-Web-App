
const Activist = require("../../../../../models/Activist/activist");

module.exports = (req, res) => {

    Activist.findByIdAndUpdate(req.body._id, {isActivistOfWeek: req.body.status}, (err, activist) => {
        if (err) return res.send({success:false, err: err});
        return res.send({success:true, data: activist});
    })
}
