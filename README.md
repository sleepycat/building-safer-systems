# Building Safer Systems

this is a presentation for [BSides Halifax](https://bsideshalifax.ca/) on using LangSec Principles with GraphQL.

## Running the code examples

You will need a recent version of Node.js installed.
In the same directory as the presentation run `npm install` to install the dependencies for the code samples.

You can run the code samples with the following commands:

```bash
# Custom scalar types
$ npm run graphql:customtype 

# Integer type
$ npm run graphql:int 

# Enum type
$ npm run graphql:enum 
```

All of these examples will start a server on `localhost:3000`.

The code for the `graphql-attack-surface` tool can be found [here](https://github.com/sleepycat/graphql-attack-surface).
