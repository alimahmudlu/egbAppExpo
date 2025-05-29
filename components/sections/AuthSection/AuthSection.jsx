import { View, Text, Image } from 'react-native';
import styles from "./authSection.styles"
import Logo from "../../../assets/images/Group.svg";

export default function SgSectionAuth () {
  return (
    <View style={styles.container}>
        <Logo style={styles.logo} width={60} height={80} />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.description}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
        </Text>
    </View>
  );
};
