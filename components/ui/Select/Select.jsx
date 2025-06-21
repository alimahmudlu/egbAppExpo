import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import styles from './Select.styles';
import Eye from '@/assets/images/eye.svg';
import COLORS from '@/constants/colors';
import SgPopup from "@/components/ui/Modal/Modal";
import SgRadio from "@/components/ui/Radio/Radio";

export default function SgSelect(props) {
    const {
        label,
        placeholder,
        value,
        name,
        onChangeText,
        modalTitle,
        list,
    } = props
    const [selectModal, setSelectModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);

    function toggleSelectModal() {
        setSelectModal(!selectModal);
    }

    function handleSelect(e, item) {
        e.stopPropagation()
        setSelectedValue({
            id: item?.id,
            name: item?.name,
        });
        onChangeText({
            name: name,
            value: {
                id: item?.id,
                name: item?.name,
            }
        })
    }


    return (
        <>
            <View style={styles.wrapper}>
                {label && <Text style={styles.label}>{label}</Text>}

                <Pressable
                    onPress={toggleSelectModal}
                    style={[styles.inputContainer]}
                >
                    <View
                        style={styles.input}
                    >
                        {value?.id ? <Text>{value?.name}</Text> : <Text style={COLORS.gray_400}>{placeholder}</Text>}
                    </View>
                    <View
                        style={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Eye width={20} height={20}/>
                    </View>
                </Pressable>
            </View>
            <SgPopup
                visible={selectModal}
                onClose={toggleSelectModal}
                title={placeholder}
            >
                <View>
                    {(list || []).map((item, index) => (
                        <Pressable onPress={(e) => handleSelect(e, item)} key={index} style={{flexDirection: 'row', alignItems: 'center', flex: 1, width: '100%', gap: 10, borderBottomWidth: list?.length === index + 1 ? 0 : 1, borderBottomColor: COLORS.gray_200, paddingVertical: 10}}>
                            <View><SgRadio selected={item?.id === selectedValue?.id} /></View>
                            <View style={{flex: 1}}>{item?.render}</View>
                        </Pressable>
                    ))}
                </View>
            </SgPopup>
        </>
    );
}
