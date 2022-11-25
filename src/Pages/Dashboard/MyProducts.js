import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import Products from './Products';

const MyProducts = () => {
  const { user } = useContext(AuthContext)
  const { data: products = [], loading, refetch } = useQuery({
    queryKey: ['products', user],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/products?email=${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem('joldikino-token')}`
        }
      });
      const data = await res.json();
      return data;
    }
  });

  console.log(products);

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">My Products</h2>
      </div>
      {
        products.length !== 0 ?
          <div className="mb-8">
            {
              products.map(product => <Products
                key={product._id}
                product={product}
              ></Products>)
            }
          </div>
          :
          <div className="min-h-screen flex justify-center">
            <h2 className="text-4xl font-semibold">You haven't added any products yet.</h2>
          </div>
      }
    </div>
  );
};

export default MyProducts;