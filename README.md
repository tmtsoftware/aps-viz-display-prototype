# aps-viz-display-prototype
This prototype is used to evaluate different visualization techniques for APS.
The visualization techniques explored in this prototype are:
* Edge heights display across all segments in M1
  * Vector field plot
  * Edge triangles 
* Selected segments display (4 x 4 segments)
  * Surface plots for each segment
  * Vector field plots for each segment
* Global surface plot (under development)
  
This prototype is written in React-js and Typescript.

## Prerequisites Required for Running App

The latest version of [Node.js](https://nodejs.org/en/download/package-manager/) must be installed.

## Run the App in Local Environment
1. Clone or download this repository to a local directory
2. cd to the local directory

3. Run following commands in the terminal.
   ```
   npm install
   npm start
   ```
4. Open http://localhost:8080 in a browser


## How to Use the Project

The project has following structure:
```bash
.
├── src
│   ├── assets
│   ├── components
│   ├── config
│   ├── helpers
├── test
├── types
```

* `assets`: This directory contains all the files (images, audio etc) that are used by the UI component.
* `components`: This directory contains all the components created for this UI application.
* `config`: This contains the application specific configurations.
* `helpers`: App reusable functions / utilities goes here.
* `test`: This directory contains all the tests for the UI application.
* `types`: This directory contains all the types that needs to be imported externally for UI application.


## References
- ESW-TS Library - [Link](https://tmtsoftware/esw-ts/)
- ESW-TS Library Documentation - [Link](https://tmtsoftware.github.io/esw-ts/)
