import React from 'react';
import styled from 'styled-components';

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

const Header = styled.h1`
  color: white;
  font-size: 2rem;
  margin: 0;
`;

const Subheader = styled.span`
  color: white;
  opacity: 0.6;
  font-weight: 400;
  font-size: 1rem;
`;

const List = styled.ul`
`;

const ListItem = styled.li`
  color: white;
  font-weight: 500;
`;

const changelog: ChangelogItem[] = [
  {
    version: 'v1.2',
    subtitle: 'Changelog & usability update',
    changes: [
      'Added this changelog you\'re reading right now!',
      'Fixed asset map / gamemode information page padding',
      'Made the \'go back\' button more reliable',
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
          <div className="header">
            <Header>{log.version}</Header>
            <Subheader>{log.subtitle}</Subheader>
          </div>
          <List>
            {log.changes.map((change) => <ListItem key={change}>{change}</ListItem>)}
          </List>
        </Section>
      ))}
    </Root>
  );
}

export default Changelog;
