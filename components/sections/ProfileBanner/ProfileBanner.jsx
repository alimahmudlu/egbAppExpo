import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import styles from '@/components/sections/ProfileBanner/ProfileBanner.styles';
import Vector from '@/assets/images/vector2.svg';
import LogoutIcon from '@/assets/images/logout.svg';
import {useTranslation} from "react-i18next";
import {useRouter} from "expo-router";
import COLORS from '@/constants/colors';

export default function SgSectionProfileBanner({image, name, role, position, onLogout}) {
    const {t} = useTranslation();
    const router = useRouter();

    const getInitials = (fullName) => {
        if (!fullName) return '';
        return fullName.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
    };

    return (
        <View style={styles.card}>
            <Vector width={'100%'} resizeMode="stretch" style={styles.vectorBackground}/>

            <View style={styles.topRow}>
                {image ? (
                    <Image
                        source={image}
                        style={styles.avatar}
                        resizeMode="cover"
                    />
                ) : (
                    <View style={styles.placeholderAvatar}>
                        <Text style={styles.avatarText}>
                            {getInitials(name)}
                        </Text>
                    </View>
                )}
                <View style={styles.userInfo}>
                    <Text style={styles.name} numberOfLines={1}>{name}</Text>
                    <View style={styles.roleContainer}>
                        <View style={styles.roleBadge}>
                            <Text style={styles.role}>{role}</Text>
                        </View>
                        {position?.name && (
                            <Pressable
                                onPress={() => {
                                    router.navigate(`/pages/responsibilities/${position?.id || ''}`)
                                }}
                            >
                                <Text style={styles.positionText}>{position?.name}</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.bottomRow}>
                <TouchableOpacity onPress={onLogout} style={styles.logoutButton} activeOpacity={0.7}>
                    <LogoutIcon width={18} height={18} color={COLORS.white} fill={COLORS.white} />
                    <Text style={styles.logoutText}>
                        {t('logout')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};