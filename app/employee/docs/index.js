import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ToastAndroid} from 'react-native';
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

export default function EmployeeDocsScreen() {
  const [docList, setDocList] = useState([]);
  const {request} = useApi();
  const {user} = useAuth();
  const {storeData} = useData();
  const {t} = useTranslation();
  const [addDocsModal, setAddDocsModal] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [data, setData] = useState({})
  const [errors, setErrors] = useState({})
  const [fileTypes, setFileTypes] = useState([
    {
      key: 'passport',
      label: 'Passport',
      flow: ['patent', 'bkc', 'russian'],
      dateRequired: true
    },
    {
      key: 'notarized_translation',
      label: 'Translated Passport',
      flow: ['patent', 'bkc'],
      dateRequired: false
    },
    {
      key: 'migration_card',
      label: 'Migration Card',
      flow: ['patent', 'bkc'],
      dateRequired: true
    },
    {
      key: 'registration_card',
      label: 'Registration Card',
      flow: ['patent', 'bkc'],
      dateRequired: true
    },
    {
      key: 'patent',
      label: 'Patent',
      dateRequired: false
    },
    {
      key: 'language_certificate',
      label: 'Language Certificate',
      flow: ['patent'],
      dateRequired: true
    },
    {
      key: 'contract',
      label: 'Contract',
      flow: ['patent', 'bkc'],
      dateRequired: false
    },
    {
      key: 'payment_receipt',
      label: 'Payment receipt',
      flow: ['patent'],
      dateRequired: false
    },
    {
      key: 'visa',
      label: 'Visa',
      flow: ['bkc'],
      dateRequired: true
    },
    {
      key: 'work_authorization',
      label: 'Work authorization',
      dateRequired: false
    },

    {
      key: 'health_insurance',
      label: 'Health insurance',
      flow: ['patent', 'bkc'],
      dateRequired: true
    },
    {
      key: 'medical_certification',
      label: 'Medical certification',
      flow: ['patent', 'bkc', 'russian'],
      dateRequired: true
    },
    {
      key: 'photo',
      label: 'Photo',
      flow: ['patent', 'bkc'],
      dateRequired: false
    },
    {
      key: 'fingerprint_certification',
      label: 'Fingerprint certification',
      flow: ['patent', 'bkc'],
      dateRequired: false
    },
    {
      key: 'patent',
      label: 'Patent',
      flow: ['patent'],
      dateRequired: false
    },
    {
      key: 'bkc_payment_receipt',
      label: 'BKC payment receipt',
      flow: ['bkc'],
      dateRequired: false
    },
    {
      key: 'immigration_committee_notification',
      label: 'immigration_committee_notification',
      flow: ['bkc'],
      dateRequired: false
    },
    {
      key: 'invitation_visa',
      label: 'Invitation visa',
      flow: ['bkc'],
      dateRequired: false
    },
    {
      key: 'bkc',
      label: 'BKC',
      flow: ['bkc'],
      dateRequired: true
    },
    {
      key: 'military_id_card',
      label: 'Military ID card',
      flow: ['russian'],
      dateRequired: true
    },
    {
      key: 'diploma',
      label: 'Diploma',
      flow: ['russian'],
      dateRequired: false
    }
  ])
  const {refreshKey} = useLocalSearchParams();

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
        url: '/employee/doc/add',
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
          url: '/employee/doc/list',
          method: 'get',
        }).then().catch(err => {
          console.log(err);
        })
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
  }




  function handleChange(e) {
    setErrors({...errors, [e.name]: ''});
    setData({...data, [e.name]: e.value});
  }


  useFocusEffect(
      React.useCallback(() => {
        request({
          url: '/employee/doc/list',
          method: 'get',
        }).then().catch(err => {
          console.log(err);
        })

        return () => {
          console.log('doc tab lost focus');
        };
      }, [refreshKey])
  );

  useEffect(() => {
    setDocList(storeData?.cache?.[`GET:/employee/doc/list`]?.data)
  }, [storeData?.cache?.[`GET:/employee/doc/list`]])

  return (
    <SgTemplateScreen
      head={
        <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
          <SgSectionFileHead
              title={t('myDocs')}
              description={t('myDocs__description')}
              icon="filter"
              href={`/employeePages/docs/archive`}
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
                fileType={el.mimetype}
                title={el?.filename}
                url={el?.filepath}
                expiryDate={el?.date_of_expiry}
                issueDate={el?.date_of_issue}
                migrationId={el?.type}
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
                list={(fileTypes || [])?.filter(el => (el.flow || [])?.includes(user?.flow))?.map((fileType, index) => ({
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
                    key={index}
                    title={el?.name}
                    type={el?.type}
                    datetime={el?.date ? moment(el?.date).format('DD.MM.YYYY / hh:mm A') : null}
                    url={el?.filepath}
                    onPress={() => console.log('file.filename')}
                />
            ))}
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