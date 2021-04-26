export default (mapType: number) => {
  switch (mapType) {
    default: return 'Unknown Type';
    case 1: return 'Map';
    case 2: return 'Gamemode';
  }
};
