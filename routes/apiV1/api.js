var express = require('express');

var router = express.Router();

router.get('/stream/:streamName', function (req, res, next) {
	//TODO: search streamer data using streamer name on database
	res.send({
		URL: `http://localhost:8000/live/${req.params.streamId}.flv`,
		Name: 'test',
		Followers: 0,
		Views: 0,
	});
});

router.get('/search/stream', function (req, res, next) {
	//TODO: search streamer data using streamer name on database

	//let streamerId = db.search(req.query.search, req.query.page);

	/*
	URL: `http://localhost:8000/live/${req.params.streamId}.flv`,

	RedesSociales: ['test'],
	Followers: 0,
	ImagenCanal: 'test',
	BannerOffline: 'test',
	
	Name: 'test', //stream data
	AcercaDe: 'test', //stream data
	Titulo: 'test', //stream data
	Categoria: 'test', //stream data
	Tiempo: 'test', //stream data
	Idiomas: 'test', //stream data
	Views: 0, //stream data
	
	*/
	res.send({
		URL: `http://localhost:8000/live/${req.query.query}.flv`,
		Name: 'test',
		About: 'this is a test about description',
		Title: 'test stream xd',
		Tags: ['test1', 'vtuber', 'spain'],
		Time: "2022-10-04T19:55:53.790Z",
		Category: 'csgo',
		Followers: 0,
		Views: 0,
	});
});

router.get('/discover/stream', function (req, res, next) {
	//let randomStreamers = db.search(req.query.page);
	res.send("");
});


module.exports = router;
