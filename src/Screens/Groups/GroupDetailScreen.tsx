import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../../components/Screen';
import { ModalHeader } from '../../components/ModalHeader';
import { SunMascot } from '../../components/SunMascot';
import { Colors } from '../../constants/Colors';
import { RootStackParamList } from '../../Navigation/types';
import { useAppSelector } from '../../Redux/hooks';
import { formatTime } from '../../Utils/time';

type Props = NativeStackScreenProps<RootStackParamList, 'GroupDetail'>;

export default function GroupDetailScreen({ route }: Props) {
  const group = useAppSelector((s) => s.insights.groups.find((g) => g.id === route.params.groupId));
  if (!group) return null;
  return (
    <Screen patterned={false}>
      <ModalHeader title={group.name} />
      <View style={{ padding: 20 }}>
        <Text style={styles.sub}>{group.memberCount} members · Day {group.streak} streak</Text>
        {group.members.map((member) => (
          <View key={member.id} style={styles.row}>
            <SunMascot size={48} accessory={member.accessory} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{member.name}</Text>
              <Text style={styles.meta}>Alarm set</Text>
            </View>
            <Text style={styles.time}>{formatTime(member.hour, member.minute)}</Text>
          </View>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sub: {
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 12,
    marginBottom: 10,
  },
  name: {
    fontWeight: '800',
    fontSize: 16,
  },
  meta: {
    color: Colors.textSecondary,
    marginTop: 2,
  },
  time: {
    fontWeight: '800',
    fontSize: 16,
  },
});
