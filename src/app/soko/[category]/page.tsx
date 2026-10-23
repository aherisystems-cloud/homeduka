'use client';

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import SokoCategoryView from '../../../components/SokoCategoryView';

export default function SokoCategoryRoute() {
  const params = useParams();
  const searchParams = useSearchParams();

  const categoryParam = (params?.category as string) || 'electronics_phones';
  const subcategoryParam = searchParams.get('sub') || undefined;

  return (
    <SokoCategoryView 
      categoryParam={categoryParam} 
      subcategoryParam={subcategoryParam} 
    />
  );
}
