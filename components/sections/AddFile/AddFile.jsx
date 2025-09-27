import SgPopup from "@/components/ui/Modal/Modal";

{/* <SgSectionAddFile
    title="Unde Omnis iste natus error sit"
    type="xlsx"
    datetime="13.02.2025 / 4:21 PM"
    onPress={() => console.log('Eye icon pressed')}
/> */
}


import {View, Text, TouchableOpacity, Platform} from 'react-native';
import Eye from '@/assets/images/eye.svg';
import Trash from '@/assets/images/trash.svg';
import XlsxIcon from '@/assets/images/xlsx-icon.svg';
import PdfIcon from '@/assets/images/pdf-icon.svg';
import PptIcon from '@/assets/images/ppt-icon.svg';
import DocIcon from '@/assets/images/doc-icon.svg';
import styles from '@/components/sections/AddFile/AddFile.styles';
import InfoCircleModalIcon from "@/assets/images/infoCircleModal.svg";
import React, {useState} from "react";
import SgTemplateFilePreview from "@/components/templates/FilePreview/FilePreview";
import {useTranslation} from "react-i18next";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as Linking from "expo-linking";

export default function SgSectionAddFile({title, type, datetime, onPress, url, handleRemove, remove = false}) {
    const [previewModal, setPreviewModal] = useState(false);
    const {t} = useTranslation()

    function togglePreviewModal() {
        setPreviewModal(!previewModal);
    }

    const [openSettingsModal, setOpenSettingsModal] = useState(false)
    const [removeModal, setRemoveModal] = useState(false);

    function toggleOpenSettingsModal() {
        setOpenSettingsModal(!openSettingsModal)
    }

    const renderIcon = () => {
        switch (type) {
            case 'pdf':
                return <PdfIcon width={32} height={32}/>;
            case 'ppt':
                return <PptIcon width={32} height={32}/>;
            case 'doc':
                return <DocIcon width={32} height={32}/>;
            case 'xlsx':
                return <XlsxIcon width={32} height={32}/>;
            default:
                return null;
        }
    };

    async function handleDownload() {
        try {
            const fileUri = FileSystem.cacheDirectory + title;

            const downloadResumable = FileSystem.createDownloadResumable(url, fileUri);
            const {uri} = await downloadResumable.downloadAsync();

            const isImageOrVideo = title.match(/\.(jpg|jpeg|png|gif|mp4|mov)$/i);
            const isMedia = title.match(/\.(jpg|jpeg|png|mp4)$/i);

            if (Platform.OS === 'ios') {
                if (isImageOrVideo) {
                    const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();

                    if (status !== 'granted') {
                        if (!canAskAgain) {
                            toggleOpenSettingsModal();
                            return;
                        }
                    }

                    const asset = await MediaLibrary.createAssetAsync(uri);
                    await MediaLibrary.createAlbumAsync('Download', asset, false);
                } else {
                    if (await Sharing.isAvailableAsync()) {
                        await Sharing.shareAsync(uri);
                    } else {
                    }
                }

            } else if (Platform.OS === 'android') {
                if (isMedia) {
                    const {status, canAskAgain} = await MediaLibrary.requestPermissionsAsync();
                    if (status !== 'granted') {
                        if (!canAskAgain) {
                            toggleOpenSettingsModal();
                            return;
                        }
                    }

                    const asset = await MediaLibrary.createAssetAsync(uri);
                    await MediaLibrary.createAlbumAsync('Download', asset, false);
                } else {
                    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
                    if (!permissions.granted) {
                        toggleOpenSettingsModal();
                        return;
                    }

                    const newUri = await FileSystem.StorageAccessFramework.createFileAsync(
                        permissions.directoryUri,
                        title,
                        mimeTypes?.[fileType] || 'application/pdf'
                    );

                    const content = await FileSystem.readAsStringAsync(uri, {
                        encoding: FileSystem.EncodingType.Base64
                    });

                    await FileSystem.writeAsStringAsync(newUri, content, {
                        encoding: FileSystem.EncodingType.Base64
                    });
                }
            }

        } catch (error) {
            console.error('Yükləmə xətası:', error);
            toggleOpenSettingsModal();
        }
    }

    function handleOpenSettings() {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:')
                .catch(() => {
                });
        } else {
            Linking.openSettings()
                .catch(() => {
                });
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.row}>
                    <View style={styles.iconWrapper}>{renderIcon()}</View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.dateTime}>{datetime}</Text>
                    </View>
                    <TouchableOpacity style={styles.eyeIconWrapper} activeOpacity={0.5} onPress={togglePreviewModal}>
                        <Eye width={20} height={20} style={styles.eyeIcon}/>
                    </TouchableOpacity>
                    {remove ?
                        <TouchableOpacity style={styles.eyeIconWrapper} activeOpacity={0.5} onPress={handleRemove}>
                            <Trash width={20} height={20} style={styles.eyeIcon}/>
                        </TouchableOpacity>
                        :
                        null
                    }
                </View>
            </View>


            <SgPopup
                visible={previewModal}
                onClose={togglePreviewModal}
                title={title ? title : t('documentView')}
                footerButton={
                    <SgButton
                        bgColor={COLORS.brand_600}
                        color={COLORS.white}
                        onPress={handleDownload}
                    >
                        {t('download')}
                    </SgButton>
                }
            >
                <SgTemplateFilePreview url={url}/>
            </SgPopup>

            <SgPopup
                visible={openSettingsModal}
                onClose={toggleOpenSettingsModal}
                title="Permission Error"
                description="Location permission error. You have not given permission to access your locations. If you want to turn it on, go to settings. Open settings??"
                // icon={<CheckInModalIcon width={56} height={56}/>}
                footerButton={
                    <SgButton
                        onPress={handleOpenSettings}
                        bgColor={COLORS.primary}
                        color={COLORS.white}
                    >
                        Open
                    </SgButton>
                }
                autoClose={false}
            />
        </>
    );
}
