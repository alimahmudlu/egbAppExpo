import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, Platform} from 'react-native';
import styles from './FileCard.styles';
import moment from "moment/moment";

import XLSXIcon from '@/assets/images/xlsx-icon.svg';
import PDFIcon from '@/assets/images/pdf-icon.svg';
import DOCIcon from '@/assets/images/doc-icon.svg';
import PPTIcon from '@/assets/images/ppt-icon.svg';
import EyeIcon from '@/assets/images/eye.svg';
import TrashIcon from '@/assets/images/trash2.svg';
import COLORS from '@/constants/colors';
import SgPopup from '@/components/ui/Modal/Modal';
import SgButton from '@/components/ui/Button/Button';
import SgTemplateFilePreview from "@/components/templates/FilePreview/FilePreview";
import {useTranslation} from "react-i18next";

import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as Linking from "expo-linking";

const mimeTypes = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ppt: 'application/vnd.ms-powerpoint',
    pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    txt: 'text/plain',
    csv: 'text/csv',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    mp3: 'audio/mpeg',
    wav: 'audio/wav',
    mp4: 'video/mp4',
    mov: 'video/quicktime',
    avi: 'video/x-msvideo',
    zip: 'application/zip',
    rar: 'application/vnd.rar',
    '7z': 'application/x-7z-compressed',
    json: 'application/json',
    xml: 'application/xml',
    html: 'text/html',
    htm: 'text/html',
    apk: 'application/vnd.android.package-archive'
};



const getFileIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'xlsx':
      return <XLSXIcon width={32} height={32} />;
    case 'pdf':
      return <PDFIcon width={32} height={32} />;
    case 'doc':
      return <DOCIcon width={32} height={32} />;
    case 'ppt':
      return <PPTIcon width={32} height={32} />;
    default:
        return <DOCIcon width={32} height={32} />;
  }
};


const getStatusStyles = (type) => {
  switch (type) {
    case 'danger':
      return { backgroundColor: COLORS.error_100, color: COLORS.error_700 }; 
    case 'success':
      return { backgroundColor: COLORS.success_100, color: COLORS.success_700 }; 
    case 'warning':
      return { backgroundColor: COLORS.warning_100, color: COLORS.warning_700 }; 
    default:
      return { backgroundColor: COLORS.gray_100, color: COLORS.gray_700 };
  }
};

