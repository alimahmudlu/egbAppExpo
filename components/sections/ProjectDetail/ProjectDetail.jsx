import React from "react";
import { Text, View } from "react-native";
import styles from "@/components/sections/ProjectDetail/ProjectDetail.styles";
import COLORS from "@/constants/colors";

export default function SgSectionProjectDetail({title, icon ,description,children = null}) {

  const Icon = icon ? icon : null;

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View>
          <View style={styles.header}>
            {title && <Text style={styles.title}>{title}</Text>}
            {icon && <Icon width={20} height={20} />}
          </View>
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>

        <View style={styles.children}>{children}</View>
      </View>
    </View>
  );
}
