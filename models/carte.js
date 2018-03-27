var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var CarteSchema = new Schema({
	id_resto: { type: mongoose.Schema.ObjectId, auto: true},
	nom_resto: String,
	adresse: String,
	zip: String,
	ville_resto: String,
	pays_resto: String,
	img_resto: String,
});

module.exports = mongoose.model('Carte', CarteSchema);



