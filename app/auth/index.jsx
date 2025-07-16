import {
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert, Dimensions
} from "react-native";
import styles from "@/assets/styles/auth/auth.styles";
import SgSectionAuth from "@/components/sections/AuthSection/AuthSection";
import SgForm from "@/components/ui/Form/Form";
import SgInput from "@/components/ui/Input/Input";
import SgCheckbox from "@/components/ui/Checkbox/Checkbox";
import SgButton from "@/components/ui/Button/Button";
import { useState } from "react";
import COLORS from "@/constants/colors";
import {useAuth} from "@/hooks/useAuth";
import SgPopup from "@/components/ui/Modal/Modal";
import InfoCircleModalIcon from "@/assets/images/infoCircleModal.svg";
import SgCard from "@/components/ui/Card/Card";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useTranslation} from "react-i18next";

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [errorModalData, setErrorModalData] = useState("");
    const {t} = useTranslation();

    function toggleErrorModal() {
        setErrorModal(!errorModal);
    }

    const { login } = useAuth(); // Assuming useAuth is defined in your hooks

  const handleLogin = () => {
    login(id, password).then((resp) => {
        if (!resp.success) {
            setErrorModalData(resp.error || 'Login failed');
            toggleErrorModal()
        }
    }).catch((error) => {
        setErrorModalData('Login failed');
    })
  };
  return (
    <>
      {/*<TouchableWithoutFeedback onPress={Keyboard.dismiss}>*/}
        <SgTemplateScreen head={null}>
            <View style={[styles.container]}>
                <View>
                    <SgSectionAuth />
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
                        {/*<SgCheckbox label="Remember me" />*/}
                    </SgForm>
                </View>
                <View style={styles.buttonLayout}>
                    <SgButton
                        onPress={handleLogin}
                        disabled={!id || !password}
                        bgColor = {COLORS.primary}
                        color= {COLORS.white}
                    >
                        {t('login')}
                    </SgButton>
                </View>
            </View>


            <SgPopup
                visible={errorModal}
                onClose={toggleErrorModal}
                icon={<InfoCircleModalIcon width={56} height={56} />}
                title='Error'
                description={errorModalData}
            />
        </SgTemplateScreen>
      {/*</TouchableWithoutFeedback>*/}

    </>
  );
}