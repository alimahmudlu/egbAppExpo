import {ActivityIndicator, View} from "react-native";
import COLORS from "@/constants/colors";

export default function SgLoading() {
    return (
        <>
            <View style={{ flex: 1, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        </>
    )
}