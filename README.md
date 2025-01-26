# Welcome to Harmony Hub!

to set up locally, all you have to do is:
### General setup
1. Make sure to have node and git installed.
2. Clone this repository.
3. Run `npm i` in the terminal in your code editor.
4. Create an `.env` file and ask Mikkel for the AWS and Anthropic API keys on Slack.
### Amplify setup
5. Run `npm install -g @aws-amplify/cli` in the terminal
6. Configure Amplify by running `amplify configure` 
7. Login to AWS with Mikkel's user (as Mikkel for login details)
8. Select `eu-north-1` as the region
9. Select "mikkel" IAM User
10. Create a new access key with a descriptive description
11. Follow the instructions in the terminal
12. Pull backend from Amplify App by running `amplify pull --appId [Ask Mikkel for appId] --envName dev`
## All set!
13. Run `npm run dev` in the terminal
14. Open your browser and go to `localhost:5173` 

That's it! Now the website should work on your local machine!