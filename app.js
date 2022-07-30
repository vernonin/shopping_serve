const serve = require("./serve/index");
const { PORT } = require("./config");


serve.listen(PORT, () => console.log(`Shopping server running at http://127.0.0.1:${PORT}`))
