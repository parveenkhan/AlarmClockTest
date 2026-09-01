import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Screen } from '../../components/Screen';
import { WakeChart } from '../../components/WakeChart';
import { Colors } from '../../constants/Colors';
import { Layout } from '../../constants/Layout';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { setRange } from '../../Redux/slices/insightsSlice';
import { NavigationController } from '../../NavigationController/NavigationController';

export default function InsightsScreen() {
  const insights = useAppSelector((s) => s.insights);
  const user = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();

  return (
    <Screen>
      <View style={styles.header}>
        <Pressable onPress={NavigationController.goBack} style={styles.back}>
          <Ionicons name="chevron-back" size={22} color={Colors.text} />
        </Pressable>
        <Text style={styles.title}>Insights</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.stats}>
          <View style={[styles.statCard, Layout.softShadow]}>
            <Ionicons name="flame" size={28} color={Colors.streak} />
            <Text style={styles.statNum}>{user.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={[styles.statCard, Layout.softShadow]}>
            <View style={styles.badge}>
              <Text style={styles.badgeNum}>{user.badges}</Text>
            </View>
            <Text style={styles.statNum}>{user.badges}</Text>
            <Text style={styles.statLabel}>Badges Earned</Text>
          </View>
        </View>
        <View style={[styles.card, Layout.softShadow]}>
          <View style={styles.cardHead}>
            <Text style={styles.cardTitle}>Reports</Text>
            <Text style={styles.range}>{insights.reportRange}</Text>
          </View>
          <View style={styles.split}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.big}>{insights.reportsWake}</Text>
              <Text style={styles.statLabel}>Wake</Text>
            </View>
            <View style={styles.divider} />
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.big}>{insights.reportsSleep}</Text>
              <Text style={styles.statLabel}>Sleep</Text>
            </View>
          </View>
          <Pressable onPress={() => NavigationController.navigate('DailyReports')} style={styles.open}>
            <Text style={styles.openText}>Open ↗</Text>
          </Pressable>
          <Pressable onPress={() => NavigationController.navigate('DailyReports')} style={styles.daily}>
            <Ionicons name="bar-chart-outline" size={18} color={Colors.text} />
            <Text style={styles.dailyText}>Daily Reports</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
          </Pressable>
        </View>
        <View style={[styles.card, Layout.softShadow]}>
          <View style={styles.cardHead}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>Wake-up time ↕</Text>
            </View>
            <Text style={styles.avg}>{insights.avgWake} avg</Text>
          </View>
          <WakeChart points={insights.points} width={width - 72} />
        </View>
        <View style={styles.ranges}>
          {(['7D', '30D', 'ALL'] as const).map((item) => (
            <Pressable key={item} onPress={() => dispatch(setRange(item))}>
              <Text style={[styles.rangeOpt, insights.range === item && styles.rangeOn]}>{item}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 4,
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
    fontSize: 34,
    fontWeight: '800',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 22,
    padding: 16,
    minHeight: 130,
  },
  statNum: {
    marginTop: 12,
    fontSize: 32,
    fontWeight: '800',
  },
  statLabel: {
    color: Colors.textSecondary,
    marginTop: 4,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeNum: {
    color: Colors.white,
    fontWeight: '800',
  },
  card: {
    marginTop: 14,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
  },
  cardHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  range: {
    color: Colors.textSecondary,
  },
  split: {
    flexDirection: 'row',
    marginTop: 18,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 42,
    backgroundColor: Colors.border,
  },
  big: {
    fontSize: 28,
    fontWeight: '800',
  },
  open: {
    marginTop: 16,
    backgroundColor: Colors.black,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openText: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: 16,
  },
  daily: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dailyText: {
    flex: 1,
    fontWeight: '700',
  },
  pill: {
    backgroundColor: Colors.chip,
    borderRadius: 14,
    paddingHorizontal: 10,
    height: 28,
    justifyContent: 'center',
  },
  pillText: {
    fontWeight: '700',
    fontSize: 13,
  },
  avg: {
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  ranges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 28,
    marginTop: 16,
  },
  rangeOpt: {
    color: Colors.textMuted,
    fontWeight: '800',
  },
  rangeOn: {
    color: Colors.text,
  },
});
