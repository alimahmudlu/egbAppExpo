import {Platform, StyleSheet, View} from "react-native";
import COLORS from "@/constants/colors";
import SgTemplatesScreenView from "@/components/templates/ScreenView/ScreenView";

export default function SgTemplatesScreen(props) {
    const {head, children} = props;

    return (
        <SgTemplatesScreenView>
            <View style={styles.contentContainer}>
                {head && <View style={styles.head}>{head}</View>}
                <View style={[styles.body]}>
                    {children}
                </View>
            </View>
        </SgTemplatesScreenView>
    )
}

const styles = StyleSheet.create({

    contentContainer: {
        minHeight: '100%',
        paddingBottom: Platform.OS === 'ios' ? 56 : 16,
        backgroundColor: COLORS.white,
        flexDirection: 'column',
        gap: 12,
        boxSizing: 'border-box'
    },
    head: {
        width: '100%',
        flex: 0
    },
    body: {
        width: '100%',
        flex: 1, padding: 16, gap: 12
    }
});