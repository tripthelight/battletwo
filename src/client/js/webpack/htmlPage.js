import HtmlWebpackPlugin from 'html-webpack-plugin';
// import PAGES from '@/client/js/webpack/pages';
import PAGES from './pages.js';

const pageMappings = {
  index: {
    template: './src/client/index.html',
    filename: 'index.html',
  },
  selectGame: {
    template: './src/client/views/selectGame.html',
    filename: 'views/selectGame.html',
  },
  taptap: {
    template: './src/client/views/game/taptap.html',
    filename: 'views/game/taptap.html',
  },
  blackAndWhite1: {
    template: './src/client/views/game/blackAndWhite1.html',
    filename: 'views/game/blackAndWhite1.html',
  },
  indianPocker: {
    template: './src/client/views/game/indianPocker.html',
    filename: 'views/game/indianPocker.html',
  },
  findTheSamePicture: {
    template: './src/client/views/game/findTheSamePicture.html',
    filename: 'views/game/findTheSamePicture.html',
  },
};

const multipleHtmlPlugins = PAGES.html
  .filter((name) => pageMappings[name]) // 존재하는 페이지만 처리
  .map(
    (name) =>
      new HtmlWebpackPlugin({
        template: pageMappings[name].template,
        filename: pageMappings[name].filename,
        chunks: [name],
      }),
  );

export default multipleHtmlPlugins;

/* paln B ::::::::::::::::::::::::::::::::::::::::::
// 공통 경로 설정
const BASE_PATH = './src/client/';
const VIEW_PATH = `${BASE_PATH}views/`;
const GAME_PATH = `${VIEW_PATH}game/`;

// 각 페이지의 템플릿 경로 자동 생성
const pageMappings = PAGES.html.reduce((acc, name) => {
  acc[name] = {
    template:
      name === 'index' ? `${BASE_PATH}index.html` :
      name === 'selectGame' ? `${VIEW_PATH}selectGame.html` :
      `${GAME_PATH}${name}.html`, // 기본적으로 게임 폴더 내 파일로 처리
    filename:
      name === 'index' ? 'index.html' :
      name === 'selectGame' ? 'views/selectGame.html' :
      `views/game/${name}.html`,
  };
  return acc;
}, {});

// HtmlWebpackPlugin을 동적으로 생성
const multipleHtmlPlugins = PAGES.html.map(
  (name) => new HtmlWebpackPlugin({
    template: pageMappings[name].template,
    filename: pageMappings[name].filename,
    chunks: [name],
  })
);

export default multipleHtmlPlugins;
*/
