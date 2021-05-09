import React from 'react';
import styled from 'styled-components';
import Heading from 'components/Heading';

interface ChangelogItem {
  version: string;
  subtitle: string;
  changes: string[];
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 40px;
  padding-right: 40px;
`;

const Section = styled.section`
  display: flex;
  padding-bottom: 24px;
  flex-direction: column;
`;

const List = styled.ul`
`;

const ListItem = styled.li`
  color: white;
  font-weight: 500;
  max-width: 600px;
`;

const changelog: ChangelogItem[] = [
  {
    version: 'v1.3.5',
    subtitle: 'Asset information page fixes',
    changes: [
      'Newline characters are now parsed & displayed correctly on asset information pages',
    ],
  },
  {
    version: 'v1.3.4',
    subtitle: 'Open-source',
    changes: [
      'The project is now open-source. Yay!',
      'Added a \'View on GitHub\' button to the home page',
      'Site navbar is now in it\'s own component',
    ],
  },
  {
    version: 'v1.3.3',
    subtitle: 'Slightly tweaked homescreen',
    changes: [
      'Added my profile image to the home page credit',
      'Changed credit font size',
      'Changed home page buttons positioning & opacity',
      'Switched \'open s&box\' button to \'go to menu\' button',
    ],
  },
  {
    version: 'v1.3.2',
    subtitle: 'Update to official logo',
    changes: [
      'Changed home page logo to official one',
      'Can now also sort assets by creator',
      'Button groups / sort by selectors now have titles for more clarity',
    ],
  },
  {
    version: 'v1.3.1',
    subtitle: 'Asset card improvements',
    changes: [
      'Hovering over asset cards now expand to show the full asset description',
    ],
  },
  {
    version: 'v1.3',
    subtitle: 'Home & sorting update',
    changes: [
      'Added home page & moved menu endpoint to /menu',
      'Alphabetical & recent sorting',
      'Added an \'open s&box\' button to the asset info & home pages. Hopefully, this will become a \'open IN s&box\' button when gamemodes / maps can be opened on startup using the Steam browser protocol.',
      'Updated icons to match the official one',
      'Renamed \'gamemodes\' to \'modes\' in the navbar',
      'Better implementation of reusable components',
      'Fixed capitalization of s&box',
    ],
  },
  {
    version: 'v1.2.2',
    subtitle: 'Changelog link',
    changes: [
      'Users are now navigated to the changelog page when clicking on the navbar version',
    ],
  },
  {
    version: 'v1.2.1',
    subtitle: 'AssetInfo crash hotfix',
    changes: [
      'Fixed crash with AssetInfo not loading correctly',
    ],
  },
  {
    version: 'v1.2',
    subtitle: 'Changelog & usability update',
    changes: [
      'Added this changelog you\'re reading right now!',
      'Fixed asset map / gamemode information page padding',
      'Made the \'go back\' button more reliable',
      'Improved the way axios promise return types are handled',
      'In-progress promises on the /asset route are now cancelled upon navigation',
    ],
  },
  {
    version: 'v1.1',
    subtitle: 'Maps & navbar update',
    changes: [
      'Refactored proxy to be more efficient',
      'Refactored frontend to properly use the s&box APIs',
      'Can now view maps & click on them to see more info',
      'Maps & gamemodes data are now treated as generic \'assets\'',
      'Added navbar links & changed navigation slugs',
    ],
  },
  {
    version: 'v1.0',
    subtitle: 'The first release of this app',
    changes: [
      's&box main menu recreated',
      'Showing new & popular gamemodes',
      'Can click on gamemodes to see more info',
    ],
  },
];

function Changelog() {
  return (
    <Root>
      {changelog.map((log) => (
        <Section key={log.version}>
          <Heading title={log.version} subtitle={log.subtitle} />
          <List>
            {log.changes.map((change) => <ListItem key={change}>{change}</ListItem>)}
          </List>
        </Section>
      ))}
    </Root>
  );
}

export default Changelog;
