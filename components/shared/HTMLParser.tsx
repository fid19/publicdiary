import React from "react";
import parse from "html-react-parser";

const HTMLParser = ({ children }: { children: React.ReactNode }) => {
  return parse(`${children}`);
};

export default HTMLParser;
