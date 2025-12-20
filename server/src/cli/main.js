#!/usr/bin/env node

import "dotenv/config";
import chalk from "chalk";
import figlet from "figlet";
import { Command } from "commander";
import {login,logout,whoami} from './commands/auth/login.js'
import {wakeUp } from './commands/ai/wakeUp.js'

async function main() {
  //Display Banner
  console.log(
    chalk.cyan(
      figlet.textSync("GemCLI", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
    ))
    console.log(chalk.gray("A Cli based AI tool \n")
  );

const program=new Command("gemcli");

program
  .version("1.0.0")
  .description("gemcli CLI")
  .addCommand(login)
  .addCommand(logout)
  .addCommand(whoami)
  .addCommand(wakeUp)

  program.action(()=>{
    program.help();
  })

program.parse(); 
}

main().catch((err)=>{
  console.log(chalk.red("Error running gemcli CLI"),err)
    process.exit(1)
})