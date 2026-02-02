import {
    View,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    StatusBar,
} from "react-native";
import styles from "@/assets/styles/auth/auth.styles";
import SgSectionAuth from "@/components/sections/AuthSection/AuthSection";
import SgForm from "@/components/ui/Form/Form";
import SgInput from "@/components/ui/Input/Input";
import SgButton from "@/components/ui/Button/Button";
import { useState } from "react";
import COLORS from "@/constants/colors";
import {useAuth} from "@/hooks/useAuth";
import SgPopup from "@/components/ui/Modal/Modal";
import InfoCircleModalIcon from "@/assets/images/infoCircleModal.svg";
import {useTranslation} from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [errorModalData, setErrorModalData] = useState("");
    const {t} = useTranslation();
    const [loading, setLoading] = useState(false);
    const insets = useSafeAreaInsets();

    function toggleErrorModal() {
        setErrorModal(!errorModal);
    }

    const { login } = useAuth();

    const handleLogin = () => {
        Keyboard.dismiss();
        setLoading(true);
        login(id, password).then((resp) => {
            if (!resp.success) {
                setErrorModalData(resp.error || 'Login failed');
                toggleErrorModal();
            }
        }).catch((error) => {
            setErrorModalData(error.error || 'Login failed');
            toggleErrorModal();
        }).finally(() => {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        });
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={[styles.container, { paddingTop: insets.top }]}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.keyboardView}
                    >
                        <View style={styles.content}>
                            <View style={styles.headerSection}>
                                <SgSectionAuth />
                            </View>

                            <View style={styles.formSection}>
                                <SgForm>
                                    <SgInput
                                        label={t('yourId')}
                                        placeholder={t('enterId')}
                                        type="text"
                                        value={id}
                                        onChangeText={(e) => setId(e.value)}
                                    />
                                    <SgInput
                                        label={t('password')}
                                        placeholder={t('enterPassword')}
                                        type="password"
                                        value={password}
                                        onChangeText={(e) => setPassword(e.value)}
                                    />
                                </SgForm>
                            </View>
                        </View>

                        <View style={[styles.buttonLayout, { paddingBottom: Math.max(insets.bottom, 16) + 8 }]}>
                            <SgButton
                                onPress={handleLogin}
                                disabled={!id.trim() || !password.trim()}
                                bgColor={COLORS.primary}
                                color={COLORS.white}
                            >
                                {loading ? t('loading') : t('login')}
                            </SgButton>
                        </View>
                    </KeyboardAvoidingView>

                    <SgPopup
                        visible={errorModal}
                        onClose={toggleErrorModal}
                        icon={<InfoCircleModalIcon width={50} height={50} />}
                        title='Error'
                        description={errorModalData}
                    />
                </View>
            </TouchableWithoutFeedback>
        </>
    );
}