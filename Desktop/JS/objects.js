// ============================================
// JAVASCRIPT OBJECTS - Complete Guide
// ============================================

// 1. Basic Object Creation
// ========================

// Object Literal
let person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john@example.com",
    city: "New York"
};

for (let element in person){
    console.log(element,person[element]);
}