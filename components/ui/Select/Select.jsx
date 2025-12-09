import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, ScrollView, TouchableOpacity} from 'react-native';
import styles from './Select.styles';
import Down from '@/assets/images/chevron-down.svg';
import COLORS from '@/constants/colors';
import SgPopup from "@/components/ui/Modal/Modal";
import SgRadio from "@/components/ui/Radio/Radio";
import SgCheckbox from "@/components/ui/Checkbox/Checkbox";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo"; // Multi-select üçün fərz edilən import

export default function SgSelect(props) {
    const {
        label,
        placeholder,
        value, // Single-select üçün {id, name}, Multi-select üçün [{id, name}, ...]
        name,
        onChangeText,
        multiple = false,
        modalTitle,
        isInvalid,
        list,
        filters = []
    } = props
    const [userFilters, setUserFilters] = useState({});
    const [array, setArray] = useState(list ? [...list] : [])

    useEffect(() => {
        setArray(list ? [...list] : [])
    }, [list])

    function handleChange(e, key) {
        setUserFilters({...userFilters, [e.name]: e.value});
        setArray(list.filter(item => {
            return item?.[key]?.id === e.value?.id
        }))
    }

    // Başlanğıc dəyəri propdan götürürük və multi-select üçün massiv olmasını təmin edirik
    const initialValue = multiple ? (Array.isArray(value) ? value : []) : (value || null);

    const [selectModal, setSelectModal] = useState(false);
    // selectedValue tək seçim üçün obyekt, çox seçim üçün massiv olacaq
    const [selectedValue, setSelectedValue] = useState(initialValue);

    // value propu dəyişdikdə state-i yeniləmək üçün useEffect istifadə edirik
    useEffect(() => {
        const newValue = multiple ? (Array.isArray(value) ? value : []) : (value || null);
        setSelectedValue(newValue);
    }, [value, multiple]);


    function toggleSelectModal() {
        setSelectModal(!selectModal);
    }

    function handleSelect(e, item) {
        e.stopPropagation();

        if (multiple) {
            // --- Çox Seçimli Məntiq ---
            const isSelected = selectedValue.some(selected => selected.id === item.id);
            let newSelectedValue;

            if (isSelected) {
                // Seçimi ləğv et
                newSelectedValue = selectedValue.filter(selected => selected.id !== item.id);
            } else {
                // Seçim əlavə et
                newSelectedValue = [...selectedValue, {id: item.id, name: item.name}];
            }

            setSelectedValue(newSelectedValue);

            // Üst komponentə massivi göndər
            onChangeText({
                name: name,
                value: newSelectedValue,
            });

        } else {
            // --- Tək Seçimli Məntiq ---
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
            });
            // Tək seçimdə popupu bağla
            toggleSelectModal();
        }
    }

    // Çox seçim üçün seçilmiş adları göstərmək üçün funksiya
    const getDisplayValue = () => {
        if (multiple) {
            if (selectedValue.length > 0) {
                const names = selectedValue.map(item => item.name);
                // İlk bir neçə adı göstərib sonra sayını qeyd et
                if (names.length > 2) {
                    return `${names.slice(0, 2).join(', ')} və ${names.length - 2} daha...`;
                }
                return names.join(', ');
            }
            return placeholder;
        } else {
            return value?.id ? value?.name : placeholder;
        }
    };


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
                        {/* Görüntü sahəsini yeniləyirik */}
                        <Text style={!value?.id && (!multiple || (multiple && selectedValue.length === 0)) ? {color: COLORS.gray_400} : {}}>
                            {getDisplayValue()}
                        </Text>
                    </View>
                    <View
                        style={styles.icon}
                    >
                        <Down width={20} height={20}/>
                    </View>
                </Pressable>
            </View>
            <SgPopup
                visible={selectModal}
                onClose={toggleSelectModal}
                title={modalTitle || placeholder}
                closeType={multiple ? "default" : "select"}
            >
                <View>
                    {filters.length > 0 && (
                        filters.map((filter, index) => (
                            <SgSelect
                                key={index}
                                label={filter?.label}
                                placeholder={filter?.name}
                                value={userFilters[filter?.name]}
                                modalTitle={filter?.name}
                                name={filter?.name}
                                onChangeText={(e) => handleChange(e, filter?.key)}
                                list={(filter?.list || [])}
                            />
                        ))
                    )}
                </View>
                <ScrollView
                    style={{flex: 1, padding: 10, maxHeight: 400, height: '100%'}}
                    contentContainerStyle={{paddingBottom: 10}}
                >

                    {(array || []).map((item, index) => {
                        // Seçim vəziyyətini yoxla
                        const isSelected = multiple
                            ? selectedValue.some(selected => selected.id === item.id)
                            : item?.id === selectedValue?.id;

                        return (
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={(e) => handleSelect(e, item)}
                                key={index}
                                style={{
                                    flex: 1,
                                    width: '100%',
                                    gap: 10,
                                    borderBottomWidth: list?.length === index + 1 ? 0 : 1,
                                    borderBottomColor: COLORS.gray_200,
                                    paddingVertical: 10
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flex: 1,
                                        width: '100%',
                                        gap: 10,
                                    }}
                                >
                                    <View>
                                        {multiple ? (
                                            // Çox seçim üçün SgCheckbox (fərz olunur)
                                            <SgCheckbox checked={isSelected} />
                                        ) : (
                                            // Tək seçim üçün SgRadio
                                            <SgRadio selected={isSelected} />
                                        )}
                                    </View>
                                    {/* Render propu olan elementlərin görünüşünü tənzimləmək üçün */}
                                    <View style={{flex: 1}}>{item?.render || <Text>{item?.name}</Text>}</View>
                                    <View style={{flex: 1, opacity: 1, position: 'absolute', zIndex: 999, top: 0, left: 0, bottom: 0, right: 0}}></View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </SgPopup>
        </>
    );
}