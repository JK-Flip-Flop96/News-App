console.log("JavaScript start");

function test(){

	console.log("button pressed");

	$.getJSON("http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=440&key=784611CFD37EB6A654286A2536412E62&steamid=76561198078101135", function(result){

		console.log("json return");
	});
};
