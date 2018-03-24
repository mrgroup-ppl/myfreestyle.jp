# MyFreestyle

Welcome to the myfreestyle.jp development area on GitHub. This README will guide you through each step of working within the project from the initial dev environment setup to finding and working in tasks assigned in JIRA and performing your development work in GitHub.

## Getting Started

### Prerequisites

Things you need to have access to, applications installed and how to install them.

#### Access

- [GitHub](https://github.com/mrgroup-ppl) team/collaborator access
- [Slack](https://mrgroup-ppl.slack.com/) team channel access
- [JIRA](https://mrgroup.atlassian.net/) account access

#### Applications

- [GIT](https://git-scm.com/) version control
- [NVM](https://github.com/creationix/nvm) for Mac and Linux or [NVM-Windows](https://github.com/coreybutler/nvm-windows) for Windows
- [Node JS](https://nodejs.org/) - see how to install [using NVM](#nvm-and-node-on-maclinux) or [using NVM-Windows](#nvm-windows-and-node-on-windows)
- [Yarn](https://yarnpkg.com/) package manager
- [Editor Config](http://editorconfig.org/) plugin for your IDE of choice

### Installations

#### NVM and Node on Mac/Linux

1. Install NVM for Mac/Linux [using the install script](https://github.com/creationix/nvm#installation)
2. In a terminal, run `nvm ls-remote` for a list of available versions
3. Run `nvm install 8` to install the latest LTS version of Node 8

#### NVM-Windows and Node on Windows

1. Visit the [latest releases](https://github.com/coreybutler/nvm-windows/releases) page and download `nvm-setup.zip` (currently 1.1.5 at time of writing)
2. Run through the installation wizard to setup NVM-Windows
3. Open a command prompt and run `nvm list available` for a list of available versions
4. Run `nvm install 8` for the latest LTS version of Node 8

### Project Setup

1. Clone this repository to your local computer
2. In a terminal app, `cd` into the project's directory and run `yarn install` to install all npm modules required