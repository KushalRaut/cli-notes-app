<h3>CLI Notes CRUD Application</h3>

<!-- ABOUT THE PROJECT -->

## About The Project

This was my first NodeJs project made in Nov,2021.This applications performs CRUD operations on notes. I simply took input from the cli using <a href="https://www.npmjs.com/package/yargs" target="blank">yargs</a> and performed operations based on it.

### Built With

<p>
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=nodejs" />
  </a>
</p>

<!-- GETTING STARTED -->

## Getting Started

Simply clone the repository using:

```
git clone https://github.com/KushalRaut/Notes-App.git
```

## Prerequisites

You will need to have NodeJs installed in your system to run this project.

## Installation

   Install NPM packages
   ```sh
   npm install
   ```
   
## Usage

   Run the `app.js` file and add your command just next to it

   List all notes
   ```sh
   node app.js list
   ```
   
   Add a note
   ```sh
   node app.js add --title "Your Note Title" --description "Your Note descrition"
   ```
   
   Delete a note 
   ```sh
   node app.js delete --title "Your Note Title"
   ```
