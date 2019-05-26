//** TRIP CONTROLLER */
const logID = '[TRIP Controller]';
const TRIP_TABLE = 'trips';

exports.getTrip = (req, res) => {

    let query = `SELECT t.*, c.name 
                    FROM ${TRIP_TABLE} t 
                JOIN countries c ON c.id = t.country_id
                WHERE user_id = ?`;
    db.query(query, [ req.userId ], (err, result) => {
        console.log(logID, 'getTrip', result.length)

        if (err) {
            res.send({ success: false, message: err });
        } else {
            res.json({ success: true, trips: result });
        }
    });
}

exports.addTrip = (req, res) => {

    let newTrip = req.body;
    let stmt = `INSERT INTO ${TRIP_TABLE}(country_id, user_id, start_date, end_date, layover)
    VALUES(?, ?, ?, ?, ?)`;
    let layover = (req.body.layovers.length > 0 ? 1: 0);
    let params = [newTrip.pays, req.userId, newTrip.dateDebut, newTrip.dateFin, layover];

    // execute the insert statment
    db.query(stmt, params, (err, results, fields) => {
        if (err) {
            res.send({ success: false, message: err });
        } else {
            res.json({ success: true, trip: results.insertId });
        }
    });
}

exports.deleteTrip = (req, res) => {
    console.log(logID, 'deleteTrip', req.body.id)
    let stmt = `DELETE FROM ${TRIP_TABLE} WHERE id = ? and user_id = ?`;
    let ids = [req.body.id, req.userId];

    // execute the insert statment
    db.query(stmt, ids, (err, results, fields) => {
        if (err) {
            res.send({ success: false, message: err });
        } else {
            res.json({ success: true, message: 'Voyage supprimé !' });
        }
    });
} 