import {Text, View, StyleSheet} from "react-native";
import React, {useEffect} from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useLocalSearchParams} from "expo-router";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";
import {useApi} from "@/hooks/useApi";
import {useLanguage} from "@/hooks/useLanguage";

export default function PrivacyPolicyScreen() {
    const {request} = useApi();
    const {position_id} = useLocalSearchParams();
    const [details, setDetails] = React.useState({});
    const { selectedLanguage } = useLanguage()

    useEffect(() => {
        request({
            url: `/position/${position_id}`,
            method: 'get'
        }).then(res => {
            setDetails(res.data)
        }).catch(err => {
            // console.log(err, 'errrrr');
        })
    }, [])

    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: 'Job Responsibilities'
            }} />}
        >
            <View>
                <Text style={styles.contentTitle}>
                    {selectedLanguage?.id !== 'en' ? `${details?.[['name', selectedLanguage?.id].join('_')]}` : `${details?.name}`}
                </Text>
                <Text style={styles.contentDescription}>
                    {selectedLanguage?.id !== 'en' ? `${details?.[['responsibilities', selectedLanguage?.id].join('_')]}` : `${details?.responsibilities}`}
                </Text>
            </View>
        </SgTemplateScreen>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 'auto',
        marginLeft: 'auto',
    },
    contentTitle: {
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 8,
        lineHeight: 28,
        color: '#0C111D'
    },
    contentDescription: {
        fontSize: 14,
        fontWeight: 400,
        marginBottom: 24,
        lineHeight: 20,
        color: '#0C111D'
    },
    container: {
        flex: 1,
    },
    contentText: {
        fontSize: 16,
    }
});
