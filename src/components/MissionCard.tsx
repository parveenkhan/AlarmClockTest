import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { Mission } from '../constants/Missions';

interface Props {
  mission: Mission;
  selected?: boolean;
  onPress: () => void;
  footerLabel?: string;
}

export function MissionCard({ mission, selected, onPress, footerLabel = 'Preview' }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.card, Layout.softShadow]}>
      {selected ? (
        <View style={styles.check}>
          <Ionicons name="checkmark-circle" size={22} color={Colors.green} />
        </View>
      ) : null}
      <View style={[styles.iconWrap, { backgroundColor: mission.tint }]}>
        <Ionicons name={mission.icon as never} size={28} color={Colors.text} />
      </View>
      <Text style={styles.title}>{mission.title}</Text>
      <Text style={styles.desc}>{mission.description}</Text>
      <View style={styles.preview}>
        <Text style={styles.previewText}>{footerLabel}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 22,
    padding: 16,
    minHeight: 196,
  },
  check: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconWrap: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 8,
  },
  title: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  desc: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
    color: Colors.textSecondary,
    minHeight: 36,
  },
  preview: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: Colors.chip,
    paddingHorizontal: 16,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
});
