Search for Jobs
===============

`sj`: A command-line utility to search for jobs based on keywords and location written in Node.js.

Description
-----------

This utility helps to search for jobs posted on GitHub's website: **https://jobs.github.com/positions**.

It can be passed two comamnd-line arguments:

- **keywords**: list of comma-separated keywords: title, benefits, companies, expertise  
- **location**: filter by city, state, zip code or country

Once the jobs are searched by `sj`, the details about the jobs will be saved in a file called "jobsDetails.csv" in the directory where `sj` is called from.

Installation
------------
- Install Node.js and npm
- Run `npm install -g searchJobs`

Usage
-----

```sh
  sj [options]

  An application to search for jobs based on keywords and location

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -k, --keywords <keywords>  list all comma-separated keywords: title, benefits, companies, expertise
    -l, --location [location]  filter by city, state, zip code or country

# Example usage:
$ sj -k java -l chicago  #Search jobs for java and in Chicago
$ sj -k "software engineer" -l  #Seach jobs for software engineer and any location
$ sj -k "software engineer,senior" -l seattle  #Seach jobs for software engineer, for senior position and in Seattle
$ sj -k -l  #Seach jobs with no passed-in keywords or location, default search
$ sj -k ruby,manager,javascript -l atlanta  #Search jobs with ruby, manager and javascript as keywords and Atlanta as location
```

Author
------
Deep Aggarwal  
deep.uiuc@gmail.com  
Date Started: 11/10/2016  
