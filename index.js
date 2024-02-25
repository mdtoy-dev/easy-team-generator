const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const team = []

const managerInfo = () => {
    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of Manager:"
      },
      {
        type: "input",
        name: "id",
        message: "Enter ID number of Manager:"
      },
      {
        type: "input",
        name: "email",
        message: "Manager's email address:"
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter Manager's office number:"
      }
    ]).then(answer => {
        const manager = new Manager(answer.name, answer.id, answer.email, answer.officeNumber)
        team.push(manager)
        addTeamMember()
    })
}

const addTeamMember = () => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "check",
            message: "Add a team member:"
        }
    ]).then(response => {
        if (response) {
          inquirer
            .prompt([
              {
                type: "list",
                name: "addMember",
                choices: ["Engineer", "Intern", "Complete"],
              },
            ])
            .then((answer) => {
              if (answer.addMember === "Engineer") {
                engineerInfo()
              } else if (answer.addMember === "Intern") {
                internInfo()
              } else {
                createHTML()
              }
            })
        } else {
          createHTML()
        }
    })
}

const engineerInfo = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of Engineer:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter ID number of Engineer:",
      },
      {
        type: "input",
        name: "email",
        message: "Engineer's email address:",
      },
      {
        type: "input",
        name: "github",
        message: "Enter Engineer's github:",
      },
    ])
    .then((answer) => {
      const engineer = new Engineer(
        answer.name,
        answer.id,
        answer.email,
        answer.github
      )
      team.push(engineer)
      addTeamMember()
    })
}

const internInfo = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of Intern:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter ID number of Intern:",
      },
      {
        type: "input",
        name: "email",
        message: "Intern's email address:",
      },
      {
        type: "input",
        name: "school",
        message: "Enter Intern's school:",
      },
    ])
    .then((answer) => {
      const intern = new Intern(
        answer.name,
        answer.id,
        answer.email,
        answer.school
      )
      team.push(intern)
      addTeamMember()
    })
}
managerInfo()