'use client'

import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/hook';
import { RootState } from '@/lib/store';
import { removeUser } from '@/lib/features/users/userSlice';
import { useRouter } from 'next/navigation';
import { logOut } from '@/api/user';
import toast from 'react-hot-toast';
import { useConfirmationDialog } from './customHooks/useConfirmationDialog';
import NavBar from '@/components/user/Navbar';
import BannerSlider from '@/components/user/Banner';
import LeaderBoard from '@/components/user/LeaderBoard';
import Marqueue from '@/components/user/Marqueue';

const HomePage = ()=> {
  return (
    <>
    <NavBar/>
    <Marqueue/>
    <BannerSlider/>
    <LeaderBoard/>
    </>
  )
}

export default HomePage;
