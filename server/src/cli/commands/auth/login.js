import { cancel, confirm, intro, isCancel, outro } from "@clack/prompts";
import { logger } from "better-auth";
import { createAuthClient } from "better-auth/client";
import { deviceAuthorizationClient } from "better-auth/client/plugins";

import chalk from "chalk";
import { Command } from "commander";
import fs from "fs/promises";
import open from "open";
import os from "os";
import path from "path";
import yoctoSpinner from "yocto-spinner";
import * as z from "zod/v4";
import "dotenv/config";
import prisma from "../../../lib/db.js";
import {
  getStoredToken,
  isTokenExpired,
  storeToken,
} from "../../../lib/token.js";

const URL = "http://localhost:3005";
const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const CONFIG_DIR = path.join(os.homedir(), "better-auth");
export const TOKEN_FILE = path.join(CONFIG_DIR, "token.json");

export async function loginAction(opts) {
  const options = z.object({
    serverUrl: z.string().optional(),
    clientId: z.string().optional(),
  });
  const serverUrl = options.serverUrl || URL;
  const clientId = options.clientId || CLIENT_ID;

  intro(chalk.bold("🔐Auth CLI Login"));

  const existingToken = await getStoredToken();
  const expired = await isTokenExpired;

  if (existingToken && !expired) {
    const shouldReAuth = await confirm({
      message: "You are already loggedIn.Do you want to login Again?",
      initialValue: false,
    });
    if (isCancel(shouldReAuth) || !shouldReAuth) {
      cancel("Login Cancelled");
      process.exit(0);
    }
  }
  const authClient = createAuthClient({
    baseURL: serverUrl,
    plugins: [deviceAuthorizationClient()],
  });
  const spinner = yoctoSpinner({ text: "Requesting device authorization..." });
  spinner.start();

  try {
    const response = await authClient.device.code({
      client_id: clientId,
      scope: "openid profile email",
    });
    const { data, error } = response;
    spinner.stop();

    if (error || !data) {
      console.error("Full error response:", response);
      logger.error(
        `Failed to request device authorization: ${error?.error_description || error?.message || JSON.stringify(error) || "Unknown error"}`
      );
      process.exit(1);
    }
    const {
      device_code,
      user_code,
      verification_uri,
      verification_uri_complete,
      interval = 5,
      expires_in,
    } = data;
    console.log(chalk.cyan("Device Authorization Required"));

    console.log(
      `Please visit ${chalk.underline.blue(verification_uri || verification_uri_complete)}`
    );

    console.log(`Enter Code: ${chalk.bold.green(user_code)}`);

    const shouldOpen = await confirm({
      message: "Open browser automatically",
      initialValue: true,
    });
    if (!isCancel(shouldOpen) && shouldOpen) {
      const urlToOpen = verification_uri_complete ||verification_uri ;
      await open(urlToOpen);
    }
    console.log(
      chalk.gray(
        `Waiting for authorization(express in ${Math.floor(
          expires_in / 60
        )}minutes)...`
      )
    );

    const token = await poolForToken(
      authClient,
      device_code,
      clientId,
      interval
    );
    if (token) {
      const saved = await storeToken();
      if (!saved) {
        console.log(
          chalk.yellow("\n⚠ Warning:Could not save authentication token.")
        );
        console.log(chalk.yellow("You may need to login againon next use."));
      }
      //todo: get user data
      outro(chalk.green("Login successfull!"))

      console.log(chalk.yellow(`\n Token saved to: ${TOKEN_FILE}`))
      console.log(chalk.gray("You can now use the AI commands without logging in again.\n"))
    }
  } catch (error) {
    spinner.stop();
    console.error(chalk.red("\nLogin Failed:"));
    console.error("Error details:", {
      message: error?.message,
      cause: error?.cause,
      stack: error?.stack,
      fullError: error
    });
    process.exit(1);
  }
}

//COMMANDER SETUP

async function poolForToken(authClient, device_code, clientId, initialInterval) {
  let poolingInterval = initialInterval
  const spinner = yoctoSpinner({ text: "", color: "cyan" });
  let dots = 0;

  return new Promise((resolve, reject) => {
    const poll = async () => {
      dots = (dots + 1) % 4;
      spinner.text = chalk.gray(
        `Polling for authorization${".".repeat(dots)}${" ".repeat(3 - dots)}`
      );
      if (!spinner.isSpinning) spinner.start();

      try {
        const { data, error } = await authClient.device.token({
          client_id: clientId,
          device_code,
          grant_type: "urn:ietf:params:oauth:grant-type:device_code",
          fetchOptions: {
            headers: {
              "user-agent": "My CLI",
            },
          },
        });
        if (data?.access_token) {
          console.log(
            chalk.bold.yellow(`Your access token :${data.access_token}`)
          );
          spinner.stop();
          resolve(data);
          return;
        } else if (error) {
          switch (error.error) {
            case "authorization_pending":
              break;
            case "slow_down":
              poolingInterval += 5;
              break;
            case "access_denied":
              console.error("Access was denied by the user");
            case "expired_token":
              spinner.stop();
              console.error("The device code has expired. Please try again");
              return;
            default:
              spinner.stop();
              logger.error(`Error:${error.error_description} `);
              process.exit(1);
          }
        }
      } catch (error) {
        spinner.stop();
        logger.error(`Network error:${error.message} `);
        process.exit(1);
      }
      setTimeout(poll, poolingInterval * 10);
    };
    setTimeout(poll, poolingInterval * 1000);
  });
}
export const login = new Command("login")
  .description("Login to Better Auth")
  .option("--server-url <url>", "The Better Auth server URL", URL)
  .option("--client-id <id>", "The OAuth Client ID", CLIENT_ID)
  .action(loginAction);
