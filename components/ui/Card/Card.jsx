import React from "react";
import { Text, View } from "react-native";
import styles from "./Card.styles";
import COLORS from "../../../constants/colors";

export default function SgCard({
  title,
  contentTitle,
  contentDescription,
  icon,
  time,
  children = null,
  bgColor,      
}) {
  const Icon = icon ? icon : null;

  const getBackgroundColor = (type) => {
    switch (type) {
      case "gray":
        return COLORS.gray_100;
      case "green":
        return COLORS.success_100;
      case "yellow":
        return COLORS.warning_100;
      case "danger":
        return COLORS.error_100;
      default:
        return COLORS.white;
    }
  };

  const resolvedBgColor = getBackgroundColor(bgColor);

  let displayTime;
  if (time === undefined) {
    displayTime = null;
  } else if (time === "") {
    displayTime = "--:--:--";
  } else {
    displayTime = time;
  }

  const showHeader = title || icon;

  const dynamicStyle = {
    backgroundColor: resolvedBgColor,
  };

  return (
    <View style={[styles.card, dynamicStyle]}>
      <View style={[
          styles.content,
          !bgColor && { padding: 0 }
        ]}>
        {showHeader && (
          <View style={styles.header}>
            {title && <Text style={styles.title}>{title}</Text>}
            {icon && <Icon width={20} height={20} />}
          </View>
        )}

        {displayTime !== null && (
          <Text style={styles.time}>{displayTime}</Text>
        )}

        <View>
          {contentTitle && (
            <Text style={styles.contentTitle}>{contentTitle}</Text>
          )}
          {contentDescription && (
            <Text style={styles.contentDesc}>{contentDescription}</Text>
          )}
        </View>

        <View style={styles.children}>{children}</View>
      </View>
    </View>
  );
}
