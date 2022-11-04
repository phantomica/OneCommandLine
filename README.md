# OneCommandLine
A simple command line.<br> 
Press one <code>customizable</code> button to open up a small one line window that supports simple commands:<br>
- <code>br [value]</code> - set the brightness of your monitor
- <code>settings</code> - opens up the settings menu
<br>
Custom commands can also be added:<br>
1. create own .js file<br>
2. create an object by the following template:

```javascript
const obj = {
    func: yourFunction, // the function that executes when you call the command
    funcNames: ['commandName', 'alternativeCommandName'], // COMMAND IS ONLY ONE WORD, all commands that will call the function
    funcParam: boolean, // set true if your function has 1 single line parameter, else false
    funcProperties: boolean, // set true if your function has multiple parameters or 1 multi line parameter, else false
}
```

3. export your object:<br>
<code>module.exports = {object} // you can also export multiple objects at once</code><br>
4. add your file to 'OneCommandLine\docs\src\commands' directory<br>
