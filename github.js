const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) throw new Error("Supply GitHub token");

var client = require('github-graphql-client');

var request = client({
  token: GITHUB_TOKEN,
  query: `{
  viewer {
    repositories(first: 100) {
      edges {
        node {
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
                url
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
    console.log(err)
  } else {
	console.log(res)
	console.log("--------")
	res.data.viewer.repositories.edges.forEach(function(node) {
		console.log(node.node.ref.target)
	})
  }
});
