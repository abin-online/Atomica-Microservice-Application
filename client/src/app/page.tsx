'use client'

import React, { useState, useEffect } from 'react';

import BannerSlider from '@/components/user/Banner';
import LeaderBoard from '@/components/user/LeaderBoard';
import Marqueue from '@/components/user/Marqueue';

const HomePage = ()=> {
  return (
    <>
    <Marqueue/>
    <BannerSlider/>
    <LeaderBoard/>
    </>
  )
}

export default HomePage;
