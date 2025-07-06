import React, { useState } from 'react';
import {View, Button, Text, Alert, ActivityIndicator, Platform, PermissionsAndroid} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import {useApi} from "@/hooks/useApi";
import moment from "moment-timezone";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";

export default function SgTemplateUpload(props) {
    const {selectedFiles, setSelectedFiles, multiple} = props;
    const [uploading, setUploading] = useState(false);
    const [url, setUrl] = useState('');
    const { request } = useApi();

    const pickAndUpload = async () => {

        const result = await DocumentPicker.getDocumentAsync({ copyToCacheDirectory: true });

        if (result.canceled || !result.assets || result.assets.length === 0) return;

        const file = result?.assets?.[0];

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append('file', {
                uri: file.uri,
                name: file.name,
                type: file.mimeType || 'application/octet-stream',
            });

            //
            // const res = await request({
            //     url: `/upload/file`,
            //     method: 'post',
            //     // headers: {
            //     //     'Content-Type': 'multipart/form-data',
            //     // },
            //     body: formData,
            // });
            //
            // // const data = await res.json();
            // setUrl(res.url);
            // Alert.alert('Uğurla yükləndi', res.url);

            const res = await fetch('https://alimahmudlu-egb.duckdns.org/api/upload/file', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            setUrl(data?.data);
            setSelectedFiles(prev => (
                [...prev,{
                    loading: false,
                    id: data?.data?.id,
                    name: data?.data?.filename,
                    type: data?.data?.mimeType,
                    date: data?.data?.uploaded_at,
                    filepath: data?.data?.filepath,
                }]
            ))
        } catch (err) {
            console.error(err);
            Alert.alert('Xəta', 'Yükləmə zamanı xəta baş verdi');
        } finally {
            setUploading(false);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', marginBottom: 16 }}>
            {uploading ?
                <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />
                :
                (!multiple && selectedFiles.length > 0) ?
                    null
                    :
                    <SgButton onPress={pickAndUpload}
                              bgColor={COLORS.gray_50}
                              color={COLORS.gray_600}
                    >
                        Add file +
                    </SgButton>
            }
        </View>
    );
};