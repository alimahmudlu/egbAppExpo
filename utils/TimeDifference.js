import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const SgUtilsTimeDifference = ({ startTime }) => {
    const [diff, setDiff] = useState('--:--:--');

    useEffect(() => {
        if (startTime) {
            const interval = setInterval(() => {
                const now = new Date();
                const start = new Date(startTime);
                let diffMs = Math.max(0, now - start);

                const hours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, '0');
                diffMs %= 1000 * 60 * 60;

                const minutes = String(Math.floor(diffMs / (1000 * 60))).padStart(2, '0');
                diffMs %= 1000 * 60;

                const seconds = String(Math.floor(diffMs / 1000)).padStart(2, '0');

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