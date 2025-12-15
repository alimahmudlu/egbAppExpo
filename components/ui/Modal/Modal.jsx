import React, { useEffect, useRef, cloneElement } from 'react';
import {
    Modal,
    View,
    Text,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    Keyboard, ScrollView
} from 'react-native';
import styles from './Modal.styles';
import SgButton from '@/components/ui/Button/Button';
import COLORS from '@/constants/colors';

import InfoIcon from '@/assets/images/info-circle.svg';
import {useTranslation} from "react-i18next";

export default function SgPopup({
  visible,
  onClose,
  title,
  description,
    icon,
  iconType = null,
  children = null,
  footerButton = null,
    autoClose = true,
    fullScreen = false,
                                  closeType = null
}) {
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const {t} = useTranslation();

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
        return icon;
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
        if (autoClose) {
          onClose();
        }
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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.keyboard}
        >
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}
            >
              <View style={{ flex: 1, height: Dimensions.get('window').height }}>
                <TouchableWithoutFeedback onPress={onClose}>
                  <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]} />
                </TouchableWithoutFeedback>

                <View style={[styles.container, fullScreen && { flex: 1, height: '100%', paddingTop: 24  }]}>
                  <View style={styles.dragHandle} />

                  <View style={{marginVertical: 'auto'}}>
                    {(iconType || icon) && (
                        <View style={styles.iconContainer}>
                          {renderIcon()}
                        </View>
                    )}

                    {title && (
                        <Text
                            style={[
                              styles.title,
                              !iconType && styles.titleWithoutIcon,
                            ]}
                        >
                          {title}
                        </Text>
                    )}
                    {description && <Text style={styles.description}>{description}</Text>}

                  </View>

                    <ScrollView>
                        {children}
                    </ScrollView>

                  <View style={styles.footerButtonsContainer}>
                    <View style={{ flex: 1 }}>
                      <SgButton onPress={onClose} color={COLORS.buttonNoColor}>
                        {closeType === 'select' ? t('select') : t('close')}
                      </SgButton>
                    </View>
                    {footerButton && (
                      <View style={{ flex: 1 }}>
                        {renderFooterButton()}
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    </Modal>
  );
}
