const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3002;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Simple Calculator</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: Arial, sans-serif;
          background-color: #e6f0ff;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .calculator {
          background: #ffffff;
          padding: 25px;
          border-radius: 10px;
          width: 320px;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        h1 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: #003366;
        }
        .calc-form { display: flex; flex-direction: column; gap: 12px; }
        input, select, button {
          padding: 10px;
          font-size: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          cursor: pointer;
          background: #3399ff;
          color: white;
          border: none;
          transition: background 0.3s;
        }
        button:hover { background: #2673cc; }
        .result { margin: 20px 0; font-size: 1.3rem; color: #008000; }
        .error { color: red; font-size: 1rem; margin-bottom: 10px; }
        .back { display: inline-block; margin-top: 10px; text-decoration: none; color: #003366; font-weight: bold; }
        .back:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="calculator">
        <h1>Simple Calculator</h1>
        <form action="/calculate" method="post" class="calc-form">
          <input type="text" name="num1" placeholder="First Number" required>
          <select name="operation">
            <option value="add">+</option>
            <option value="subtract">-</option>
            <option value="multiply">×</option>
            <option value="divide">÷</option>
          </select>
          <input type="text" name="num2" placeholder="Second Number" required>
          <button type="submit">Calculate</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

app.post("/calculate", (req, res) => {
  const { num1, num2, operation } = req.body;
  const a = parseFloat(num1);
  const b = parseFloat(num2);

  if (isNaN(a) || isNaN(b)) {
    return res.send(`
      <div class="calculator">
        <p class="error">Please enter valid numbers.</p>
        <a class="back" href="/">Back</a>
      </div>
    `);
  }

  let result, symbol;
  switch (operation) {
    case "add": result = a + b; symbol = "+"; break;
    case "subtract": result = a - b; symbol = "-"; break;
    case "multiply": result = a * b; symbol = "×"; break;
    case "divide":
      if (b === 0) return res.send(`<div class="calculator"><p class="error">Cannot divide by zero.</p><a class="back" href="/">Back</a></div>`);
      result = a / b; symbol = "÷"; break;
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Simple Calculator</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: Arial, sans-serif;
          background-color: #e6f0ff;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        .calculator {
          background: #ffffff;
          padding: 25px;
          border-radius: 10px;
          width: 320px;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        h1 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: #003366;
        }
        .result { margin: 20px 0; font-size: 1.3rem; color: #008000; }
        .back { display: inline-block; margin-top: 10px; text-decoration: none; color: #003366; font-weight: bold; }
        .back:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <div class="calculator">
        <h1>Simple Calculator</h1>
        <p class="result">${a} ${symbol} ${b} = <b>${result}</b></p>
        <a class="back" href="/">Back</a>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => console.log(`Calculator running at http://localhost:${PORT}`));
