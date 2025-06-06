{/* <SgSectionAddFile
    title="Unde Omnis iste natus error sit"
    type="xlsx"
    datetime="13.02.2025 / 4:21 PM"
    onPress={() => console.log('Eye icon pressed')}
/> */}


import { View, Text, TouchableOpacity } from 'react-native';
import Eye from '@/assets/images/eye.svg';
import XlsxIcon from '@/assets/images/xlsx-icon.svg';
import PdfIcon from '@/assets/images/pdf-icon.svg';
import PptIcon from '@/assets/images/ppt-icon.svg';
import DocIcon from '@/assets/images/doc-icon.svg';
import styles from '@/components/sections/AddFile/AddFile.styles';

export default function SgSectionAddFile({ title, type, datetime, onPress }) {
  const renderIcon = () => {
    switch (type) {
      case 'pdf':
        return <PdfIcon width={32} height={32} />;
      case 'ppt':
        return <PptIcon width={32} height={32} />;
      case 'doc':
        return <DocIcon width={32} height={32} />;
      case 'xlsx':
        return <XlsxIcon width={32} height={32} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.iconWrapper}>{renderIcon()}</View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.dateTime}>{datetime}</Text>
        </View>
        <TouchableOpacity style={styles.eyeIconWrapper} activeOpacity={0.5} onPress={onPress}>
          <Eye width={20} height={20} style={styles.eyeIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
