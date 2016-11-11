//Whole-script strict mode
"use strict";

var request = require("request");
var cheerio = require("cheerio")

var propertiesObject = { description:"", location:"", full_time:"" };
var url = "https://jobs.github.com/positions";

request({url:url, qs:propertiesObject}, function(err, response, body) {
    if(err) { console.log(err); return; }
    var $ = cheerio.load(body);

    var positionList = $(".positionlist");
    console.log("positionList length: " + positionList.children().length);

    positionList.children().each(function(i, element) {
        console.log("position: " + $(element).find(".title h4").text());
        console.log("company: " + $(element).find(".title .company").text());
        console.log("location: " + $(element).find(".meta .location").text());
        console.log("************************");
    });
});
