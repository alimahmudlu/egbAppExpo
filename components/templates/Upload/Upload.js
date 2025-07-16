import React, { useState } from 'react';
import {View, Alert, ActivityIndicator} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import {useApi} from "@/hooks/useApi";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import {useTranslation} from "react-i18next";

export default function SgTemplateUpload(props) {
    const {selectedFiles, setSelectedFiles, multiple} = props;
    const [uploading, setUploading] = useState(false);
    const [url, setUrl] = useState('');
    const { request } = useApi();
    const {t} = useTranslation()

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

    const pickAndUploadImage = async () => {

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Sadəcə şəkil
            allowsEditing: false,
            quality: 1,
        });
        if (result.canceled || !result.assets || result.assets.length === 0) return;

        const file = result?.assets?.[0];

        console.log(file, 'file');

        try {
            setUploading(true);

            const formData = new FormData();
            formData.append('file', {
                uri: file.uri,
                name: file.name || file.fileName,
                type: file.mimeType || 'application/octet-stream',
            });

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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
                        <SgButton onPress={pickAndUpload}
                                  bgColor={COLORS.gray_50}
                                  color={COLORS.gray_600}
                        >
                            {t('addFile')}
                        </SgButton>
                        <SgButton onPress={pickAndUploadImage}
                                  bgColor={COLORS.gray_50}
                                  color={COLORS.gray_600}
                        >
                            {t('addImage')}
                        </SgButton>
                    </View>
            }
        </View>
    );
};