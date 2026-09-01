import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../Assets/Colors';
import { Layout } from '../Assets/Layout';

interface Props {
  count: number;
  onPress?: () => void;
}

export function StreakBadge({ count, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.badge, Layout.softShadow]}>
      <Ionicons name="flame" size={16} color={Colors.streak} />
      <Text style={styles.count}>{count}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 18,
  },
  count: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
});
