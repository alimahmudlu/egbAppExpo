import {View, Text, Image, Pressable} from 'react-native';
import styles from './ProjectListItem.styles';
import RightIcon from '@/assets/images/chevron-right.svg';
import {useRouter} from "expo-router";
import React, {useEffect} from "react";

export default function SgSectionProjectListItem({ title, staffData = [], id, href }) {
  const visibleImages = staffData.slice(0, 5);
  const hiddenCount = staffData.length - visibleImages.length;
  const router = useRouter();

  useEffect(() => {

  }, [staffData]);

  function onClick() {
    if (href) {
      router.navigate(href)
    }
  }

  return (
    <Pressable onPress={onClick} style={styles.card}>
      <View style={styles.rowWrapper}>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.imageRow}>
              {(staffData || []).length > 0 ?
                <>
                    {(visibleImages || []).map((el, i) => {
                        return (
                            <View
                                key={i}
                                style={[styles.imageWrapper, { left: i * 13, zIndex: i }]}
                            >
                                {el?.src ?
                                    <Image source={{ uri: el?.src }} style={styles.staffImage} />
                                    :
                                    <View style={styles.initialsV}>
                                        <Text style={styles.initialsT}>
                                            {el?.full_name ? el?.full_name.split(' ').splice(0, 2).map(n => n[0]).join('') : 'NA'}
                                        </Text>
                                    </View>
                                }
                            </View>
                        )
                    })}
                    {hiddenCount > 0 && (
                        <View
                            style={[
                                styles.imageWrapper,
                                {
                                    left: visibleImages.length * 11,
                                    zIndex: visibleImages.length + 1,
                                },
                            ]}
                        >
                            <View style={styles.hiddenCount}>
                                <Text style={styles.hiddenCountText}>+{hiddenCount}</Text>
                            </View>
                        </View>
                    )}
                </>
                  :
                  <Text style={{fontSize: 12, fontStyle: 'italic'}}>No staff</Text>
              }

          </View>
        </View>

        {href ?
            <View style={styles.iconWrapper}>
              <RightIcon width={20} height={20} />
            </View>
        : null}
      </View>
    </Pressable>
  );
}
