import {ActivityIndicator, View} from "react-native";

export default function SgLoading() {
    return (
        <>
            <View style={{ flex: 1, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        </>
    )
}