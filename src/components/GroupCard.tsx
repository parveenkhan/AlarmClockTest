import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { Layout } from '../constants/Layout';
import { AlarmGroup } from '../constants/Types';
import { formatTime } from '../Utils/time';
import { SunMascot } from './SunMascot';

interface Props {
  group: AlarmGroup;
  onPress: () => void;
}

export function GroupCard({ group, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.card, Layout.softShadow]}>
      <View style={styles.header}>
        <View style={[styles.icon, { backgroundColor: group.iconTint }]}>
          <Ionicons name={group.icon === 'rooster' ? 'sunny' : 'alarm'} size={20} color={Colors.white} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{group.name}</Text>
          <Text style={styles.sub}>{group.memberCount} members</Text>
        </View>
        <View style={styles.streak}>
          <Ionicons name="flame" size={14} color={Colors.streak} />
          <Text style={styles.streakText}>Day {group.streak}</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
      </View>
      <View style={styles.members}>
        {group.members.map((member) => (
          <View key={member.id} style={styles.member}>
            <SunMascot size={52} accessory={member.accessory} />
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberTime}>{formatTime(member.hour, member.minute)}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 24,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.text,
  },
  sub: {
    marginTop: 2,
    color: Colors.textSecondary,
    fontSize: 13,
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.streakSoft,
    paddingHorizontal: 10,
    height: 28,
    borderRadius: 14,
  },
  streakText: {
    color: Colors.streak,
    fontWeight: '700',
    fontSize: 13,
  },
  members: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 18,
  },
  member: {
    alignItems: 'center',
    minWidth: 64,
  },
  memberName: {
    marginTop: 6,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  memberTime: {
    marginTop: 2,
    fontWeight: '800',
    color: Colors.text,
  },
});
