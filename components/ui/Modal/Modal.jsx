import React from 'react';
import {
  Modal,
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import styles from './Modal.styles';
import Button from '../../../components/ui/Button/Button';
import COLORS from '../../../constants/colors';

const { width } = Dimensions.get('window');

export default function SgModal({
  visible,
  onClose,
  title,
  description,
  icon,
  children = null,
  footerButton = null,
}) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <View style={styles.dragHandle} />

        {icon && <View style={styles.iconContainer}>{icon}</View>}

        {title && <Text style={styles.title}>{title}</Text>}
        {description && <Text style={styles.description}>{description}</Text>}

        {children}

        <View style={styles.footerButtonsContainer}>
            <View style={{ flex: 1 }}>
                <Button onPress={onClose} color={COLORS.buttonNoColor}>
                Close
                </Button>
            </View>

            {footerButton && (
                <View style={{ flex: 1 }}>
                {footerButton}
                </View>
            )}
        </View>
      </View>
    </Modal>
  );
}
