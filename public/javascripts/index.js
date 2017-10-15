function addCardToFeed(content) {
	$("ul.list-group.list-group-flush")
	.prepend(
		$("<a>", {href: content.link})
		.append(
			$("<li>", {class: "list-group-item"})
			.append(
				$("<div>", {class: "row"})
				.append(
					$("<div>", {class: "col-2"})
					.append(
						$("<i>", {class: "fa fa-4x fa-"+content.icon})
					),
					$("<div>", {class: "col-10"})
					.append(
						$("<p>")
						.append(
							$("<b>")
							.text(content.source)
						)
						.append(
							$("<p>")
							.text(content.message)
						)
						.append($("<br>"))
						.append(
							$("<small>", {class: "text-muted"})
							.text(content.time)
						)
					)
				)
			)
		)
	)
}

setInterval(function() {
	$.ajax({
		url: '/github',
		dataType: 'json',
		type: 'GET'
	}).done(function(data) {
		data.reverse().forEach(function(event) {
			addCardToFeed(event)
		})
	}).fail(function(data) {
		console.log("FAIL");
		console.log(data);
	})
}, 1500)
setInterval(function() {
	$.ajax({
		url: '/trello',
		dataType: 'json',
		type: 'GET'
	}).done(function(data) {
		console.log(data);
	}).fail(function(data) {
		console.log("FAIL");
		console.log(data);
	})
}, 1500)
