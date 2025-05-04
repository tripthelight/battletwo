## NPM INSTALL
- client :  
  - npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-env sass sass-loader css-loader style-loader webpack-dev-server html-webpack-plugin html-loader mini-css-extract-plugin clean-webpack-plugin copy-webpack-plugin image-webpack-loader file-loader url-loader postcss-discard-comments css-minimizer-webpack-plugin babel-plugin-module-resolver autoprefixer
  - npm install dotenv --save-dev  
  - npm install lit --save-dev  
  - npm install postcss-import --save-dev
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

## 공통 비고
- 상대 PEER 방나감은 약 5초후에 확인 가능

## SSL 인증서 검사를 우회
- npm config set strict-ssl false
- npm cache clean --force

## 공통 수정사항
- firefox에서 localStorage, sessionStorage 삭제됨

## 공통 해야할 일
- battletwo.com ssl 이증된 호스트 구매 필요

## battletwo 기존 소스에서 통신
- indianpoker의 경우 원본 경로  
  - request :  
    - /src/client/js/socket/indianpoker/setSocket.js  
  - socket server :  
    - /src/server/socket/indianpoker/indianpoker.js  
  - response :  
    - /src/client/js/socket/indianpoker/getSocket.js  

## 진행상황
- indianPocker basic batting 단계에서 기본 배팅 터치가 안됨
