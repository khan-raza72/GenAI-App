// ============================================
// NODE.JS DEBUGGER - How to Turn Off & Control
// ============================================

// Example 1: Simple Script (No Debugger)
// ======================================
console.log("Example 1: Normal script execution");
console.log("This runs without debugger listening");

const numbers = [1, 2, 3, 4, 5];
console.log("Numbers:", numbers);


// Example 2: Script with Debugger Statements (Optional)
// =====================================================
console.log("\nExample 2: With debugger statement");

function calculate(a, b) {
    // debugger; // Uncomment to pause execution when debugger is attached
    return a + b;
}

const result = calculate(10, 20);
console.log("Result:", result);


// Example 3: Conditional Debugging
// =================================
console.log("\nExample 3: Conditional debugging");

const shouldDebug = false; // Change to true to enable

function processData(data) {
    if (shouldDebug) {
        debugger; // Only pauses if shouldDebug is true AND debugger is attached
    }
    return data.toUpperCase();
}

console.log(processData("hello world"));


// Example 4: Try-Catch with Error Logging
// ========================================
console.log("\nExample 4: Error handling without debugger");

function riskyFunction() {
    try {
        const result = 10 / 2;
        return result;
    } catch (error) {
        console.error("Error caught:", error.message);
    }
}

console.log("Risky result:", riskyFunction());


// Example 5: Regular Console Logging
// ==================================
console.log("\nExample 5: Using console methods for debugging");

const user = {
    name: "John",
    age: 30,
    email: "john@example.com"
};

console.log("User:", user);
console.table([user]); // Table format
console.warn("Warning: This is a warning message");
console.error("Error: This is an error message");
console.info("Info: This is an info message");


// Example 6: Timing Code Execution
// =================================
console.log("\nExample 6: Performance timing");

console.time("loop-timer");
for (let i = 0; i < 1000000; i++) {
    // Some operation
}
console.timeEnd("loop-timer");


console.log("\n✅ Script completed without debugger listening!");