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
`;

const changelog: ChangelogItem[] = [
  {
    version: 'v1.3',
    subtitle: 'Sorting Update',
    changes: [
      'Users can now sort maps & gamemodes alphabetically, or by most recent',
      'Better implementation of reusable components',
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
      'S&box main menu recreated',
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
