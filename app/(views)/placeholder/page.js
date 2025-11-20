'use client';

import { useEffect } from 'react';
import Template from '@/app/(views)/template';
import { DynamicNavUpdater } from '@/modules/nav/updater';
import { useControlsContext } from '@/modules/controls/context';
import { ITEMS } from '@/modules/nav/config';
import { Button, Selectbox } from '@/ui/elements';
import { useToast } from '@/modules/toast/hooks';

export default function Placeholder() {
  const { setControls } = useControlsContext();
  const toast = useToast();
  useEffect(() => {
    setControls({
      left: (
        <>
          <Button
            onClick={() => toast.info('test')}
            icon='solar:archive-bold'
            text='Test'
            blurry
          />
        </>
      ),
      right: (
        <>
          <Selectbox
            options={[
              {
                label: 'Placeholder1',
                value: 'placeholder1',
              },
              {
                label: 'Placeholder2',
                value: 'placeholder2',
              },
              {
                label: 'Placeholder3',
                value: 'placeholder3',
              },
              {
                label: 'Placeholder4',
                value: 'placeholder4',
              },
              {
                label: 'Placeholder5',
                value: 'placeholder5',
              },
              {
                label: 'Placeholder6',
                value: 'placeholder6',
              },
              {
                label: 'Placeholder7',
                value: 'placeholder7',
              },
              {
                label: 'Placeholder8',
                value: 'placeholder8',
              },
            ]}
            icon='solar:adhesive-plaster-2-bold'
            onChange={() => {}}
            direction='top'
            text='Test'
            blurry
          />
        </>
      ),
    });

    return () => setControls({ left: null, right: null });
  }, [setControls]);

  return (
    <Template>
      <div className='center flex h-screen w-screen flex-col gap-4 bg-cover bg-center bg-no-repeat'>
        <DynamicNavUpdater config={ITEMS.placeholder} />
        <h1>Page 1</h1>
      </div>
    </Template>
  );
}
