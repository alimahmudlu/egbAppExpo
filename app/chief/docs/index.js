import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ToastAndroid, Pressable} from 'react-native';
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import SgTemplateScreen from "@/components/templates/Screen/Screen";
import SgNoticeCard from "@/components/ui/NoticeCard/NoticeCard";
import SgFileCard from "@/components/sections/FileCard/FileCard";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";
import {useFocusEffect, useLocalSearchParams} from "expo-router";
import SgPopup from "@/components/ui/Modal/Modal";
import SgButton from "@/components/ui/Button/Button";
import COLORS from "@/constants/colors";
import SgTemplateUploadScreen from "@/components/templates/Upload/Upload";
import SgSectionAddFile from "@/components/sections/AddFile/AddFile";
import moment from "moment";
import SgSelect from "@/components/ui/Select/Select";
import {useAuth} from "@/hooks/useAuth";
import SgDatePicker from "@/components/ui/DatePicker/DatePicker";
import validationConstraints from "@/app/chiefPages/create-task/constants";
import {validate} from "@/utils/validate";
import {useTranslation} from "react-i18next";
import {useLanguage} from "@/hooks/useLanguage";
import FilterIcon from "@/assets/images/filter.svg";
import ReloadArrow from "@/assets/images/reload-arrows.svg";

