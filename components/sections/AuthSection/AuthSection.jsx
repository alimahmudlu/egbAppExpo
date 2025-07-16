import {View, Text} from 'react-native';
import styles from "./authSection.styles"
import Logo from "@/assets/images/Group.svg";
import {useTranslation} from "react-i18next";

export default function SgSectionAuth() {
    const {t} = useTranslation();

    return (
        <View style={styles.container}>
            <Logo style={styles.logo} width={60} height={80}/>
            <Text style={styles.title}>{t('login')}</Text>
            <Text style={styles.description}>
                {t('login__description')}
            </Text>
        </View>
    );
};
