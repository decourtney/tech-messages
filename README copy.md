# Tech Messages

[![License: MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](https://choosealicense.com/licenses/mit/)
  
## Table of Contents

* [Description](#description)
* [Installation](#installation)
* [Usage](#usage)
* [Contribution](#contribution)
* [Testing](#testing)
* [Questions](#questions)
* [Licensing](#licensing)

## Description

Tech Messages is a basic forum allowing registered users to create, delete, reply, and modify their posted messages. My goal in creating this app was to build my first full stack application with more emphasis on developing the backend and forum functionality. Currently, the application stores basic user information and passwords, encrypted with Bcrpyt, in a MySQL database along with associated main threads and posts. I used Sequelize to perform DB queries, Express for routing and API requests, and Handlebars for HTML templating.

Initially I thought Handlebars was a basic templting tool capable of creating limited dynamic pages but it continues to reveal more techniques to create dynamic pages the more I dig into it. I wouldn't say I struggled with Handlebars but I have happily refactored portions of code after discovering some of those techniques.

For now the app has no means of password recovery and the search bar functionality has not been completed. Careful with the delete button - theres no conrfirmation yet =D

Deployed Project: https://polar-plateau-51344.herokuapp.com/

<!-- <br>
  <div>  
      <img src="./assets/.png" target="_blank" alt="" style="max-width: 768px; display: block;" />  
  </div>
<br> -->

## Installation

To run Sequelized E-Commerce Back-end locally you'll need to first install Node and then install the following modules:

- dotenv    v8.2.0
- express   v4.17.1
- mysql2    v2.1.0
- sequelize v5.21.7
- nodemon (recommended)

- Insomnia for testing queries

## Usage

Create the database:
- Navigate to the project's root folder, open a terminal, and log into mysql: **mysql -u root -p**
- Then create the database using the db/schema.sql: **source db/schema.sql**

Seed and start the database:
- From another terminal seed the database by running the command: **node seeds/.**
- Now start the server: **nodemon .**

Once the server is running start Insomnia and reference the videos below to test queries:


## Contribution

Follow the "fork-and-pull" Git workflow.

  1. **Fork** the repo on GitHub
  2. **Clone** the project to your own machine
  3. **Commit** changes to your own branch
  4. **Push** your work back up to your fork
  5. Submit a **Pull request** so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

## Testing
  
N/A

## Questions

Feel free to contact me with any questions or comments:  
<donovan.courtney@gmail.com>  
<https://github.com/decourtney>

## Licensing

Code and Docs released under [MIT License](https://choosealicense.com/licenses/mit/).
