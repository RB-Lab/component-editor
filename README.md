
# Component-editor

> Web-based editor for components. Initially for React components with
React-Bootstrap preset of components

## Running your project

#### just with live reload:

```bash
$ npm start
```

#### in dev mode (with sourcemaps)

```bash
$ npm run dev
```

#### build:

```bash
$ npm run build
```


#### TODO

- refactor Frame (ReFlux?)
	- get rid of workspace-specific props in exported jsx
- add ability to delete active component (+by `del` key)
- selecting custom components as well as standard
- save custom components names on `enter` hit and set focus into field
- add more components
	- to bootsrap pane
	- standard pane (iterator etc)
	- ability to import components
		- build-in libraries
		- export from npm (?...)
- beter prpopety management
	- ~~list through propTypes~~
	- custom porps
		- already definde custom props
	- ~~save props on blur or on `enter` hit~~
	- ~~move styles to other tab~~
	- get rid of inline functions
	- logic and props bindings (`{this.props.foo}`, `{this.doBar}`)
- logic management
	- button and pop-up for it, available only for custom components
- impots 
	- panes to injecte collections?
	- text of imports
- deal with real files (FileSystem API, server call and json or at least data uri http://goo.gl/hDYC4p)
- package.json creator
- component diagramm
