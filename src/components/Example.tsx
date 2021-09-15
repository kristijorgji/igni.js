import React from "react";

interface Props {
  message: string;
}

export default function Example(p: Props): React.ReactElement<Props> {
  return <div>{p.message}</div>;
}
