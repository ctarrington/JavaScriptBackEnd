nvm use    
npm install -g typescript    
npm install -g concurrently    
npm install -g nodemon    
npm install -g tslint    
npm install -g typings    

typings install    

concurrently --kill-others "tsc -w --sourceMap" "nodemon simple-polymorphism.js"