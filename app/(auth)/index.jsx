import {View,Text,Image,KeyboardAvoidingView,Platform,TouchableWithoutFeedback,Keyboard} from "react-native";
import styles from "../../assets/styles/auth/auth.styles";
import AuthSection from "../../components/sections/AuthSection/AuthSection";
import SgForm from "../../components/ui/Form/Form";
import SgInput from "../../components/ui/Input/Input";
import SgCheckbox from "../../components/ui/Checkbox/Checkbox";
import SgButton from "../../components/ui/Button/Button";
import { useState } from "react";
import COLORS from "../../constants/colors";

export default function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', id, password);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        <View>
            <AuthSection />
            <SgForm>
            <SgInput
                label="Your ID"
                placeholder="Enter email..."
                type="email"
                value={id}
                onChangeText={setId}
            />
            <SgInput
                label="Password"
                placeholder="Enter password..."
                type="password"
                value={password}
                onChangeText={setPassword}
            />
            <SgCheckbox label="Remember me" />
            </SgForm>
        </View>
        <View style={styles.buttonLayout}>
            <SgButton
                onPress={handleLogin}
                disabled={!id || !password}
                bgColor = {COLORS.primary}
                color= {COLORS.white}
                >
                Login
            </SgButton>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}