const app = require("./api/index");

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server running on http://localhost:3000");
});