import { Asset } from 'components/AssetCard';

export default (text?: string) => ((asset: Asset) => {
  if (!text || text === '') return true;
  return asset.title.toLowerCase().includes(text.toLowerCase())
    || asset.summary.toLowerCase().includes(text.toLowerCase())
    || asset.org.title.toLowerCase().includes(text.toLowerCase());
});
