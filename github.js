const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) throw new Error("Supply GitHub token");

var client = require('github-graphql-client');

var request = client({
  token: '2db2c4a68efbd9fe3ac3a1a91518cf83e9a231ff',
  query: `{
  viewer {
    repositories(first: 100) {
      edges {
        node {
		  name
          ref(qualifiedName: "master") {
      target {
        ... on Commit {
          id
          history(first: 5) {
            pageInfo {
              hasNextPage
            }
            edges {
              node {
                messageHeadline
                commitUrl
                message
                author {
                  name
                  date
                }
              }
            }
          }
        }
      }
    }
        }
      }
    }
  }
}`
}, function (err, res) {
  if (err) {
	console.log(GITHUB_TOKEN)
    console.log(err)
  } else {
 	var repositories = res.data.viewer.repositories
	var commits = []
	repositories.edges.forEach(function(node) {
		var repo = node.node
		console.log("--------")
		console.log(repo.name)
		console.log("--------")
		if (!repo.ref) {
			//no history
		} else {
			var history = repo.ref.target.history.edges
			history.forEach(function(commit) {
				var commitData = {}
				commitData.source = commit.node.author.name + " in " + repo.name
				commitData.message = commit.node.messageHeadline
				commitData.url = commit.node.commitUrl
				commitData.date = commit.node.author.date
				commits.push(commitData)
			})
		}
		console.log(commits)
	})
  }
});
