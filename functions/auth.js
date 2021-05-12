const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const passport = require('passport');
const SteamStrategy = require('passport-steam');

// Determine the correct realm and returnURL
const { FUNCTIONS_EMULATOR: FUNC_EMU } = process.env;
const realm = FUNC_EMU ? 'http://localhost:5001' : 'https://us-central1-sbox-api-explorer.cloudfunctions.net';
const realmCallback = `${realm}${FUNC_EMU && '/sbox-api-explorer/us-central1'}/auth/callback`;
const returnURL = FUNC_EMU ? 'http://localhost:3000' : 'https://sbox-api-explorer.web.app';

async function getUser(uid) {
  try {
    return await admin.auth().getUser(uid);
  } catch (error) { return null; }
}

// Setup passport with the steam provider
passport.use(
  new SteamStrategy({
    returnURL: realmCallback,
    realm,
    apiKey: functions.config().steam.key,
  },
  async (id, profile, done) => {
    const { _json: user } = profile;
    console.log('Steam AUTH', user.steamid, user.personaname);
    try {
      // See if the user exists
      const existingUser = await getUser(user.steamid);

      if (!existingUser) {
        // If it doesn't, create it
        console.log(`Creating user '${user.personaname}' (${user.steamid})`);
        await admin.auth().createUser({
          uid: user.steamid,
          displayName: user.personaname,
          photoURL: user.avatarfull,
        });
      } else {
        const differentName = existingUser.displayName !== user.personaname;
        const differentAvatar = existingUser.photoURL !== user.avatarfull;

        // If it does, and profile data has changed, update it
        if (differentName || differentAvatar) {
          console.log(`[${differentName}|${differentAvatar}] Updating user '${user.personaname}' (${user.steamid})...`);
          await admin.auth().updateUser(user.steamid, {
            displayName: user.personaname,
            photoURL: user.avatarfull,
          });
        }
      }

      // Create a token for the user
      console.log('Generating user token...');
      const token = await admin.auth().createCustomToken(user.steamid);

      return done(token);
    } catch (error) {
      console.error(error);
    }
    return done(null);
  }),
);

// Create a new auth router
const router = express.Router();

router.use(passport.initialize());
router.get('/', passport.authenticate('steam'));
router.get('/callback',
  (req, res, next) => {
    passport.authenticate('steam', {}, (token) => {
      if (!token) {
        res.redirect(`${returnURL}/auth?failed=true`);
      }

      // Redirect the user to authenticate with firebase token
      res.redirect(`${returnURL}/auth?token=${token}`);
    })(req, res, next);
  });

module.exports = router;
