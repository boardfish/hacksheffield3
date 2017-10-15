console.log("Loaded!")
function addCardToFeed(source, icon, message, link, time) {
	$("ul.list-group.list-group-flush")
	.prepend(
		$("<a>", {href: link})
		.append(
			$("<li>", {class: "list-group-item"})
			.append(
				$("<div>", {class: "row"})
				.append(
					$("<div>", {class: "col-2"})
					.append(
						$("<i>", {class: "fa fa-4x fa-"+icon})
					),
					$("<div>", {class: "col-10"})
					.append(
						$("<p>")
						.append(
							$("<b>")
							.text(source)
						)
						.append(
							$("<p>")
							.text(message)
						)
						.append($("<br>"))
						.append(
							$("<small>", {class: "text-muted"})
							.text(time)
						)
					)
				)
			)
		)
	)
}
addCardToFeed("test", "pencil-square-o", "test", "test", "test")

// setInterval(function() {
// 	$.ajax({
// 		url: '/github',
// 		dataType: 'json',
// 		type: 'GET'
// 	}).done(function(data) {
// 		console.log(data);
// 	}).fail(function(data) {
// 		console.log("FAIL");
// 		console.log(data);
// 	})
// }, 1500)
