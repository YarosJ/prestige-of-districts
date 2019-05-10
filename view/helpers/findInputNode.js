const findInputNode = (target) => {
  let input = null;

  target.childNodes.forEach((n) => {
    if (!n || input) return null;
    if (n.nodeName === 'INPUT') {
      input = n;
      return null;
    }
    if (n.childNodes) input = findInputNode(n);
    return null;
  });

  return input;
};

export default findInputNode;
