import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Spinner from '../../../../Components/Spinner';
import ActionCamera from './ActionCamera';
import BookActionCamera from './BookActionCamera';

const Action = () => {
  const [actionCamera, setActionCamera] = useState(null);
  const { data: cameras = [], isLoading, refetch } = useQuery({
    queryKey: ['products/camera'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/products/camera?category=action`);
      const data = await res.json();
      return data;
    }
  });

  if (isLoading) {
    return <Spinner></Spinner>
  }

  return (
    <>
      <div className='text-center'>
        <h1 className="text-2xl font-bold uppercase">Action Camera</h1>
      </div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full md:px-24 lg:px-0 lg:py-12">
        <div className="grid gap-8 lg:grid-cols-3 sm:max-w-sm sm:mx-auto lg:max-w-full">
          {
            cameras?.map(camera => <ActionCamera
              key={camera._id}
              camera={camera}
              setActionCamera={setActionCamera}
              refetch={refetch}
            ></ActionCamera>)
          }
        </div>
        {
          actionCamera &&
          <BookActionCamera
            camera={actionCamera}
            setActionCamera={setActionCamera}
            refetch={refetch}
          ></BookActionCamera>
        }
      </div>
    </>
  );
};

export default Action;