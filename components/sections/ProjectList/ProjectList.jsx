import { View, Text, Image } from 'react-native';
import styles from './ProjectList.styles';
import RightIcon from '@/assets/images/chevron-right.svg';

export default function SgSectionProjectList({ title, staffImages = [] }) {
  const visibleImages = staffImages.slice(0, 5);
  const hiddenCount = staffImages.length - visibleImages.length;

  return (
    <View style={styles.card}>
      <View style={styles.rowWrapper}>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.imageRow}>
            {visibleImages.map((src, i) => (
            <View
                key={i}
                style={[styles.imageWrapper, { left: i * 11, zIndex: i }]}
            >
                <Image source={{ uri: src }} style={styles.staffImage} />
            </View>
            ))}
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
          </View>
        </View>

        <View style={styles.iconWrapper}>
          <RightIcon width={20} height={20} />
        </View>
      </View>
    </View>
  );
}
