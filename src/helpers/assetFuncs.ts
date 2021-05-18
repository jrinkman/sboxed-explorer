import { Asset } from 'components/AssetCard';

const sortFuncs: { [key: string]: (a: Asset, b: Asset) => number } = {
  recent: (a: Asset, b: Asset) => b.updated - a.updated,
  alphabetical: (a: Asset, b: Asset) => {
    const aVal = a.title.toLowerCase();
    const bVal = b.title.toLowerCase();
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
  },
  creator: (a: Asset, b: Asset) => {
    const aVal = a.org.title.toLowerCase();
    const bVal = b.org.title.toLowerCase();
    if (aVal < bVal) return -1;
    if (aVal > bVal) return 1;
    return 0;
  },
};

export default sortFuncs;
