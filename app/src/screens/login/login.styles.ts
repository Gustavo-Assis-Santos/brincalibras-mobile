import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 40, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  socialContainer: { borderWidth: 1, borderColor: '#ddd', borderRadius: 15, padding: 20, alignItems: 'center' },
  socialText: { color: '#aaa', marginBottom: 15, fontWeight: '600' },
  iconRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  line: { flex: 1, height: 1, backgroundColor: '#ddd' },
  orText: { marginHorizontal: 10, color: '#aaa' },
  inputSection: { width: '100%' },
  label: { fontWeight: 'bold', marginBottom: 5 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#eee', borderRadius: 15, marginBottom: 20, paddingHorizontal: 15 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, height: 50, backgroundColor: 'transparent' },
  button: { backgroundColor: '#000', borderRadius: 15, height: 55, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  footerText: { textAlign: 'center', marginTop: 15, color: '#333' },
  link: { color: '#00aeef', fontWeight: 'bold', textDecorationLine: 'underline' },
  customPlaceholder: { position: 'absolute', left: 45, color: '#aaa', zIndex: -1},
});