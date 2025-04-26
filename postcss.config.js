import postcssDiscardComments from 'postcss-discard-comments';

import postcssImport from 'postcss-import';
import postcssCascadeLayers from '@csstools/postcss-cascade-layers';
import autoprefixer from 'autoprefixer';
import postcssSscss from 'postcss-scss';

export default {
  syntax: postcssSscss, // SCSS 구문을 처리하도록 설정
  plugins: [
    postcssImport(), // @import 구문을 처리
    postcssCascadeLayers(),
    autoprefixer(),
    postcssDiscardComments({
      removeAll: true,
    }),
    [
      'postcss-preset-env',
      {
        browsers: '> 5% in KR, defaults, not IE < 11',
        // CSS Grid 활성화 [false, 'autoplace', 'no-autoplace']
        autoprefixer: { grid: 'autoplace' },
      },
    ],
  ],
};