export default function SgFileCard({ auid, fileType, title, description, type, issueDate, url, expiryDate, migrationId, deletePermission, handleRemove, removeSet}) {
    const [previewModal, setPreviewModal] = useState(false);
    const [openSettingsModal, setOpenSettingsModal] = useState(false)
    const [removeModal, setRemoveModal] = useState(false);

    function toggleOpenSettingsModal() {
        setOpenSettingsModal(!openSettingsModal)
    }

    function togglePreviewModal() {
        setPreviewModal(!previewModal);
    }
    function toggleRemoveModal() {
        setRemoveModal(!removeModal);
    }

    useEffect(() => {
        setRemoveModal(false)
    }, [removeSet]);



    const [status, setStatus] = useState({
        name: "",
        styles: {}
    })

    const {t} = useTranslation();

    // async function handleDownload() {
    //     try {
    //         // Faylı telefonun keçici yaddaşına yüklə
    //         const fileUri = FileSystem.documentDirectory + title;
    //
    //         const downloadResumable = FileSystem.createDownloadResumable(
    //             url,
    //             fileUri
    //         );
    //
    //         const { uri } = await downloadResumable.downloadAsync();
    //         console.log('Fayl yükləndi:', uri);
    //
    //         // MediaLibrary üçün icazə istə
    //         const { status , canAskAgain} = await MediaLibrary.requestPermissionsAsync();
    //         if (status !== 'granted') {
    //             if (!canAskAgain) {
    //                 toggleOpenSettingsModal()
    //                 return;
    //             }
    //         }
    //
    //         // Faylı qalereyaya və ya fayl sisteminə qeyd et
    //         const asset = await MediaLibrary.createAssetAsync(uri);
    //         await MediaLibrary.createAlbumAsync('Download', asset, false);
    //     } catch (error) {
    //         console.error('Yükləmə xətası:', error);
    //         toggleOpenSettingsModal()
    //     }
    // }


    async function handleDownload() {
        try {
            const fileUri = FileSystem.cacheDirectory + title;

            const downloadResumable = FileSystem.createDownloadResumable(url, fileUri);
            const { uri } = await downloadResumable.downloadAsync();

            const isImageOrVideo = title.match(/\.(jpg|jpeg|png|gif|mp4|mov)$/i);
            const isMedia = title.match(/\.(jpg|jpeg|png|mp4)$/i);

            if (Platform.OS === 'ios') {
                if (isImageOrVideo) {
                    const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();

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
                    const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
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
    //
    // async function handleDownload() {
    //     try {
    //         // Faylın saxlanacağı yer
    //         const fileUri = FileSystem.documentDirectory + title;
    //
    //         // Faylı yüklə
    //         const downloadResumable = FileSystem.createDownloadResumable(url, fileUri);
    //         const { uri } = await downloadResumable.downloadAsync();
    //
    //         console.log('Fayl yükləndi:', uri);
    //
    //         // Faylı paylaşmaq (yəni istifadəçiyə göstərmək, saxlatmaq və s.)
    //         if (await Sharing.isAvailableAsync()) {
    //             await Sharing.shareAsync(uri);
    //         } else {
    //             Alert.alert(
    //                 "Paylaşma mümkün deyil",
    //                 "Bu cihazda faylı paylaşmaq üçün uyğun tətbiq yoxdur"
    //             );
    //         }
    //
    //     } catch (error) {
    //         console.error('Fayl yükləmə və paylaşma xətası:', error);
    //         Alert.alert("Xəta", "Fayl yüklənərkən və ya paylaşılarkən problem oldu.");
    //     }
    // }

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

    useEffect(() => {
        const expiresAt = expiryDate
            ? new Date(expiryDate)
            : null;
        let _status = {
            name: t('active'),
            styles: getStatusStyles('success')
        };
        if (expiresAt) {
            const now = new Date();
            const diff =
                (expiresAt.getTime() - now.getTime()) /
                (1000 * 60 * 60 * 24);
            if (diff < 0) {
                _status = {
                    name: t('expired'),
                    styles: getStatusStyles('danger')
                };
            } else if (diff <= 30 && type !== 'registration_card') {
                _status = {
                    name: t('expiringSoon'),
                    styles: getStatusStyles('warning')
                };
            } else if (diff <= 7 && type === 'registration_card') {
                _status = {
                    name: t('expiringSoon'),
                    styles: getStatusStyles('warning')
                };
            }
        }
        setStatus(_status)

    }, [expiryDate]);

  return (
    <View>
        <View style={styles.card}>
            <View style={styles.topRow}>
                <View>
                    {getFileIcon(fileType)}
                </View>
                <View style={[styles.statusBadge, { backgroundColor: status?.styles?.backgroundColor }]}>
                    <Text style={[styles.statusText, { color: status?.styles?.color }]}>{status?.name}</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.migrationBox}>
                    <Text style={styles.migrationText}>{migrationId}</Text>
                </View>

                
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </View>

            <View style={styles.bottomRow}>
                <View style={styles.expireBox}>
                    <Text style={styles.expireText}>{t('expireDate')}</Text>
                    <Text style={styles.expireDate}>{expiryDate ? moment(expiryDate).format('DD/MM/YYYY') : null}</Text>
                </View>
                <View styles={{gap: 16, alignItems: 'center', flex: 1}}>
                    {deletePermission ? (
                        <TouchableOpacity style={{padding: 10}} onPress={toggleRemoveModal}>
                            <TrashIcon width={20} height={20} />
                        </TouchableOpacity>
                    ) : null}
                    <TouchableOpacity style={{padding: 10}} onPress={togglePreviewModal}>
                        <EyeIcon width={20} height={20} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <SgPopup
            visible={previewModal}
            onClose={togglePreviewModal}
            title={t('documentView')}
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
            <View style={{paddingBottom: 16}}>
                <SgTemplateFilePreview url={url} />
            </View>
        </SgPopup>
        <SgPopup
            visible={removeModal}
            onClose={toggleRemoveModal}
            title={t('documentRemove')}
            footerButton={
                <SgButton
                    bgColor={COLORS.error_600}
                    color={COLORS.white}
                    onPress={() => handleRemove(auid, title)}
                >
                    {t('remove')}
                </SgButton>
            }
        >
            <View style={{paddingBottom: 16}}>
                <SgTemplateFilePreview url={url} />
            </View>
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
    </View>
  );
}
