import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { ModalHeader } from '../../components/ModalHeader';
import { Colors } from '../../constants/Colors';
import { useAppSelector } from '../../Redux/hooks';

export default function DailyReportsScreen() {
  const reports = useAppSelector((s) => s.insights.reports);
  return (
    <Screen patterned={false}>
      <ModalHeader title="Daily Reports" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 10 }}>
        {reports.map((report) => (
          <View key={report.id} style={styles.card}>
            <Text style={styles.date}>{report.date}</Text>
            <View style={styles.row}>
              <Text style={styles.big}>{report.wake}</Text>
              <Text style={styles.meta}>{report.sleep}</Text>
            </View>
            <Text style={styles.mission}>{report.mission}</Text>
            <Text style={[styles.flag, { color: report.onTime ? Colors.greenDark : Colors.streak }]}>
              {report.onTime ? 'On time' : 'Late'}
            </Text>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
  },
  date: {
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 6,
  },
  big: {
    fontSize: 26,
    fontWeight: '800',
  },
  meta: {
    color: Colors.textSecondary,
    fontWeight: '700',
  },
  mission: {
    marginTop: 8,
    fontWeight: '600',
  },
  flag: {
    marginTop: 6,
    fontWeight: '800',
  },
});
