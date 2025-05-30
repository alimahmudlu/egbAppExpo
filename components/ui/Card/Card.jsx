import { Text, View } from "react-native";
import styles from "./Card.styles";
import COLORS from "@/constants/colors";

export default function SgCard({ title, icon, time, children = null, bgColor=COLORS.gray_100 }) {
  const Icon = icon ? icon : null;

  let displayTime;
  if (time === undefined) {
    displayTime = null;
  } else if (time === '') {
    displayTime = '--:--:--';
  } else {
    displayTime = time;
  }

  const showHeader = title || icon;

  return (
    <View style={[styles.card, { backgroundColor: bgColor }]}>
      <View style={styles.content}>
        {showHeader && (
          <View style={styles.header}>
            {title && <Text style={styles.title}>{title}</Text>}
            {icon && <Icon width={20} height={20} />}
          </View>
        )}
        {displayTime !== null && (
          <Text style={styles.time}>{displayTime}</Text>
        )}
        <View style={styles.children}>{children}</View>
      </View>
    </View>
  );
}
