## 📌 Question 1

**Question:** What is the difference between var, let, and const?

**Answer:**
var, let, and const are used to declare variables in javascript....
var is the older way of declaring variables it does not respect block scope and can cause unexpected behavior because it is function-scoped and hoisted.......
let and const were introduced in es6 both of them follow block scope which makes the code more predictable..
The difference between let and const is that a variable declared with let can be updated or reassigned but a variable declared with const cannot be reassigned after it is declared.

---

## 📌 Question 2

**Question:** What is the spread operator (...)?

**Answer:**  
The spread operator (...) is used to copy or expand elements of an array or properties of an object.
Arrays and objects are reference data types in javascript if we assign one array or object to another variable directly both variables point to the same reference because of that changing one will also affect the other.
By using the spread operator we can create a copy of the array or object so we can modify the new one without affecting the original.

---

## 📌 Question 3

**Question:** What is the difference between map(), filter(), and forEach()?

**Answer:**  
map(), filter(), and forEach() are array methods used to loop through arrays.
map() creates and returns a new array with the same length by transforming each element.
filter() returns a new array containing only the elements that match a condition and if any conditions doesnt match with item it returns an empty array.
forEach() simply loops through the array and performs an action but it does not return a new array.
...

## 📌 Question 4

**Question:** What is an arrow function?

**Answer:**  
An arrow function is a shorter way to write functions in javascript introduced in es6.
It works similarly to a normal function but the syntax is more concise arrow functions use the () => symbol.
If the function contains only one expression it can return the value automatically without using the return keyword...
...

## 📌 Question 5

**Question:** What are template literals?

**Answer:**  
Template literals are a way to write strings in javascript using backticks (`).
They allow us to insert dynamic values into a string using ${}. This makes it easier to combine variables and text.
...
