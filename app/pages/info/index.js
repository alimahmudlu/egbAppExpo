import {Text, View, StyleSheet} from "react-native";
import React from "react";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import {useLocalSearchParams} from "expo-router";
import SgSectionDownloadApp from "@/components/sections/DownloadApp/DownloadApp";
import {Image} from "expo-image";
import AppInfoImage from "@/assets/images/appInfoImage.png";
import SgTemplatePageHeader from "@/components/templates/PageHeader/PageHeader";

export default function ProjectItemScreen() {
    const { projectId } = useLocalSearchParams();

    return (
        <SgTemplateScreen
            head={<SgTemplatePageHeader data={{
                header: 'App Info'
            }} />}
        >
            <View gap={32}>
                <View>
                    <Image
                        source={AppInfoImage}
                        style={{
                            width: '100%',
                            // height: '100%',
                            // objectFit: 'cover',
                            // resizeMode: 'cover',
                            aspectRatio: 344/216
                        }}

                    />
                </View>
                <View>
                    <SgSectionDownloadApp
                        version="2.44.9"
                        title="Tətbiqi aşağıdakı platformalarda qiymətləndirin"
                        platforms={['android', 'ios']}
                    />
                </View>
                <View>
                    <Text style={styles.contentTitle}>
                        But who has any right to find fault with a man who chooses
                    </Text>
                    <Text style={styles.contentDescription}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    </Text>

                    <Text style={styles.contentTitle}>
                        But who has any right to find fault with a man who chooses
                    </Text>
                    <Text style={styles.contentDescription}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    </Text>

                    <Text style={styles.contentTitle}>
                        But who has any right to find fault with a man who chooses
                    </Text>
                    <Text style={styles.contentDescription}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                    </Text>
                </View>
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
    overviewButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
    },
    overviewButtonText: {
        color: '#000000',
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 16,
        // lineHeight: '24px',
},
    container: {
        flex: 1,
    },
    contentText: {
        fontSize: 16,
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
});
