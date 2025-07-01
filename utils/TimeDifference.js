import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment'

const SgUtilsTimeDifference = ({ startTime }) => {
    const [diff, setDiff] = useState('--:--:--');

    useEffect(() => {
        if (startTime) {
            const interval = setInterval(() => {
//                const momentNow = moment().utc();
//                const now = new Date(momentNow);
//                const start = new Date(startTime);
//                let diffMs = Math.max(0, now - start);
//
//                console.log(now, start)
//
//                const hours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, '0');
//                diffMs %= 1000 * 60 * 60;
//
//                const minutes = String(Math.floor(diffMs / (1000 * 60))).padStart(2, '0');
//                diffMs %= 1000 * 60;
//
//                const seconds = String(Math.floor(diffMs / 1000)).padStart(2, '0');
//
//                setDiff(`${hours}:${minutes}:${seconds}`);

                    const now = moment();
                      // Use end or now, depending on your use case
                      const diff = moment.duration(now.diff(startTime));
                      const hours = Math.floor(diff.asHours());
                      const minutes = diff.minutes();
                      const seconds = diff.seconds();

                setDiff(`${hours}:${minutes}:${seconds}`);
            }, 1000);

            return () => clearInterval(interval);
        }

    }, [startTime]);

    return (
        <Text>{diff}</Text>
    );
};

export default SgUtilsTimeDifference;