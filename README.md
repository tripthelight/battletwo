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


## 필요 서버
1. static 파일 웹서버
2. NginX 서버
3. signaling 서버
4. TRUN 서버
5. jwt api 서버
6. redis 서버


## 진행상황
- choiceCard 단계에서 공통 sessionStorage key - ex. gameState, gameName, roomName - 검증 피룡
- indian pocker 통합 테스트(integration testing) 중
- FIXME: 랜선 PC와 wifi mobile에서 webRTC 연결 안됨
- 랜선사용자와 모바일LTE 사용자간 연결을 위해 TURN 실서버 반드시 구축해야됨
- coturn 여러 대 구성 예제나 로드밸런서 설정 예제(Nginx/HAProxy) 확인 필요
- TODO: 
- 나의 keypair 가 생기기 전에 roomName, gameState sessionStorage key 를 어떻게 해시문으로 바꾸지?
  - keypair 뺄까?... 안돼, keypair가 있어야 접속할 때 마다 key가 바뀌어!!
- FIXME:
  - 모바일은 TURN 서버 구축 필요
  - 시놀로지 NAS로 구축 해볼 예정
- TODO: 
  - keypair 도 JWT에 저장해서,
  - 클라이언트 메모리에 저장시키고,
  - 새로고침 할 때 마다 클라이언트 메모리에 저장 


## 새로고침 전략 - GPT - 새로고침 시 5초 대기
1. Peer A, B → WebRTC 연결 요청
2. WebRTC 서버 → Redis ROOMS_MAP에 { gameName, roomName, [socketA, socketB] } 저장
3. 브라우저 → "/api/login" 요청 (gameName, roomName 포함)
4. JWT 발급 (gameName, roomName 포함)
5. 브라우저 새로고침
6. Redis ROOMS_MAP의 socketA를 "Grace 상태"로 잠시 유지 (5초 타이머)
7. 브라우저 새로고침 후 즉시 "/api/user-info" 요청
8. JWT에 담긴 gameName, roomName으로 Redis ROOMS_MAP 조회
9. 상대 peer socketId를 찾고, PUB/SUB을 통해 해당 워커에 재연결 명령 전달
- 5초 이내라면 기존 socketA와 재연결 → 성공, 타이머 만료 시 기존 socketA 제거 후 새로 매칭 대기.

## 새로고침 전략 - 내머리 - 새로고침 시 무조건 socket 관련 데이터 제거
1. 두 peer가 브라우저에 접속 시, webRTC 연결 요청
2. webRTC 연결 중 생성된 roomName을 브라우저에 전달
3. webRTC 연결 완료 
4. 브라우저에서 webRTC 연결 중 생성된 roomName과 gameName을 담아서 "/api/login" 요청
5. roomName과 gameName을 담아서 jwt 생성
6. 브라우저에 httpOnly 쿠키 전달
7. 브라우저 새로고침 - 이전 socket은 사라지고 REDIS ROOMS_MAP에 있던 socketId와 워커 메모리 LOCAL_SOCKETS에 있던 socket도 삭제됨
8. 브라우저 새로고침 된 후 즉시 "/api/user-info" 요청
9. httpOnly 쿠키에 gameName, roomName이 있으면, REDIS 저장소 ROOMS_MAP에 있는 gameName:roomName에 있는 상대 peer socketId을 조회
10. 조회된 상대 peer socketId를 REDIS PUB, SUB로 server_webrtc.js로 전달
11. 3개의 WebRTC server 워커 중 socketId와 일치하는 socket이 있으면 재연결 시도
