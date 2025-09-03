import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Pressable, ScrollView} from 'react-native';
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
        isInvalid,
        list,
    } = props
    const [selectModal, setSelectModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);

    // console.log(list)

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
                {label && <Text style={[styles.label, isInvalid && styles.labelError]}>{label}</Text>}
                <Pressable
                    onPress={toggleSelectModal}
                    style={[styles.inputContainer, isInvalid && styles.inputErrorContainer]}
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
                closeType="select"
            >
                <ScrollView style={{flex: 1, padding: 10, maxHeight: 400, height: '100%'}}  contentContainerStyle={{paddingBottom: 10}}>
                    {(list || []).map((item, index) => (
                        <Pressable onPress={(e) => handleSelect(e, item)} key={index} style={{flexDirection: 'row', alignItems: 'center', flex: 1, width: '100%', gap: 10, borderBottomWidth: list?.length === index + 1 ? 0 : 1, borderBottomColor: COLORS.gray_200, paddingVertical: 10}}>
                            <View><SgRadio selected={item?.id === selectedValue?.id} /></View>
                            <View style={{flex: 1}}>{item?.render}</View>
                        </Pressable>
                    ))}
                </ScrollView>
            </SgPopup>
        </>
    );
}
