import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import SgSectionFileHead from "@/components/sections/FileHead/FileHead";
import SgTemplateScreenView from "@/components/templates/ScreenView/ScreenView";
import SgNoticeCard from "@/components/ui/NoticeCard/NoticeCard";
import SgFileCard from "@/components/sections/FileCard/FileCard";
import {useApi} from "@/hooks/useApi";
import {useData} from "@/hooks/useData";

export default function EmployeeDocsScreen() {
  const [docList, setDocList] = useState([]);
  const {request} = useApi();
  const {storeData} = useData();

  useEffect(() => {
    request({
      url: '/chief/doc/list',
      method: 'get',
    }).then().catch(err => {
      console.log(err);
    })
  }, []);

  useEffect(() => {
    setDocList(storeData?.cache?.[`GET:/chief/doc/list`]?.data)
  }, [storeData?.cache?.[`GET:/chief/doc/list`]])

  return (
    <SgTemplateScreenView
      head={
        <View style={{paddingVertical: 16, paddingHorizontal: 16}}>
          <SgSectionFileHead
              title="My Docs"
              description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
              icon="filter"
              href={`/chiefPages/docs/archive`}
          />
        </View>
      }
    >
      {/*<SgNoticeCard
          title="Active Docs"
          buttonText="Add doc +"
          bgButton="success"
      />*/}

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

    </SgTemplateScreenView>
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