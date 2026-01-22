import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 20,
    marginBottom: 32
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    borderRadius: 2,
  },
  rememberText: {
    fontSize: 14,
    color: '#333',
  },
  forgot: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});

export default styles