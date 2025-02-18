const http = require('http');
const app = require('./app');
const config = require('./utils/config')
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(config.PORT, () =>{
    logger.info(`Server running on port ${config.PORT}`)
});

/*
* 4.1 - DONE
* 4.2 - DONE
* 4.3 - DONE
* 4.4 - DONE
* 4.5 - DONE
* 4.6 - DONE
* 4.7 - DONE
* 4.8 - DONE
* 4.9 - DONE
* 4.10 - DONE
* 4.11 - DONE
* 4.12 - DONE
* 4.13 - DONE
* 4.14 - DONE
* 4.15 - DONE
* 4.16 - DONE
* 4.17 - DONE
* 4.18 - DONE
* 4.19 - DONE
* 4.20 - DONE
* 4.21 - DONE
* 4.22 - DONE
* */