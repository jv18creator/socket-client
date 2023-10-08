import { memo } from 'react';

interface TParagraph {
  info: string;
  className?: string;
}

const Paragraph = (props: TParagraph) => {
  return <p className={props.className}>{props.info}</p>;
};

export default memo(Paragraph);
