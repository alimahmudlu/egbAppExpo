import {View, StyleSheet, useWindowDimensions} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import COLORS from '@/constants/colors'

export default function SafeScreen({children}) {
    const insets = useSafeAreaInsets();
    // const { width, height } = useWindowDimensions();
    // const orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
    
    // return <View style={[styles.container, orientation === 'LANDSCAPE' ? {paddingLeft: insets.top} : {paddingTop: insets.top}]}>{children}</View>
    return <View style={[styles.container, {
                                                // paddingLeft: insets.left || 0,
                                                // paddingRight: insets.right || 0,
                                                paddingTop: insets.top || 0,
                                                paddingBottom: insets.bottom || 0
    }]}>{children}</View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        boxShadow: 'inset 0px 300px 0px 0px #0A2926',
        // backgroundColor: COLORS.brand_950
        // backgroundColor: COLORS.warning_700
        backgroundColor: COLORS.white
    }
})