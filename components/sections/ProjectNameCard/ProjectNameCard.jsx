import styles from "@/components/sections/ProjectNameCard/ProjectNameCard.styles";
import { Text, View } from "react-native";

export default function SgSectionProjectNameCard({title, icon ,description,children = null}) {

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
