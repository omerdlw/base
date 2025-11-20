'use client';

import Container from '../container';

export default function SettingsModal({ header, close, data }) {
  return (
    <Container header={header} close={close}>
      <div className='p-4 text-center text-sm opacity-50'>
        Settings are currently managed automatically.
      </div>
    </Container>
  );
}
