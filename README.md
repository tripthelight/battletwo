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

## sessionStorage 암호화 전략
- sessionStorage에 저장될 key와 value는 상황에 맞는 패턴으로 암호화 할 것.
- sessionStorage에 저장될 key와 value는 랜덤한 10글자의 대문자 영문으로 적용하는 방법은 유지.
- dataChannel 통신이 있을 경우, 내 데이터와 상대 데이터가 같은지 크로스 체크 할 것.
- 크로스 체크 결과가 다를 경우, 상대방 방나감 처리 할 것

## 공통 수정사항
- TODO: 모든 alert 안내문구를 공통변수로 변경해야함
  - 안내문구는 브라우저 코드에 노출되기 때문에, 서버에서 내려주고, store에 저장 할 것
- firefox에서 localStorage, sessionStorage 삭제됨
- 각기 다른 브라우저 6개 이상 켜고 테스트 필요

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
- choiceCard 단계에서 공통 sessionStorage key - ex. gameState, gameName, roomName - 검증 피룡
- indian pocker 통합 테스트(integration testing) 중
- FIXME: 랜선 PC와 wifi mobile에서 webRTC 연결 안됨
- 랜선사용자와 모바일LTE 사용자간 연결을 위해 TURN 실서버 반드시 구축해야됨
- coturn 여러 대 구성 예제나 로드밸런서 설정 예제(Nginx/HAProxy) 확인 필요
- TODO: 
- 나의 keypair 가 생기기 전에 roomName, gameState sessionStorage key 를 어떻게 해시문으로 바꾸지?
  - keypair 뺄까?... 안돼, keypair가 있어야 접속할 때 마다 key가 바뀌어!!
