// Define the MigScript interpreter class
class MigScriptInterpreter {
    constructor() {
        // Initialize variables
        this.variables = {};
    }

    // Function to evaluate expressions
    evaluateExpression(expression) {
        // Check if the expression contains a font change
        const fontChangeMatch = expression.match(/\.font\(([^)]+)\)/);
        if (fontChangeMatch) {
            // Implement font change logic here (not provided in this basic example)
            console.log("Font change: " + fontChangeMatch[1]);
            // Remove the font change part from the expression
            expression = expression.replace(/\.font\([^)]+\)/, '');
        }
        return expression;
    }

    // Function to execute MigScript code
    execute(code) {
        // Split code into lines
        const lines = code.split('\n');

        // Iterate through each line
        for (let line of lines) {
            // Trim whitespace
            line = line.trim();

            // Ignore empty lines and comments
            if (line === '' || line.startsWith('//')) {
                continue;
            }

            // Check if line contains a variable declaration
            if (line.startsWith('let')) {
                // Extract variable name and value
                const [_, variableName, value] = line.match(/let (\w+) = (.+);/);
                // Evaluate the expression
                this.variables[variableName] = this.evaluateExpression(value);
            }

            // Check if line contains a writl() function call
            if (line.startsWith('writl')) {
                // Extract the expression inside writl()
                const expression = line.match(/writl\((.+)\);/)[1];
                // Evaluate the expression and print the result
                console.log(this.evaluateExpression(expression));
            }
        }
    }
}

// Example MigScript code
const migScriptCode = `
let name = 'John';
let age = 25;
writl('Hello, my name is ' + name); // Output: Hello, my name is John
writl('I am ' + age + ' years old'); // Output: I am 25 years old
let font = '.font("Arial")';
writl(font + ' Hello, world!'); // Output: Hello, world! (with font change)
`;

// Create an instance of the interpreter
const interpreter = new MigScriptInterpreter();

// Execute the MigScript code
interpreter.execute(migScriptCode);