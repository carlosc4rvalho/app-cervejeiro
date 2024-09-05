import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#EFBA2F',
    gap: 8,
    marginBottom: 16,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default styles;
