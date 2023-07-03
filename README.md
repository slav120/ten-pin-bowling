## About

Node / Express API backend for 4th Whale stacks.

Tooling:

-   Typescript
-   ESLint
-   Prettier
-   Husky
-   Sentry

## TODO

-   CI template
-   Server / deployment template
-   Mockup routes
-   Dependency bot howto
-   Documentation improvement
-   Cleanup references to past projects (rabbitsdeals, rabbitsreviews)

# Best practices

-   Use an LTS release of node that is supported by AWS (currently 14)
-   We use npm, not yarn - always use npm
-   Minimize adding additional packages
-   Use the HTTP status code for error handling instead of include a '500' as an error status in the response body.
-   Do not use `eslint ignore` directives unless unavoidable
-   Run `npm run build` locally before creating a pull request to validate that the project builds
-   Files
-                                   Types should be seperated into individual structures and imported into the functions
-                                   Reuse functions whenever possible
-                                   Refactor existing code instead of adding new when possible
-   Route names should be in the plurial form (sites, categories, tags, performers)
-   When entities will be reused by multiple routes separate them
-   Never commit/push to main/qc directly
-   Always use the ? opperator when making a querry to prevent users pushings scripts
-   The models should hold all the logic, your querry etc inside of a function (Keep the functions reusable and easy to use so you can inport them in multiple routes if needed)
-   The routes should only keep the route path and function calls you have created in the models to return their results

## Installation

1. Install a supported LTS nodejs executable on your workstation from https://nodejs.org/en/download/
1. Clone the git repository `git clone git@github.com:ExSituMarketing/api.domain.tld.git`
1. Enter the project src folder `cd api.domain.tld/`
1. Create an env.local `mv example.env.local env.local`
1. Add a .env file with the values below
1. Install node dependencies `npm install`
1. Run the application `npm run dev`
1. Open the following in your browser: http://localhost:8081/ and you should see `Coming soon`

## Configure Sentry

1. Verify that a new sentry project has been created and provided - separate from any existing sentry project - see Charles
1. Follow the directions here: https://docs.sentry.io/platforms/node/guides/express/

## Customize for each product:

1. .env.local with your desired values (Rename the included example.env.local)

## .env file

Replace the values XXX with the datavbase information you would like to use for development / staging

```
host=XXX
username=XXX
password=XXX
database=XXX
```

## Devops templates

1. Update the willy / prod configs

## Useful commands

1. `npm run lint` Will run eslint and validate all typescript outputting errors and warnings - will run automatically on commit and prevent commit if errors are detected.
1. `npm run format` Will run prettier and format the code - will run automatically on commit.
1. `npm run clean` Removes all the transpiled javascript from the dist folder

## References

-   [Setting up a CI/CD pipeline on AWS](https://levelup.gitconnected.com/setup-a-ci-cd-pipeline-to-deploy-node-js-application-to-aws-95635b15675b)

## Usage

Here would be the list of all routes and how to use / what if they return

> /v1/example/{name} This route takes a name as a param and then displays Hello {name}!
