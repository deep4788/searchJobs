#!/usr/bin/env node
"use strict";

//Load the modules
const fs = require("fs");
const chalk = require("chalk");
const cheerio = require("cheerio");
const program = require("commander");
const json2csv = require("json2csv");
const request = require("request");
const pkg = require("./package.json");

//A json array to hold all the positions
var allpositions = [];

//This function creates a csv file with all the positions details
function createCSVData(inData) {
    var fields = ["positionName", "url", "companyName", "address"];
    var fieldNames = ["Position", "URL", "Company", "Location"];
    var csv = json2csv({ data: inData, fields: fields, fieldNames: fieldNames});

    fs.writeFile("jobsDetails.csv", csv, function(error) {
        if(error) throw error;
        console.log(chalk.green("Job details are successfully saved in jobsDetails.csv file"));
    });
}

//This function searches for jobs on: https://jobs.github.com/positions
function searchForJobs(pageNumber, descrip, loc) {
    var url = "https://jobs.github.com/positions";
    var propertiesObject = {};
    var morePages = 0;  //0 signifies false and >0 means true

    //Loop through all the pages and find all the jobs matching the query string
    propertiesObject = { description:descrip, location:loc, full_time:"", page:pageNumber};
    request({url:url, qs:propertiesObject}, function(error, response, body) {
        if(error) {
            console.log(chalk.red.bold(error));
            return;
        }

        //Load in the HTML in a jQuery object ("$" makes it easy to recognize it as a jQuery object)
        var $ = cheerio.load(body);

        //Get the positionList section
        var positionList = $(".positionlist");

        var positionDetails = {};
        positionList.children().each(function(i, element) {
            positionDetails.positionName = $(element).find(".title h4").text();
            positionDetails.url = "https://jobs.github.com" + $(element).find(".title h4 a").attr("href");
            positionDetails.companyName = $(element).find(".title .company").text();
            positionDetails.address = $(element).find(".meta .location").text();

            if(positionDetails.positionName) {
                allpositions.push(positionDetails);
            }
            positionDetails = {};
        });
        morePages = positionList.children().find(".pagination .js-paginate").text().length;
        if(morePages) {
            pageNumber += 1;
            searchForJobs(pageNumber, descrip, loc);
        }
        else if(morePages === 0) {
            //We are done processing so create the csv file
            createCSVData(allpositions);
        }
    });
}

//Main function where magic starts
function main() {
    //Read the command line arguments
    program
        .version(pkg.version)
        .description("An application to search for jobs based on keywords and location")
        .option("-k, --keywords <keywords>", "list all comma-separated keywords: title, benefits, companies, expertise", "")
        .option("-l, --location [location]", "filter by city, state, zip code or country", "")
        .parse(process.argv);

    //Check to make sure that options are passed
    if(process.argv.length <= 2) {
        program.help();
    }

    //Start the job search
    searchForJobs(0, program.keywords, program.location);
}

main();
