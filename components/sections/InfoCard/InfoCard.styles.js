import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  infoCard: {
    borderRadius: 12,
    padding: 16,
    flex: 1,
  },

  checkinBg: {
    backgroundColor: '#D1FAE5', 
  },
  checkoutBg: {
    backgroundColor: '#FEE2E2', 
  },
  grayBg: {
    backgroundColor: '#E5E7EB', 
  },

  cardTitle: {
    color: '#4B5563',
    fontSize: 14,
    marginTop: 4,
  },
  cardCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  checkinText: {
    color: '#059669', 
  },
  checkoutText: {
    color: '#DC2626', 
  },
  defaultText: {
    color: '#6B7280', 
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconWrapper: {
    marginLeft: 'auto',
  },
});

export default styles;
