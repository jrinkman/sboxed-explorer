export default (pkgType: number): string => {
  switch (pkgType) {
    default: return 'Unknown Type';
    case 1: return 'Map';
    case 2: return 'Gamemode';
  }
};
