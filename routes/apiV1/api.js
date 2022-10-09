var express = require('express');

var router = express.Router();

router.get('/stream/:streamName', function (req, res, next) {
	//TODO: search streamer data using streamer name on database
	res.send(JSON.stringify({
		URL: `http://localhost:8000/live/${req.query.query}.flv`,
		Name: 'test',
		About: 'this is a test about description',
		Title: 'test stream xd',
		Tags: ['test1', 'vtuber', 'spain'],
		Time: "2022-10-04T19:55:53.790Z",
		Category: 'csgo',
		Followers: 0,
		Views: 0,
	}));
});

router.get('/search/stream', function (req, res, next) {
	//TODO: search streamer data using streamer name on database

	//let streamerId = db.search(req.query.search, req.query.page);

	/*
	sin directo:
		title
		followers
		about

	con directo:
		titulo
		juego
		views
		tags
	*/

	res.send(JSON.stringify(
		{
			Streams:
				[
					{
						Username: 'test',
						Category: 'csgo',
						Title: 'test stream xd',
						Views: 0,
						Tags: ['test1', 'vtuber', 'spain'],
					},
					{
						Username: 'test2',
						Followers: 0,
						About: 'this is a test about description',
					},
					{
						Username: 'test3',
						Followers: 0,
						About: 'this is a test about description',
					},
					{
						Username: 'test4',
						Followers: 0,
						About: 'this is a test about description',
					},
					{
						Username: 'test5',
						Followers: 0,
						About: 'this is a test about description',
					},
				]
		}
	));
});

router.get('/search/tag', function (req, res, next) {
	//TODO: search streamer data using streamer name on database

	//let streamerId = db.search(req.query.search, req.query.page);

	//if there no streamers with that tag, return empty array

	res.send(JSON.stringify(
		{
			Streams:
				[
					{
						Username: 'test',
						Category: 'csgo',
						Title: 'test stream xd',
						Views: 0,
						Tags: ['test1', 'vtuber', 'spain'],
					}
				]
		}
	));
});

router.get('/discover/stream', function (req, res, next) {
	//let randomStreamers = db.search(req.query.page);
	res.send(JSON.stringify(
		{
			Streams: 
			[
				{
					Username: 'test',
					Category: 'csgo',
					Title: '[DROPS] 🔴 ASHE/ANA PLAYER 🔴 TRYING 5 HOUR ENERGY | !drops !socials !voice',
					Views: 0,
					Tags: ['test1', 'vtuber', 'spain'],
				},
				{
					Username: 'test2',
					Followers: 0,
					About: 'this is a test about description',
				},
				{
					Username: 'test3',
					Followers: 0,
					About: 'this is a test about description',
				},
				{
					Username: 'test4',
					Followers: 0,
					About: 'this is a test about description',
				},
				{
					Username: 'test5',
					Followers: 0,
					About: 'this is a test about description',
				},
			]
		}
	));
});


module.exports = router;
