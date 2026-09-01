import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../components/Screen';
import { GroupCard } from '../../components/GroupCard';
import { Colors } from '../../constants/Colors';
import { useAppSelector } from '../../Redux/hooks';
import { NavigationController } from '../../NavigationController/NavigationController';

export default function GroupsScreen() {
  const groups = useAppSelector((s) => s.insights.groups);
  return (
    <Screen>
      <View style={styles.header}>
        <Pressable onPress={NavigationController.goBack} style={styles.back}>
          <Ionicons name="chevron-back" size={22} color={Colors.text} />
        </Pressable>
        <Text style={styles.title}>Groups</Text>
        <Pressable style={styles.add}>
          <Ionicons name="person-add-outline" size={20} color={Colors.text} />
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 14 }}>
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            onPress={() => NavigationController.navigate('GroupDetail', { groupId: group.id })}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  back: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 34,
    fontWeight: '800',
  },
  add: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
