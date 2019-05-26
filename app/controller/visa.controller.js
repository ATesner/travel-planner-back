//** VISA CONTROLLER */
var logID = '[VISA CONTROLLER]';

exports.getVisa = (req, res) => {

    let stmt = `SELECT c.name, v.condition, v.stay 
                    FROM visas v 
                JOIN countries c on c.id = v.country_id 
                WHERE c.id = ?`;

    let params = [ req.query.name ];
    db.query(stmt, params, (err, result) => {
        if (err) {
            res.send({ success: false, message: err });
        } else {
            res.json({ success: true, visa: result });
        }
    });
}