## NPM INSTALL
- client :  
  - npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-env sass sass-loader css-loader style-loader webpack-dev-server html-webpack-plugin html-loader mini-css-extract-plugin clean-webpack-plugin copy-webpack-plugin image-webpack-loader file-loader url-loader postcss-discard-comments css-minimizer-webpack-plugin babel-plugin-module-resolver autoprefixer
  - npm install dotenv --save-dev  
  - npm install lit --save-dev  
- server :  
  - npm install cluster redux @reduxjs/toolkit ioredis uuid --save-dev

## VSCODE EXTENSION
- todo highlight
- Material theme
- Material icon theme
- Prettier
- bracket pair colorizer
- Indent-rainbow
- Auto rename tag
- Markdown All in One
- plantUML
- File Tree Generator

## FOLDER TREE
battletwo  
├─ .vscode  
├─ src  
│ ├─ client  
│ │ ├─ assets  
│ │ │ ├─ images  
│ │ │ └─ scss  
│ │ │ ├─ common  
│ │ │ ├─ game  
│ │ │ │ └─ taptap  
│ │ │ ├─ main  
│ │ │ ├─ selectGame  
│ │ │ └─ selectUser  
│ │ ├─ components  
│ │ │ ├─ popup  
│ │ │ └─ waitUser  
│ │ ├─ js  
│ │ │ ├─ common  
│ │ │ ├─ module  
│ │ │ ├─ view  
│ │ │ │ ├─ game  
│ │ │ │ │ └─ taptap  
│ │ │ │ ├─ main  
│ │ │ │ ├─ selectGame  
│ │ │ │ └─ selectUser  
│ │ │ ├─ webPack  
│ │ │ └─ webRTC  
│ │ ├─ store  
│ │ ├─ views  
│ │ │ ├─ game  
│ │ │ │ └─ taptap.html  
│ │ │ ├─ selectGame.html  
│ │ │ └─ selectUser.html  
│ │ └─ index.html  
│ └─ server  
│ ├─ cluster_master.js  
│ ├─ server_webrtc.js  
│ └─ server_websocket.js  
├─ package.json  
├─ package-lock.json  
└─ webpack.config.js  

## 진행상황
- tabtab은 완료
- 상대 PEER 방나감은 약 5초후에 확인 가능

## 공통 수정사항
- firefox에서 localStorage, sessionStorage 삭제됨
