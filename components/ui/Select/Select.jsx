import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, ScrollView, TouchableOpacity} from 'react-native';
import styles from './Select.styles';
import Down from '@/assets/images/chevron-down.svg';
import COLORS from '@/constants/colors';
import SgPopup from "@/components/ui/Modal/Modal";
import SgRadio from "@/components/ui/Radio/Radio";
import SgCheckbox from "@/components/ui/Checkbox/Checkbox";
import SgSectionUserInfo from "@/components/sections/UserInfo/UserInfo";
import SgInput from "@/components/ui/Input/Input"; // Multi-select üçün fərz edilən import

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
    const [originalArray, setOriginalArray] = useState(list ? [...list] : [])
    const [array, setArray] = useState(list ? [...list] : [])

    useEffect(() => {
        setArray(list ? [...list] : [])
        setOriginalArray(list ? [...list] : [])
    }, [list])

    function handleChange(e, key, type) {
        const filters = {...userFilters, [e.name]: e.value}
        setUserFilters(filters);
        // item?.[key]?.id === e.value?.id
        setArray(list.filter(item => {
            // Bütün filter açarları üzərindən keç və hər biri TRUE qaytarmalıdır (AND Məntiqi)
            return Object.keys(filters).every(filterKey => {
                const filterValue = filters[filterKey];
                const itemValue = item[filterKey];

                // Əgər filterValue boşdursa (yəni süzgəc tətbiq edilməyibsə), TRUE qaytarılır
                if (!filterValue) {
                    return true;
                }

                // --- A) Obyekt əsaslı süzgəc (ID müqayisəsi) ---
                // Əgər filterValue bir obyektdirsə və 'id' keyi varsa
                if (typeof filterValue === 'object' && filterValue !== null && 'id' in filterValue) {
                    return itemValue && typeof itemValue === 'object' && itemValue.id === filterValue.id;
                }

                // --- B) Sadə dəyər əsaslı süzgəc (%LIKE% müqayisəsi) ---
                // Əgər filterValue sadə string dəyərdirsə (məsələn, axtarış sözü)
                if (typeof filterValue === 'string') {

                    // list iteminin dəyəri də string olmalıdır
                    if (typeof itemValue === 'string') {

                        // Hər iki dəyəri kiçik hərfə çevirərək müqayisə edirik (Case-insensitive LIKE)
                        const normalizedItemValue = itemValue.toLowerCase();
                        const normalizedFilterValue = filterValue.toLowerCase();

                        // Stringin içində olub-olmadığını yoxlayır (%LIKE% məntiqi)
                        return normalizedItemValue.includes(normalizedFilterValue);
                    }

                    // Əgər list itemindəki dəyər string deyilsə, uyğun gəlmir.
                    return false;
                }

                // Başqa tipdə olan filters dəyərləri üçün tam bərabərlik.
                return itemValue === filterValue;
            });
        }));
    }

    const initialValue = multiple ? (Array.isArray(value) ? value : []) : (value || null);

    const [selectModal, setSelectModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState(initialValue);

    useEffect(() => {
        const newValue = multiple ? (Array.isArray(value) ? value : []) : (value || null);
        setSelectedValue(newValue);
    }, [value, multiple]);


    function toggleSelectModal() {
        setSelectModal(!selectModal);
        setUserFilters({})
        setArray(originalArray)
    }

    function handleSelect(e, item) {
        e.stopPropagation();

        if (multiple) {
            const isSelected = selectedValue?.some(selected => selected.id === item.id);
            let newSelectedValue;

            if (isSelected) {
                newSelectedValue = selectedValue?.filter(selected => selected.id !== item.id);
            } else {
                newSelectedValue = [...selectedValue, {id: item.id, name: item.name}];
            }

            setSelectedValue(newSelectedValue);

            onChangeText({
                name: name,
                value: newSelectedValue,
            });

        } else {
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
            toggleSelectModal();
        }
    }

    const getDisplayValue = () => {
        if (multiple) {
            if (selectedValue.length > 0) {
                const names = selectedValue?.map(item => item?.name);
                if (names.length > 2) {
                    return `${names?.slice(0, 2).join(', ')} və ${names.length - 2} daha...`;
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
                fullScreen={true}
                title={modalTitle || placeholder}
                closeType={multiple ? "default" : "select"}
            >
                <View style={{gap: 8, paddingBottom: 8}}>
                    {filters.length > 0 && (
                        filters.map((filter, index) => {
                            if (filter.type === 'select') {
                                return (
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
                                )
                            }
                            else if (filter.type === 'input') {
                                return (
                                    <SgInput
                                        key={index}
                                        label={filter?.label}
                                        placeholder={filter?.name}
                                        value={userFilters[filter?.name]}
                                        name={filter?.name}
                                        onChangeText={(e) => handleChange(e, filter?.key)}
                                    />
                                )
                            }
                        })
                    )}
                </View>
                <ScrollView
                    style={{flex: 1, padding: 10, height: '100%'}}
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