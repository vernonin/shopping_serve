const serve = require("./serve/index");
const { PORT } = require("./config");

const LOG = `shopping server running at http://127.0.0.1:${PORT}`

serve.listen(PORT, () => console.log(LOG))
