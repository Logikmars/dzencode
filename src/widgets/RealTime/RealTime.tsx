'use client';

import React, { useEffect, useState } from 'react';
import './RealTime.scss';
import Text from '@/shared/Text/Text';
import { useTime, getFormattedDate, getFormattedTime, getDayName } from '@/shared/hooks/useTime';
import { Clock9, Monitor } from 'lucide-react';
import { socket } from '@/shared/socket/socket';
import { useAppSelector } from '@/store/hooks';
import { languageToLocale } from '@/i18n/helpers';

const RealTime: React.FC = () => {
  const time = useTime();
  const language = useAppSelector((state) => state.language.current);
  const locale = languageToLocale(language);
  const [activeSessions, setActiveSessions] = useState(0);

  useEffect(() => {
    const handleActiveSessionsUpdate = (sessions: number) => {
      setActiveSessions(sessions);
    };

    socket.on('active-sessions:update', handleActiveSessionsUpdate);

    return () => {
      socket.off('active-sessions:update', handleActiveSessionsUpdate);
    };
  }, []);

  return (
    <div className='RealTime'>
        <Text text={getDayName(time, locale)} fs_14/>
        <div className='RealTime_info'>
            <div className='RealTime_info_meta'>
                <Text text={getFormattedDate(time, locale)} fs_14/>
                <div className='RealTime_info_sessions'>
                    <Monitor color="#8bc34a" strokeWidth={2.5} size={14}/>
                    <Text text={String(activeSessions)} fs_14/>
                </div>
            </div>
            <div className='RealTime_info_oclock'>
                <Clock9 color="#8bc34a" strokeWidth={3} size={14}/>
                <Text text={getFormattedTime(time, locale)} fs_14/>
            </div>
        </div>
    </div>
  );
};

export default RealTime;
