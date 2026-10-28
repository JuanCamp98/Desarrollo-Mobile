
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { colors } from '../styles/theme';

export default function SwipeRow({ children, onDelete }) {
  const renderRightActions = () => (
    <Pressable onPress={onDelete} style={styles.deleteAction}>
      <Text style={styles.deleteText}>Eliminar</Text>
    </Pressable>
  );

  return (
    <View style={styles.row}>
      <ReanimatedSwipeable
        renderRightActions={renderRightActions}
        overshootRight={false}
      >
        {children}
      </ReanimatedSwipeable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 1,
  },
  deleteAction: {
    backgroundColor: colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
    width: 94,
    borderRadius: 16,
    marginBottom: 14,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '800',
  },
});
