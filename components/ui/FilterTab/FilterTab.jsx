import { View, Text, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import styles from '@/components/ui/FilterTab/FilterTab.styles';

export default function SgFilterTab({ tabs = [], defaultTabId, onTabChange, tabContent = [] }) {
  const [activeTabId, setActiveTabId] = useState(defaultTabId);

  useEffect(() => {
    setActiveTabId(defaultTabId);
  }, [defaultTabId, tabs]);

  const handleTabPress = (id) => {
    setActiveTabId(id);
    if (onTabChange) {
      onTabChange(id);
    }
  };

  return (
    <View style={{gap: 12}}>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => {
          const isActive = activeTabId === tab?.id;

          return (
              <Pressable
                  key={index}
                  onPress={() => handleTabPress(tab?.id || index)}
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

      <View style={{gap: 12}}>
          {tabContent?.find(el => el.id === activeTabId)?.element || null}
      </View>
    </View>
  );
}
