#!/usr/bin/env node

import "dotenv/config";
import chalk from "chalk";
import figlet from "figlet";
import { Command } from "commander";
import {login} from './commands/auth/login.js'

async function main() {
  //Display Banner
  console.log(
    chalk.cyan(
      figlet.textSync("Orbital CLI", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    ))
    console.log(chalk.green("Welcome to Orbital CLI")
  );

const program=new Command("orbital");

program
  .version("1.0.0")
  .description("Orbital CLI")
  .addCommand(login)

  program.action(()=>{
    program.help();
  })

program.parse();
}

main().catch((err)=>{
    console.log(chalk.red("Error running orbital CLI"),err)
    process.exit(1)
})