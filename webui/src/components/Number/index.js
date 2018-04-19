import React from 'react';

const Number = (props) => {
  const {
    height = '40px', lineHeight = '40px', width = '40px',
    borderColor = '#FFFFFF', fontSize = '16px', number,
    backgroundColor = '#000000', color = '#FFFFFF',
  } = props;

  const style = {
    borderRadius: '50%',
    textAlign: 'center',
    border: `1px solid ${borderColor}`,
    fontWeigth: 'bold',
    height,
    lineHeight,
    width,
    fontSize,
    backgroundColor,
    color,
  };

  return (
    <div style={style}>{number}</div>
  );
};

export default Number;
