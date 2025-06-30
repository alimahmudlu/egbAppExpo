import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Video } from 'expo-av';

// Fayl tipini URL-dən çıxarır
const getFileExtension = (url) => {
    const cleanUrl = url.split('?')[0].split('#')[0];
    return cleanUrl?.split('.').pop()?.toLowerCase();
};

export default function SgTemplateFilePreview({ url }) {
    if (!url) {
        return (
            <View style={styles.center}>
                <Text>Fayl URL-si boşdur</Text>
            </View>
        );
    }

    const ext = getFileExtension(url);

    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];
    const videoTypes = ['mp4', 'mov', 'avi', 'mkv', 'webm'];
    const officeTypes = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'];
    const pdfTypes = ['pdf'];

    // Şəkil preview
    if (imageTypes.includes(ext)) {
        return (
            <Image
                source={{ uri: url }}
                style={styles.image}
                resizeMode="contain"
            />
        );
    }

    // PDF və Office faylları üçün Google Docs viewer
    if ([...pdfTypes, ...officeTypes].includes(ext)) {
        const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;
        return (
            <WebView
                source={{ uri: googleDocsUrl }}
                style={styles.webview}
                originWhitelist={['*']}
                startInLoadingState
            />
        );
    }

    // Video faylı preview
    if (videoTypes.includes(ext)) {
        return (
            <Video
                source={{ uri: url }}
                useNativeControls
                resizeMode="contain"
                style={styles.video}
            />
        );
    }

    // Tanınmayan fayl növü
    return (
        <View style={styles.center}>
            <Text>Bu fayl növü üçün önizləmə mövcud deyil.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
    },
    webview: {
        flex: 1,
        minHeight: 400,
    },
    video: {
        width: '100%',
        height: 300,
    },
    center: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
