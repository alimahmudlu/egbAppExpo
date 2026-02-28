import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import styles from '@/components/sections/ProfileBanner/ProfileBanner.styles';
import Vector from '@/assets/images/vector2.svg';
import {useTranslation} from "react-i18next";
import {useRouter} from "expo-router";

export default function SgSectionProfileBanner({image, name, role, position, onLogout}) {
    const {t} = useTranslation();
    const router = useRouter();
    return (
        <View style={styles.card}>
            <Vector width={'100%'} resizeMode="stretch" style={styles.vectorBackground}/>
            {/*<View style={styles.topRow}>*/}
            {/*    /!*{image ? (*!/*/}
            {/*    /!*    <Image*!/*/}
            {/*    /!*        source={image}*!/*/}
            {/*    /!*        style={styles.avatar}*!/*/}
            {/*    /!*        resizeMode="cover"*!/*/}
            {/*    /!*    />*!/*/}
            {/*    /!*) : (*!/*/}
            {/*    /!*    <View*!/*/}
            {/*    /!*        style={styles.placeholderAvatar}*!/*/}
            {/*    /!*    >*!/*/}
            {/*    /!*        <Text*!/*/}
            {/*    /!*            style={styles.avatarText}*!/*/}
            {/*    /!*        >*!/*/}
            {/*    /!*            {name?.split(' ').splice(0, 2).map((n) => n[0]).join('')}*!/*/}
            {/*    /!*        </Text>*!/*/}
            {/*    /!*    </View>*!/*/}
            {/*    /!*)}*!/*/}
            {/*    <View style={styles.rightColumn}>*/}
            {/*        */}
            {/*    </View>*/}
            {/*</View>*/}
            <View style={styles.bottomRow}>
                <Text style={styles.name}>{name}</Text>
                <View style={{
                    flexDirection: 'row',
                    gap: 8
                }}>
                    <Text style={styles.role}>{role}</Text>
                    <Text style={styles.role}>/</Text>
                    <Pressable
                        onPress={() => {
                            router.navigate(`/pages/responsibilities/${position?.id || ''}`)
                        }}
                    >
                        <Text style={styles.role}>{position?.name}</Text>
                    </Pressable>
                </View>

            </View>
            <View style={styles.right}>
                <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
                    <Text style={styles.logoutText}>
                        {t('logout')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};