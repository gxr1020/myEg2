App.Routers.Main=Backbone.Router.extend({
	routes:{
		"":"index",
		"/teams":"getTeams",
		"/teams:country":"getTeamsCountry",
		"/teams:country/:name":"getTeam",
		"*error":"fourOfour"
	},
	index:function(){
		console.log("index");
	},
	getTeam:function(){
		console.log("getTeam");

	},
	getTeamsCountry:function(){
		console.log("getTeamsCountry");

	},
	getTeam:function(country,name){
		console.log("getTeam+country+name");

	},
	fourOfour:function(){
		console.log("fourOfour");

	}
});
// http://www.example.com 触发 index()
// http://www.example.com/#/teams 触发 getTeams()
// http://www.example.com/#/teams/country1 触发 getTeamsCountry() 传递 country1 作为参数
// http://www.example.com/#/teams/country1/team1 触发 getTeamCountry() 传递 country1 和 team1 作为参数
// http://www.example.com/#/something 触发 fourOfour() 以作 * （星号）使用。