# OneCommandLine
Work In Progress<br>
<br>
A simple command line.<br>
Press one `customizable` button (currently not customizable, set to `^`) to open up a small one line window<br>
that supports simple commands:<br>
- `br [value]` - set the brightness of your monitor
- `quit | exit` - terminate OneCommandLine
- ...
<br>
Custom commands can also be added:<br>
1. create your own .js file<br>
2. create an object by the following template:

```javascript
const obj = {
    // the function that executes when you call the command
    // ! your functions parameters can only be string
    func: yourFunction,
    
    // all commands that will call the function
    // ! a command can only be one word
    funcNames: ['commandName', 'alternativeCommandName'],
    
    // amount of parameters your function has
    funcParam: int
}
```

3. export your object:<br>
`module.exports = {object} // you can also export multiple objects, seperated by a comma`<br>
4. add your file to 'OneCommandLine\docs\src\commands' directory<br>
5. restart OneCommandLine
