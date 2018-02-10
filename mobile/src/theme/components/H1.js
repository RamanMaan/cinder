import variable from './../variables/platform';

export default (variables = variable) => {
  const h1Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH1,
    lineHeight: variables.lineHeightH1,
    '.center': {
      textAlign: 'center',
    },
  };

  return h1Theme;
};