export default function EmployeeDocsScreen() {
  const [docList, setDocList] = useState([]);
  const {request} = useApi();
  const {user} = useAuth();
  const {storeData} = useData();
  const {selectedLanguage} = useLanguage();
  const {t} = useTranslation();
  const [addDocsModal, setAddDocsModal] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [fileTypes, setFileTypes] = useState([
    {
      key: 'passport',
      label: 'Passport',
      label_ru: 'Паспорт',
      label_uz: 'Pasport',
      flow: ['patent', 'bkc', 'russian'],
      dateRequired: true,
      show: false
    },
    {
      key: 'notarized_translation',
      label: 'Translated Passport',
      label_ru: 'Перевод паспорта',
      label_uz: 'Tarjima qilingan passport',
      flow: ['patent', 'bkc'],
      dateRequired: false,
      show: false
    },
    {
      key: 'migration_card',
      label: 'Migration Card',
      label_ru: 'Миграционная карта',
      label_uz: 'Migratsiya kartasi',
      flow: ['patent', 'bkc'],
      dateRequired: true,
      show: false
    },
    {
      key: 'registration_card',
      label: 'Registration Card',
      label_ru: 'Регистрационная карта',
      label_uz: 'Ro’yxatga olish hujjati',
      flow: ['patent', 'bkc'],
      dateRequired: true,
      show: true
    },
    {
      key: 'patent',
      label: 'Patent',
      label_ru: 'Патент',
      label_uz: 'Patent',
      dateRequired: false,
      show: false
    },
    {
      key: 'language_certificate',
      label: 'Language Certificate',
      label_ru: 'Сертификат о знании языка',
      label_uz: 'Til sertifikati',
      flow: ['patent'],
      dateRequired: true,
      show: false
    },
    {
      key: 'contract',
      label: 'Contract',
      label_ru: 'Трудовой договор',
      label_uz: 'Mehnat shartnomasi',
      flow: ['patent', 'bkc'],
      dateRequired: false,
      show: false
    },
    {
      key: 'notification_from_a_legal_entity',
      label: 'Notification from a legal entity',
      label_ru: 'Уведомление от юр лица',
      label_uz: 'Yuridik shaxsdan bildirishnoma',
      flow: ['patent', 'bkc'],
      issueRequired: false,
      expiryRequired: false,
      serialRequired: false,
      numberRequired: false,
      dateRequired: false,
      show: false
    },
    {
      key: 'notification_from_an_individual',
      label: 'Notification from an individual',
      label_ru: 'Уведомление от физ лица',
      label_uz: 'Shaxsdan bildirishnoma',
      flow: ['patent'],
      issueRequired: false,
      expiryRequired: false,
      serialRequired: false,
      numberRequired: false,
      dateRequired: false,
      show: false
    },
    {
      key: 'payment_receipt',
      label: 'Payment receipt',
      label_ru: 'Квитанция об оплате',
      label_uz: 'To’lov kvitansiyasi',
      flow: ['patent'],
      dateRequired: false,
      show: false
    },
    {
      key: 'visa',
      label: 'Visa',
      label_ru: 'Виза',
      label_uz: 'Viza',
      flow: ['bkc'],
      dateRequired: true,
      show: false
    },
    {
      key: 'work_authorization',
      label: 'Work authorization',
      label_ru: 'Разрешение на работу',
      label_uz: 'Mehnatga ruxsatnoma',
      dateRequired: false,
      show: false
    },
    {
      key: 'health_insurance',
      label: 'Health insurance',
      label_ru: 'Медицинская страховка',
      label_uz: 'Sog’liqni sug’urtasi',
      flow: ['patent', 'bkc'],
      dateRequired: true,
      show: false
    },
    {
      key: 'medical_certification',
      label: 'Medical certification',
      label_ru: 'Медицинская справка',
      label_uz: 'Tibbiy ma’lumotnoma',
      flow: ['patent', 'bkc', 'russian'],
      dateRequired: true,
      show: false
    },
    {
      key: 'photo',
      label: 'Photo',
      label_ru: 'Фото',
      label_uz: 'Rasm',
      flow: ['patent', 'bkc'],
      dateRequired: false,
      show: false
    },
    {
      key: 'fingerprint_certification',
      label: 'Fingerprint certification',
      label_ru: 'Дактилоскопия',
      label_uz: 'Barmoq izi sertifikati',
      flow: ['patent', 'bkc'],
      dateRequired: false,
      show: false
    },
    {
      key: 'patent',
      label: 'Patent',
      label_ru: 'Патент',
      label_uz: 'Patent',
      flow: ['patent'],
      dateRequired: false,
      show: false
    },
    {
      key: 'bkc_payment_receipt',
      label: 'BKC payment receipt',
      label_ru: 'Квитанция об оплате БКЦ',
      label_uz: 'BKC to‘lovi kvitansiyasi',
      flow: ['bkc'],
      dateRequired: false,
      show: false
    },
    {
      key: 'immigration_committee_notification',
      label: 'immigration_committee_notification',
      label_ru: 'Уведомление в иммиграционный комитет',
      label_uz: 'Immigratsiya qo‘mitasiga xabarnoma',
      flow: ['bkc'],
      dateRequired: false,
      show: false
    },
    {
      key: 'invitation_visa',
      label: 'Invitation visa',
      label_ru: 'Пригласительная виза',
      label_uz: 'Tashrif vizasi',
      flow: ['bkc'],
      dateRequired: false,
      show: false
    },
    {
      key: 'bkc',
      label: 'BKC',
      label_ru: 'БКЦ',
      label_uz: 'BKC',
      flow: ['bkc'],
      dateRequired: true,
      show: false
    },
    {
      key: 'military_id_card',
      label: 'Military ID card',
      label_ru: 'Военный билет',
      label_uz: 'Harbiy guvohnoma',
      flow: ['russian'],
      dateRequired: true,
      show: false
    },
    {
      key: 'diploma',
      label: 'Diploma',
      label_ru: 'Диплом',
      label_uz: 'Diplom',
      flow: ['russian'],
      dateRequired: false,
      show: false
    },
    {
      key: 'entry_form_document',
      label: 'Entry Form document',
      flow: ['patent', 'bkc', 'russian'],
      dateRequired: false,
      show: false
    }
  ])
  const {refreshKey} = useLocalSearchParams();
  const [removeModal, setRemoveModal] = useState(false);
  const [filterModal, setFilterModal] = useState(false)
  const [filters, setFilters] = useState({})

  function toggleFilterModal() {
    setFilterModal(!filterModal);
  }
  function resetFilters() {
    setFilters({});
    request({
      url: '/chief/doc/list',
      method: 'get',
    }).then().catch(err => {
      // console.log(err);
    })
    toggleFilterModal()
  }

  function handleChangeFilter(e) {
    setFilters({...filters, [e.name]: e.value});
  }

  function handleFilters() {
    request({
      url: '/chief/doc/list',
      method: 'get',
      params: {
        replaced: filters?.replaced?.id
      }
    }).then().catch(err => {
      // console.log(err);
    })
  }

  function toggleAddDocsModal() {
    setAddDocsModal(!addDocsModal)
    setSelectedFiles([])
    setData({})
    setErrors({})
  }



  function handleSubmitDoc() {
    let errors = validate({...data, fileTypes: fileTypes, file: selectedFiles?.[0]?.id}, 'addDocs', validationConstraints);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      ToastAndroid.show("error var", ToastAndroid.SHORT)
    } else {
      request({
        url: '/chief/doc/add',
        method: 'post',
        data: {
          ...data,
          file: selectedFiles[0]?.id,
          application_id: user?.application_id
        }
      }).then(res => {
        toggleAddDocsModal()
        // setSelectedFiles([])
        // setData({})
        // setErrors({})
        request({
          url: '/chief/doc/list',
          method: 'get',
        }).then().catch(err => {
          // console.log(err);
        })
      }).catch(err => {
        // console.log(err);
      })
    }
  }

  function handleRemove(selectedFileId, title) {
    request({
      url: '/chief/doc/remove',
      method: 'post',
      data: {
        title,
        file: selectedFileId,
        application_id: user?.application_id
      }
    }).then(res => {
      setRemoveModal(false)
      request({
        url: '/chief/doc/list',
        method: 'get',
      }).then().catch(err => {
        // console.log(err);
      })
    }).catch(err => {
      // console.log(err);
    })
  }


  function handleChange(e) {
    setErrors({...errors, [e.name]: ''});
    setData({...data, [e.name]: e.value});
  }


  useFocusEffect(
      React.useCallback(() => {
        request({
          url: '/chief/doc/list',
          method: 'get',
        }).then().catch(err => {
          // console.log(err);
        })

        return () => {};
      }, [refreshKey])
  );

  useEffect(() => {
    setDocList(storeData?.cache?.[`GET:/chief/doc/list`]?.data)
  }, [storeData?.cache?.[`GET:/chief/doc/list`]]);

  function handleRemoveFile(index) {
    const _selectedFiles = [...selectedFiles];
    _selectedFiles.splice(index, 1)
    setSelectedFiles(_selectedFiles)
  }

  return (
      <SgTemplateScreen
          head={
            <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
              <SgSectionFileHead
                  title={t('myDocs')}
                  description={t('myDocs__description')}
                  iconText={t('seeExpiredDocs')}
                  href={`/employeePages/docs/archive`}
                  filter={
                    <Pressable style={styles.iconWrapper} onPress={toggleFilterModal}>
                      <Text><FilterIcon width={20} height={20} /></Text>
                    </Pressable>
                  }
              />
            </View>
          }
      >
        <SgNoticeCard
            title={t('activeDocs')}
            buttonText={t('addDocument')}
            bgButton="success"
            onClick={toggleAddDocsModal}
        />

        <View style={{gap: 12}}>
          {(docList || []).map((el, index) => (
              <SgFileCard
                  key={index}
                  auid={el?.id}
                  fileType={el.mimetype}
                  title={el?.filename}
                  url={el?.filepath}
                  expiryDate={el?.date_of_expiry}
                  issueDate={el?.date_of_issue}
                  deletePermission={el?.employee_id === user?.id && user.role.id === 2}
                  handleRemove={handleRemove}
                  setRemoveModal={setRemoveModal}
                  removeModal={removeModal}
                  type={el?.type}
                  migrationId={fileTypes?.find(item => item.key === el?.type)?.[selectedLanguage?.id !== 'en' ? `label_${selectedLanguage?.id}` : 'label'] || el?.type}
              />
          ))}
        </View>


        <SgPopup
            autoClose={false}
            visible={addDocsModal}
            onClose={toggleAddDocsModal}
            title={t('addDocument')}
            description={t('addDocument__description')}
            footerButton={
              <SgButton
                  bgColor={COLORS.brand_600}
                  color={COLORS.white}
                  onPress={handleSubmitDoc}
                  disabled={selectedFiles.length === 0}
              >
                {t('addDocument')}
              </SgButton>
            }
        >
          <View style={{gap: 16}}>
            <View>
              <SgSelect
                  label={t('documentType')}
                  placeholder={t('selectDocumentType')}
                  modalTitle={t('selectDocumentType')}
                  value={data?.document}
                  name='document'
                  isInvalid={errors?.document}
                  onChangeText={handleChange}
                  list={(fileTypes || [])?.filter(el => (el.flow || [])?.includes(user?.flow) && el.show)?.map((fileType, index) => ({
                    id: fileType?.key, name: fileType?.label, render: <Text key={index}>{fileType?.label}</Text>
                  }))}
              />
            </View>
            {(fileTypes || []).find(el => el.key === data?.document?.id)?.dateRequired ?
                <>
                  <View>
                    <SgDatePicker
                        label={t('dateOfIssue')}
                        placeholder={t('enterDate')}
                        type="date"
                        value={data?.date_of_issue}
                        name='date_of_issue'
                        isInvalid={errors?.date_of_issue}
                        onChangeText={handleChange}
                    />
                  </View>
                  <View>
                    <SgDatePicker
                        label={t('dateOfExpired')}
                        placeholder={t('enterDate')}
                        type="date"
                        value={data?.date_of_expiry}
                        name='date_of_expiry'
                        isInvalid={errors?.date_of_expiry}
                        onChangeText={handleChange}
                    />
                  </View>
                </>
                : null
            }
            <View>
              <SgTemplateUploadScreen
                  setSelectedFiles={setSelectedFiles}
                  selectedFiles={selectedFiles}
                  multiple={false}
              />

              {(selectedFiles || []).map((el, index) => (
                  <SgSectionAddFile
                      handleRemove={() => handleRemoveFile(index)}
                      key={index}
                      title={el?.name}
                      type={el?.type}
                      datetime={el?.date ? moment(el?.date).format('DD.MM.YYYY / HH:mm') : null}
                      url={el?.filepath}
                      onPress={() => {}}
                      remove={true}
                  />
              ))}
            </View>
          </View>
        </SgPopup>

        <SgPopup
            visible={filterModal}
            onClose={toggleFilterModal}
            footerButton={
              <SgButton
                  onPress={handleFilters}
                  bgColor={COLORS.primary}
                  color={COLORS.white}
              >
                {t('accept')}
              </SgButton>
            }
        >
          <View style={{paddingBottom: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 20, fontWeight: 600, lineHeight: 30}}>{t('filters')}</Text>

              <SgButton
                  onPress={resetFilters}
                  color={COLORS.brand_700}
                  style={{
                    flex: 0,
                    width: 'auto',
                    marginLeft: 'auto',
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    gap: 7
                  }}

              >
                {t('clearFilters')}
                <ReloadArrow width={20} height={20} style={{marginLeft: 7}}/>
              </SgButton>
            </View>

            <View style={{gap: 16}}>
              <View style={{flex: 1}}>
                <SgSelect
                    label={t("Status")}
                    placeholder={t("enterStatus")}
                    modalTitle={t("selectStatus")}
                    value={filters?.status}
                    name='status'
                    onChangeText={handleChangeFilter}
                    list={[
                      {
                        id: 1,
                        name: t('active')
                      },
                      {
                        id: 2,
                        name: t('expiresSoon')
                      },
                      {
                        id: 3,
                        name: t('expired')
                      }
                    ]}
                />
              </View>
            </View>
          </View>
        </SgPopup>

      </SgTemplateScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.brand_50,
    padding: 14,
    borderRadius: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 15,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  activeBadge: {
    backgroundColor: '#e6f7ee',
  },
  closedBadge: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeText: {
    color: '#00a86b',
  },
  closedText: {
    color: '#f44336',
  },
  jobDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  jobInfo: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
    marginBottom: 5,
  },
  applicantsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    marginVertical: 10,
  },
  applicantsText: {
    fontSize: 16,
    fontWeight: '500',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  closeButton: {
    backgroundColor: '#f44336',
  },
  reopenButton: {
    backgroundColor: '#4caf50',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButtonText: {
    color: '#fff',
  },
  reopenButtonText: {
    color: '#fff',
  },
});