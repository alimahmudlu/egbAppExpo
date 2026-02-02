import { Platform, StyleSheet, View } from "react-native";
import COLORS from "@/constants/colors";
import SgTemplatesScreenView from "@/components/templates/ScreenView/ScreenView";

export default function SgTemplatesScreen(props) {
    const { head, children, scrollView = true } = props;

    return (
        <SgTemplatesScreenView scrollView={scrollView}>
            <View style={styles.contentContainer}>
                {head && <View style={styles.head}>{head}</View>}
                <View style={styles.body}>
                    {children}
                </View>
            </View>
        </SgTemplatesScreenView>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        minHeight: '100%',
        paddingBottom: Platform.OS === 'ios' ? 60 : 20,
        backgroundColor: COLORS.white,
        flexDirection: 'column',
    },
    head: {
        width: '100%',
    },
    body: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
        gap: 16,
    },
});
