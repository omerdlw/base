'use client';
import Prism from '@/components/cdn/prism';
import Template from './(views)/template';

export default function NotFound() {
  return (
    <Template>
      <div className='center relative h-screen w-screen'>
        <Prism
          animationType='rotate'
          colorFrequency={1}
          baseWidth={5.8}
          timeScale={0.5}
          noise={0.15}
          height={5.2}
          hueShift={0}
          scale={2.8}
          glow={0.7}
        />
        <div className='absolute top-2/4 left-2/4 flex -translate-x-2/4 -translate-y-2/4 flex-col items-center space-y-3'>
          <h1 className='text-3xl font-bold opacity-50'>PAGE NOT FOUND</h1>
          <a
            href='/placeholder'
            className='bg-default/5 rounded-primary px-4 py-2 text-sm backdrop-blur-lg'
          >
            Go home page
          </a>
        </div>
      </div>
    </Template>
  );
}
