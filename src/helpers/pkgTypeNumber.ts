export default (pkgType: string): number => {
  switch (pkgType.toLowerCase()) {
    default: return -1;
    case 'map': return 1;
    case 'gamemode': return 2;
  }
};
