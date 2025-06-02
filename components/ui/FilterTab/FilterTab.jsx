import { View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '@/components/ui/FilterTab/FilterTab.styles';

export default function SgFilterTab({ tabs = [], defaultTabIndex = 0, onTabChange }) {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultTabIndex);

  useEffect(() => {
    setActiveTabIndex(defaultTabIndex);
  }, [defaultTabIndex, tabs]);

  const handleTabPress = (index) => {
    setActiveTabIndex(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab, index) => {
        const isActive = activeTabIndex === index;

        return (
          <Pressable
            key={index}
            onPress={() => handleTabPress(index)}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab.label}
            </Text>

            {tab.count > 0 && (
              <View style={styles.badgeWrapper}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{tab.count}</Text>
                </View>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}
