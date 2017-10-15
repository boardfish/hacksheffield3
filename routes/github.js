var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  github_commits(res.send.bind(res));
});

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) throw new Error("Supply GitHub token");
var previousDateTime = new Date();
previousDateTime.setDate(previousDateTime.getDate() - 2);

github_commits = function (callback) {
    var client = require('github-graphql-client');
    var request = client({
      token: GITHUB_TOKEN,
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
              history(first: 100 since:\"`+previousDateTime.toISOString()+`\") {
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
        previousDateTime = new Date();
     	var repositories = res.data.viewer.repositories
    	var commits = []
    	repositories.edges.forEach(function(node) {
    		var repo = node.node
    		if (!repo.ref) {
    			//no history
    		} else {
    			var history = repo.ref.target.history.edges
    			history.forEach(function(commit) {
    				var commitData = {}
    				commitData.source = commit.node.author.name + " in " + repo.name
    				commitData.message = commit.node.messageHeadline
    				commitData.link = commit.node.commitUrl
    				commitData.time = commit.node.author.date
					commitData.icon = "github"
    				commits.push(commitData)
    			})
    		}
    	})
      }
      return callback(commits);
    });
}

module.exports = router;
