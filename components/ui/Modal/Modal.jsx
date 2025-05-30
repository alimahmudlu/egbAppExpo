import React, { useEffect, useRef, cloneElement } from 'react';
import {Modal, View, Text, Animated, TouchableWithoutFeedback} from 'react-native';
import styles from './Modal.styles';
import Button from '@/components/ui/Button/Button';
import COLORS from '@/constants/colors';

import InfoIcon from '@/assets/images/info-circle.svg';

export default function SgPopup({
  visible,
  onClose,
  title,
  description,
  iconType = null,
  children = null,
  footerButton = null,
}) {
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const renderIcon = () => {
    switch (iconType) {
      case 'info':
        return <InfoIcon width={28} height={28} />;
      case 'success':
        return <InfoIcon width={28} height={28} />;
      case 'danger':
        return <InfoIcon width={28} height={28} />;
      default:
        return null;
    }
  };

  const renderFooterButton = () => {
    if (!footerButton) return null;

    const originalOnPress = footerButton.props.onPress;

    return cloneElement(footerButton, {
      onPress: () => {
        if (typeof originalOnPress === 'function') {
          originalOnPress();
        }
        onClose();
      },
    });
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
        </TouchableWithoutFeedback>

        <View style={styles.container}>
          <View style={styles.dragHandle} />

          {iconType && (
            <View style={styles.iconContainer}>
              {renderIcon()}
            </View>
          )}

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
                {renderFooterButton()}
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}
