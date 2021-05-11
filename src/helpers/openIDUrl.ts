import runtimeContants from './runtimeConstants';

export default (): string => 'https://steamcommunity.com/openid/login'
  + '?openid.ns=http://specs.openid.net/auth/2.0'
  + '&openid.mode=checkid_setup'
  + '&openid.identity=http://specs.openid.net/auth/2.0/identifier_select'
  + '&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select'
  + `&openid.return_to=${runtimeContants.isLocal ? 'http://localhost:3000/auth' : 'https://sbox-api-explorer.web.app/auth'}`
  + `&openid.realm=${runtimeContants.isLocal ? 'http://localhost:3000' : 'https://sbox-api-explorer.web.app'}`;
