import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import moment from 'moment';

const SgUtilsTimeDifference = ({ startTime }) => {
    const [diff, setDiff] = useState('--:--:--');

    useEffect(() => {
        if (startTime) {
            const interval = setInterval(() => {
                const nowUtc = moment.utc();
                const startUtc = moment.utc(startTime);

                const duration = moment.duration(nowUtc.diff(startUtc));

                if (duration.asMilliseconds() < 0) {
                    setDiff("0:00:00");
                    return;
                }

                const hours = Math.floor(duration.asHours());
                const minutes = duration.minutes();
                const seconds = duration.seconds();

                const formatted = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

                setDiff(formatted);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [startTime]);

    return (
        <Text>{diff}</Text>
    );
};

export default SgUtilsTimeDifference;