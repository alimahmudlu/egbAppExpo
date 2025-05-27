import {View,Text,Image,KeyboardAvoidingView,Platform,TouchableWithoutFeedback,Keyboard} from "react-native";
import styles from "../../assets/styles/auth/auth.styles";
import AuthSection from "../../components/sections/AuthSection/AuthSection";
import Form from "../../components/ui/Form/Form";
import Input from "../../components/ui/Input/Input";
import Checkbox from "../../components/ui/Checkbox/Checkbox";
import Button from "../../components/ui/Button/Button";
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
            <Form>
            <Input
                label="Your ID"
                placeholder="Enter email..."
                type="email"
                value={id}
                onChangeText={setId}
            />
            <Input
                label="Password"
                placeholder="Enter password..."
                type="password"
                value={password}
                onChangeText={setPassword}
            />
            <Checkbox label="Remember me" />
            </Form>
        </View>
        <View style={styles.buttonLayout}>
            <Button
                onPress={handleLogin}
                disabled={!id || !password}
                bgColor = {COLORS.primary}
                color= {COLORS.white}
                >
                Login
            </Button>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}