//** COUNTRY CONTROLLER */

const COUNTRY_TABLE = "countries";

exports.getCountries = (req, res) => {

    let query = `SELECT * from ${COUNTRY_TABLE}`;
    // if(req.query.name) {
    //     query += " WHERE id = " + req.query.name;
    // }
    db.query(query, (err, result) => {
        if (err) {
            res.send({ success: false, message: err });
        } else {
            res.json({ success: true, countries: result });
        }
    });
}