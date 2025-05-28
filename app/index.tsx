import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import SgModal from "../components/ui/Modal/Modal";
import InfoIcon from "../assets/images/info-circle.svg";
import SgButton from "../components/ui/Button/Button";
import COLORS from "../constants/colors";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = () => {
  
    console.log("Delete button pressed");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Link href="/(auth)">Login</Link>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button title="Show Modal" onPress={() => setModalVisible(true)} />

        <SgModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          title="Error"
          description="The standard chunk of Lorem Ipsum used since the are also reproduced in their?"
          icon={<InfoIcon width={28} height={28} />}
          footerButton={
            <SgButton
              onPress={handleDelete}
              bgColor={COLORS.primary}
              color={COLORS.white}
            >
              Check in
            </SgButton>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "green"
  }
});
