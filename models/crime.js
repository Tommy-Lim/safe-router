var mongoose = require('mongoose')

var CrimeSchema = new mongoose.Schema({
    cad_cdw_id: Number,
    cad_event_number: Number,
    general_offense_number: Number,
	event_clearance_code: Number,
	event_clearance_description: String,
	event_clearance_subgroup: String,
	event_clearance_group: String,
	event_clearance_date: String,
	hundred_block_location: String,
	district_sector: String,
	zone_beat: String,
	census_tract: Number,
	longitude: Number,
	latitude: Number,
	initial_type_description: String,
	initial_type_subgroup: String,
	initial_type_group: String,
	at_scene_time: String
}, {
    collection: 'seattlecrimedata'
});

var Crime = mongoose.model('Crime', CrimeSchema);

module.exports = {Crime: Crime};
