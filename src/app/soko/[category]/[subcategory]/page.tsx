'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import SokoCategoryView from '../../../../components/SokoCategoryView';

export default function SokoSubcategoryRoute() {
  const params = useParams();

  const categoryParam = (params?.category as string) || 'electronics_phones';
  const subcategoryParam = (params?.subcategory as string) || undefined;

  return (
    <SokoCategoryView 
      categoryParam={categoryParam} 
      subcategoryParam={subcategoryParam} 
    />
  );
}
