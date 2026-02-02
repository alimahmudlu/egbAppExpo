import { View, Text } from 'react-native';
import styles from "./authSection.styles";
import Logo from "@/assets/images/Group.svg";
import { useTranslation } from "react-i18next";

export default function SgSectionAuth() {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Logo style={styles.logo} width={72} height={96} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{t('login')}</Text>
                <Text style={styles.description}>
                    {t('login__description')}
                </Text>
            </View>
        </View>
    );
}
