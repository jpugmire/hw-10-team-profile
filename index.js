//imports
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');  //js classes
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');  //for prompts
const path = require('path');
const fs = require('fs');  //for saving data

//create variables for output folder
const DIST = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST, 'team.html');

//require page model
const render = require('./src/page-model.js');

//create variables to track team members and id's
const teamMembers = [];
const idArray = [];

//inform user its starting
console.log('\nTeam Generator\nUse `npm reset` to reset the dist/ folder\n');

function menu() {
    function createManager() {
        console.log('Build team');
        //ask for mgr info
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'managerName',
                    message: 'Manager name:',
                    validate: (answer) => {
                        if (answer !== '') {
                            return true;
                        }
                        return 'Name field must not be empty';
                    },
                },
                {
                    type: 'input',
                    name: 'managerId',
                    message: "Manager Id:",
                    validate: (answer) => {
                      const pass = answer.match(/^[1-9]\d*$/);
                      if (pass) {
                        return true;
                      }
                      return 'Enter a positive number greater than zero.';
                    },
                  },
                  {
                    type: 'input',
                    name: 'managerEmail',
                    message: "Manager email:",
                    validate: (answer) => {
                      const pass = answer.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                      if (pass) {
                        return true;
                      }
                      return 'Invalid email address.';
                    },
                  },
                  {
                    type: 'input',
                    name: 'managerOfficeNumber',
                    message: "Manager office number:",
                    validate: (answer) => {
                      const pass = answer.match(/^[1-9]\d*$/);
                      if (pass) {
                        return true;
                      }
                      return 'Enter a positive number greater than zero.';
                    },
                  },
            ])
            .then((userInfo) => {
                const manager = new Manager(
                    userInfo.managerName,
                    userInfo.managerId,
                    userInfo.managerEmail,
                    userInfo.managerOfficeNumber
                );
                teamMembers.push(manager);
                idArray.push(userInfo.managerId);
                menuOptions();
            });
    }

    function menuOptions() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'memberChoice',
                message: 'Choose team member type to add or finish',
                choices: [
                    'Engineer',
                    'Intern',
                    'Finish'
                ]
            }
        ]).then((userRes) => {
            switch (userRes.memberChoice) {
                case 'Engineer':
                    addEngineer();
                    break;
                case 'Intern':
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }

    function addEngineer() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: "Engineer name:",
                validate: (answer) => {
                    if (answer !== '') {
                    return true;
                    }
                    return 'Must enter a name';
                }
            },
            {
                type: 'input',
                name: 'engineerId',
                message: "Engineer Id:",
                validate: (answer) => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        if (idArray.includes(answer))
                            return 'ID already in use. Use a different number.';
                        else
                            return true;
                    }
                    return 'Must use a positive number greater than zero';
                }
            },
            {
                type: 'input',
                name: 'engineerEmail',
                message: "Engineer Email:",
                validate: (answer) => {
                    const pass = answer.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                    if (pass)
                      return true;
                    return 'Must enter a valid email';
                },
            },
            {
                type: 'input',
                name: 'engineerGithub',
                message: "Engineer github username:",
                validate: (answer) => {
                  if (answer !== '') {
                    return true;
                  }
                  return 'Must enter a username.';
                },
              },
        ]).then((userRes) => {
            const engineer = new Engineer(
                userRes.engineerName,
                userRes.engineerId,
                userRes.engineerEmail,
                userRes.engineerGithub
              );
              teamMembers.push(engineer);
              idArray.push(userRes.engineerId);
              menuOptions();
        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: "Intern name:",
                validate: (answer) => {
                    if (answer !== '') {
                    return true;
                    }
                    return 'Must enter a name';
                }
            },
            {
                type: 'input',
                name: 'internId',
                message: "Intern Id:",
                validate: (answer) => {
                    const pass = answer.match(/^[1-9]\d*$/);
                    if (pass) {
                        if (idArray.includes(answer))
                            return 'ID already in use. Use a different number.';
                        else
                            return true;
                    }
                    return 'Must use a positive number greater than zero';
                }
            },
            {
                type: 'input',
                name: 'internEmail',
                message: "Intern Email:",
                validate: (answer) => {
                    const pass = answer.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                    if (pass)
                      return true;
                    return 'Must enter a valid email';
                },
            },
            {
                type: 'input',
                name: 'internSchool',
                message: "intern school:",
                validate: (answer) => {
                  if (answer !== '') {
                    return true;
                  }
                  return 'Must enter a school name.';
                },
              },
        ]).then((userRes) => {
            const intern = new Intern(
                userRes.internName,
                userRes.internId,
                userRes.internEmail,
                userRes.internSchool
              );
              teamMembers.push(intern);
              idArray.push(userRes.internId);
              menuOptions();
        });
    }

    function buildTeam() {
        // Create the output directory if the dist path doesn't exist
        if (!fs.existsSync(DIST)) {
            fs.mkdirSync(DIST);
        }
      fs.writeFileSync(distPath, render(teamMembers), 'utf-8');
    }

    createManager();
}

menu();
//menu
    //user enters data
    //manager: name, employee id, email, office number
    //prompt to add an engineer or intern to finish building team
    //selecting engineer option
        //engineer: name, ID, email, github username,
        //after engineer is entered, return to main
    //selecting intern option
        //intern: name, ID, email, school
        //after intern is created, return to main

//generate html

