var express = require('express');
var router = express.Router();

/* GET home page. */
var previousDateTime = new Date();
previousDateTime.setDate(previousDateTime.getDate() - 2);

router.get('/', function(req, res, next) {
	trello_actions(function(data, send) {
		if (send) {
			res.send(data);
			previousDateTime = new Date();
		}
  });
});

trello_actions = function(callback) {
	var Trello = require("node-trello");
	var key = process.env.TRELLO_KEY;
	var token  = process.env.TRELLO_TOKEN;
	var t = new Trello(key, token);

	t.get("/1/members/me", function(err, data) {
		if (err) throw err
		boardListData = data['idBoards'];
		var events = [];
		var length = boardListData.length;

		var count = 0;
		boardListData.forEach(function(boardId) {
			t.get("/1/boards/"+boardId+"/actions?limit=3", function(err, data) {
				if (err) throw err
				data.forEach(function(action) {
					var source = action.data.board.name
					var date = action.date
					if (Date.parse(date) > previousDateTime) {
						var message = action.type;
						var url;
						if (action.data.card) {
							message += ": " + action.data.card.name
							url = action.data.card.shortLink
							url = "https://trello.com/c/" + url;
						} else {
							url = action.data.board.shortLink;
							url = "https://trello.com/b/" + url;
						}
						eventData = {
							'source': source,
							'message': message,
							'link': url,
							'time': date,
                            'icon': 'trello',
						};
						events.push(eventData);
					}
				});
				count++;
				callback(events, count >= length);
			});
		});
	});
}

module.exports = router;
