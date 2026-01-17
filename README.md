## NPM INSTALL
- client :  
  - npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-env sass sass-loader css-loader style-loader webpack-dev-server html-webpack-plugin html-loader mini-css-extract-plugin clean-webpack-plugin copy-webpack-plugin image-webpack-loader file-loader url-loader postcss-discard-comments css-minimizer-webpack-plugin babel-plugin-module-resolver autoprefixer
  - npm install dotenv --save-dev  
  - npm install lit --save-dev  
  - npm install postcss-import --save-dev
  - npm i -D imagemin-pngquant
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


## 필요 서버
1. static 파일 웹서버
2. NginX 서버
3. signaling 서버
4. TRUN 서버
5. jwt api 서버
6. redis 서버


## 진행상황
- FIXME: 랜선 PC와 wifi mobile에서 webRTC 연결 안됨
- 랜선사용자와 모바일LTE 사용자간 연결을 위해 TURN 실서버 반드시 구축해야됨
- coturn 여러 대 구성 예제나 로드밸런서 설정 예제(Nginx/HAProxy) 확인 필요
- FIXME:
  - 모바일은 TURN 서버 구축 필요
  - 시놀로지 NAS로 구축 해볼 예정
- TODO: 
  - 기본배팅 완료 후 enterPlayingResult.js에서 실행되는 betUser가 true인 peer의 createBattleCardNum.js 단계에서 에러남
- TODO: 
  - gameState basicBet 새로고침 시 sessionStorage key value 검증 수정 중
  - requestCompairBasicBet.js 의 검증 로직을 코드 해석이 어렵도록 복잡도를 올려야 함
- CARD_NUMS를 서로 암호화 시켜서 주고 받으려 하다가, 브라우저에 SECRET_KEY 공개 문제로 CARD_NUMS를 서버에서 내려주는 방식으로 바꾸다가 새로고침 수정에 진입한 듯...
  - 내려주는 CARD_NUMS와 sessionStorage의 key, value는 두 PEER가 서로 달라야 함
- "impolite"와 "polite" 일 때, 각각 다른 고정 keypair를 적용시켰어..
  - 이제, cardNum을 keypair로 암호화 할 때, 상대 keypair로 하면 돼!!
- 숫자를 문자로 암호화한 PUBLIC_CARD_NUMS가 생겼으니.. 코드에 숫자를 직접 노출시키지 않고, 카드 SVG를 javascript로 그리는 방식으로 가야하는데...
